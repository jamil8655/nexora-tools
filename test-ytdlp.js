const youtubedl = require('youtube-dl-exec');

async function testYtDlp() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  try {
    console.log('Testing yt-dlp on YouTube video...');
    const output = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });
    console.log('yt-dlp SUCCESS! Title:', output.title);
    console.log('Duration:', output.duration);
    console.log('Formats count:', output.formats?.length);
    const mp4Format = output.formats?.find(f => f.ext === 'mp4' && f.vcodec !== 'none' && f.acodec !== 'none');
    console.log('Direct MP4 Stream URL found:', !!mp4Format?.url);
  } catch (err) {
    console.error('yt-dlp Error:', err.message);
  }
}

testYtDlp();
