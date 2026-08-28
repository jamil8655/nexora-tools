const play = require('play-dl');

async function testStream() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  try {
    console.log('Fetching stream from play-dl...');
    const stream = await play.stream(url);
    console.log('Stream Type:', stream.type);
    console.log('Stream has stream object:', !!stream.stream);
  } catch (err) {
    console.error('Stream error:', err.message);
  }
}
testStream();
