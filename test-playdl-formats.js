const play = require('play-dl');

async function testFormats() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  try {
    const info = await play.video_info(url);
    console.log('Total Formats:', info.format.length);
    const videoFormats = info.format.filter(f => f.mimeType && f.mimeType.includes('video/mp4'));
    console.log('Video MP4 formats:', videoFormats.map(f => ({
      quality: f.qualityLabel,
      fps: f.fps,
      url: f.url ? 'FOUND DIRECT URL!' : 'NO'
    })));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testFormats();
