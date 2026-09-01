const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let crc = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const table = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  table[i] = c;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function generatePng(size, isRound = false) {
  const width = size;
  const height = size;

  // Raw RGBA scanlines
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      const cx = x - width / 2;
      const cy = y - height / 2;
      const radius = size * 0.48;
      const dist = Math.sqrt(cx * cx + cy * cy);

      if (isRound && dist > radius) {
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Premium Indigo/Blue/Violet gradient
      const t = (x + y) / (width + height);
      let r = Math.floor(15 * (1 - t) + 99 * t);
      let g = Math.floor(23 * (1 - t) + 102 * t);
      let b = Math.floor(42 * (1 - t) + 241 * t);

      // Draw stylized NEXORA "N" symbol
      const nx = x / size;
      const ny = y / size;
      const inLeftBar = nx >= 0.24 && nx <= 0.36 && ny >= 0.22 && ny <= 0.78;
      const inRightBar = nx >= 0.64 && nx <= 0.76 && ny >= 0.22 && ny <= 0.78;
      const inDiag = ny >= 0.22 && ny <= 0.78 && Math.abs(ny - (0.22 + (nx - 0.24) * 1.08)) < 0.08;

      if (inLeftBar || inRightBar || inDiag) {
        r = 255;
        g = 255;
        b = 255;
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = 255; // fully opaque
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 72, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT chunk
  const idat = makeChunk('IDAT', compressedData);

  // IEND chunk
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// 1. Web PWA Icons
if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/icon-192.png', generatePng(192));
fs.writeFileSync('public/icon-512.png', generatePng(512));
console.log('✅ Generated Web Icons in public/');

// 2. Android Mipmap Icons
const mipmaps = [
  { dir: 'mipmap-mdpi', size: 48 },
  { dir: 'mipmap-hdpi', size: 72 },
  { dir: 'mipmap-xhdpi', size: 96 },
  { dir: 'mipmap-xxhdpi', size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
];

const resDir = path.join(__dirname, 'android/app/src/main/res');

mipmaps.forEach(({ dir, size }) => {
  const targetDir = path.join(resDir, dir);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  fs.writeFileSync(path.join(targetDir, 'ic_launcher.png'), generatePng(size, false));
  fs.writeFileSync(path.join(targetDir, 'ic_launcher_round.png'), generatePng(size, true));
  fs.writeFileSync(path.join(targetDir, 'ic_launcher_foreground.png'), generatePng(size, false));
  console.log(`✅ Generated ${dir} (${size}x${size})`);
});

console.log('🎉 All Android Launcher & Adaptive Icons Generated Successfully!');
