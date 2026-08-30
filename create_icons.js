const fs = require('fs');
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

function generatePng(size) {
  const width = size;
  const height = size;

  // Raw RGBA scanlines (with filter byte 0 at beginning of each row)
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      // Blue/Sapphire gradient with white N
      const t = (x + y) / (width + height);
      let r = Math.floor(2 * (1 - t) + 79 * t);
      let g = Math.floor(111 * (1 - t) + 70 * t);
      let b = Math.floor(199 * (1 - t) + 229 * t);

      // Rounded squircle check
      const cx = x - width / 2;
      const cy = y - height / 2;
      const rOuter = size * 0.46;
      const dist = Math.sqrt(cx * cx + cy * cy);

      // Draw stylized N
      const nx = x / size;
      const ny = y / size;
      const inLeftBar = nx >= 0.22 && nx <= 0.35 && ny >= 0.25 && ny <= 0.75;
      const inRightBar = nx >= 0.65 && nx <= 0.78 && ny >= 0.25 && ny <= 0.75;
      const inDiag = ny >= 0.25 && ny <= 0.75 && Math.abs(ny - (0.25 + (nx - 0.25) * 1.0)) < 0.1;

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
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: RGBA
  ihdrData[10] = 0; // compression method
  ihdrData[11] = 0; // filter method
  ihdrData[12] = 0; // interlace method
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT chunk
  const idat = makeChunk('IDAT', compressedData);

  // IEND chunk
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

fs.writeFileSync('public/icon-192.png', generatePng(192));
fs.writeFileSync('public/icon-512.png', generatePng(512));
console.log('Icons generated successfully in public/');
