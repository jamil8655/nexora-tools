const play = require('play-dl');

async function testPlayDl() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  try {
    console.log('Testing play-dl on YouTube URL...');
    const info = await play.video_info(url);
    console.log('play-dl Success! Title:', info.video_details.title);
    console.log('play-dl Duration:', info.video_details.durationInSec);
    console.log('play-dl Thumbnails:', info.video_details.thumbnails[0]?.url);
  } catch (err) {
    console.error('play-dl Error:', err.message);
  }
}

testPlayDl();
