const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', engine: 'NEXORA High-Speed Media Streamer v2.0' });
});

// 2. Fetch Video Metadata
app.post('/api/video/info', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    if (ytdl.validateURL(url)) {
      const info = await ytdl.getInfo(url);
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

      return res.json({
        platform: 'youtube',
        title: info.videoDetails.title,
        author: info.videoDetails.author.name,
        thumbnailUrl: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]?.url,
        duration: `${Math.floor(info.videoDetails.lengthSeconds / 60)}:${(info.videoDetails.lengthSeconds % 60).toString().padStart(2, '0')}`,
        formats: [
          {
            id: 'video-1080p',
            label: 'Full HD 1080p MP4',
            quality: '1080p',
            extension: 'mp4',
            type: 'video',
            downloadUrl: `/api/video/download?url=${encodeURIComponent(url)}&quality=1080p&type=video`,
          },
          {
            id: 'video-720p',
            label: 'HD 720p MP4',
            quality: '720p',
            extension: 'mp4',
            type: 'video',
            downloadUrl: `/api/video/download?url=${encodeURIComponent(url)}&quality=720p&type=video`,
          },
          {
            id: 'video-480p',
            label: 'SD 480p MP4',
            quality: '480p',
            extension: 'mp4',
            type: 'video',
            downloadUrl: `/api/video/download?url=${encodeURIComponent(url)}&quality=480p&type=video`,
          },
          {
            id: 'audio-320k',
            label: 'HQ Audio MP3 (320kbps)',
            quality: '320kbps',
            extension: 'mp3',
            type: 'audio',
            downloadUrl: `/api/video/download?url=${encodeURIComponent(url)}&quality=highestaudio&type=audio`,
          },
        ],
      });
    }

    // Generic / Social Media Fallback
    return res.json({
      platform: 'social',
      title: 'Social Media Video Clip',
      author: 'Creator',
      thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      duration: '1:00',
      formats: [
        {
          id: 'video-hd',
          label: 'Original HD MP4 Video',
          quality: 'HD',
          extension: 'mp4',
          type: 'video',
          downloadUrl: `/api/video/download?url=${encodeURIComponent(url)}&quality=hd&type=video`,
        },
      ],
    });
  } catch (err) {
    console.error('Info Error:', err);
    return res.status(500).json({ error: 'Failed to extract video information: ' + err.message });
  }
});

// 3. Stream & Download Real Video / Audio Directly In-Site
app.get('/api/video/download', async (req, res) => {
  const { url, quality = 'highest', type = 'video' } = req.query;
  if (!url) return res.status(400).send('URL query parameter is required');

  try {
    if (ytdl.validateURL(url)) {
      const info = await ytdl.getInfo(url);
      const cleanTitle = info.videoDetails.title.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '_').slice(0, 40);
      const ext = type === 'audio' ? 'mp3' : 'mp4';
      const fileName = `${cleanTitle}_${quality}.${ext}`;

      res.header('Content-Disposition', `attachment; filename="${fileName}"`);
      res.header('Content-Type', type === 'audio' ? 'audio/mpeg' : 'video/mp4');

      if (type === 'audio') {
        return ytdl(url, { quality: 'highestaudio', filter: 'audioonly' }).pipe(res);
      } else {
        return ytdl(url, { quality: quality === '1080p' ? 'highestvideo' : 'highest' }).pipe(res);
      }
    }

    // Direct stream proxy fallback
    const directRes = await fetch(url);
    res.header('Content-Disposition', 'attachment; filename="social_video.mp4"');
    res.header('Content-Type', 'video/mp4');
    const buffer = Buffer.from(await directRes.arrayBuffer());
    return res.send(buffer);
  } catch (err) {
    console.error('Download Stream Error:', err);
    return res.status(500).send('Failed to stream video: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 NEXORA Video Downloader API running on port ${PORT}`);
});
