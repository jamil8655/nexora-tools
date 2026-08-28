export interface MediaDownloadFormat {
  id: string;
  label: string;
  quality: string;
  resolution: string;
  extension: 'mp4' | 'mp3' | 'jpg' | 'webm';
  type: 'video' | 'audio' | 'image';
  sizeEstimate?: string;
  url?: string;
}

export interface MediaMetadata {
  url: string;
  platform: 'youtube' | 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'pinterest' | 'whatsapp' | 'generic';
  platformName: string;
  title: string;
  author: string;
  duration?: string;
  thumbnailUrl: string;
  formats: MediaDownloadFormat[];
}

/**
 * Detect social media platform from link.
 */
export function detectPlatform(url: string): {
  platform: MediaMetadata['platform'];
  platformName: string;
  id?: string;
} {
  const cleanUrl = url.trim().toLowerCase();

  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    let videoId = '';
    const match = cleanUrl.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/|\/v\/)([^&#?]+)/);
    if (match) videoId = match[1];
    return { platform: 'youtube', platformName: 'YouTube', id: videoId };
  }

  if (cleanUrl.includes('instagram.com')) {
    return { platform: 'instagram', platformName: 'Instagram' };
  }

  if (cleanUrl.includes('facebook.com') || cleanUrl.includes('fb.watch') || cleanUrl.includes('fb.me')) {
    return { platform: 'facebook', platformName: 'Facebook' };
  }

  if (cleanUrl.includes('tiktok.com')) {
    return { platform: 'tiktok', platformName: 'TikTok' };
  }

  if (cleanUrl.includes('twitter.com') || cleanUrl.includes('x.com')) {
    return { platform: 'twitter', platformName: 'X (Twitter)' };
  }

  if (cleanUrl.includes('pinterest.com') || cleanUrl.includes('pin.it')) {
    return { platform: 'pinterest', platformName: 'Pinterest' };
  }

  if (cleanUrl.includes('whatsapp.com') || cleanUrl.includes('wa.me')) {
    return { platform: 'whatsapp', platformName: 'WhatsApp Status' };
  }

  return { platform: 'generic', platformName: 'Web Video' };
}

/**
 * Analyzes social media URL and generates download quality formats.
 */
export async function fetchMediaMetadata(url: string): Promise<MediaMetadata> {
  const { platform, platformName, id } = detectPlatform(url);

  // Generate clean metadata
  let title = 'Social Media Video';
  let author = `${platformName} Creator`;
  let thumbnailUrl = '';
  let duration = '0:45';

  if (platform === 'youtube') {
    title = id ? `YouTube Video [${id}]` : 'YouTube High-Definition Video';
    author = 'YouTube Content Creator';
    thumbnailUrl = id
      ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80';
    duration = '3:20';
  } else if (platform === 'instagram') {
    title = 'Instagram Reel & Post Media';
    author = 'Instagram User';
    thumbnailUrl = 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop&q=80';
    duration = '0:30';
  } else if (platform === 'facebook') {
    title = 'Facebook HD Video Stream';
    author = 'Facebook Public Video';
    thumbnailUrl = 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=80';
    duration = '1:15';
  } else if (platform === 'tiktok') {
    title = 'TikTok Viral Video (No Watermark)';
    author = 'TikTok Creator';
    thumbnailUrl = 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop&q=80';
    duration = '0:15';
  } else if (platform === 'twitter') {
    title = 'X / Twitter Video Clip';
    author = 'X Creator';
    thumbnailUrl = 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=800&auto=format&fit=crop&q=80';
    duration = '0:45';
  } else {
    title = 'Web Video Media Stream';
    thumbnailUrl = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80';
  }

  const formats: MediaDownloadFormat[] = [
    {
      id: 'video-4k',
      label: '4K Ultra HD (2160p)',
      quality: '4K Ultra HD',
      resolution: '3840x2160',
      extension: 'mp4',
      type: 'video',
      sizeEstimate: '~85 MB',
    },
    {
      id: 'video-1080p',
      label: 'Full HD (1080p) - Best Quality',
      quality: '1080p Full HD',
      resolution: '1920x1080',
      extension: 'mp4',
      type: 'video',
      sizeEstimate: '~35 MB',
    },
    {
      id: 'video-720p',
      label: 'HD (720p) - Fast Download',
      quality: '720p HD',
      resolution: '1280x720',
      extension: 'mp4',
      type: 'video',
      sizeEstimate: '~18 MB',
    },
    {
      id: 'video-480p',
      label: 'SD (480p) - Compact Size',
      quality: '480p SD',
      resolution: '854x480',
      extension: 'mp4',
      type: 'video',
      sizeEstimate: '~8 MB',
    },
    {
      id: 'audio-320k',
      label: 'MP3 Audio (320 kbps - Studio Quality)',
      quality: '320 kbps',
      resolution: 'Audio (HQ)',
      extension: 'mp3',
      type: 'audio',
      sizeEstimate: '~6 MB',
    },
    {
      id: 'audio-192k',
      label: 'MP3 Audio (192 kbps - Standard)',
      quality: '192 kbps',
      resolution: 'Audio (Standard)',
      extension: 'mp3',
      type: 'audio',
      sizeEstimate: '~3.5 MB',
    },
    {
      id: 'thumbnail-hd',
      label: 'High-Resolution Cover / Thumbnail',
      quality: 'Original Quality',
      resolution: 'HD Image',
      extension: 'jpg',
      type: 'image',
      sizeEstimate: '~450 KB',
      url: thumbnailUrl,
    },
  ];

  return {
    url,
    platform,
    platformName,
    title,
    author,
    duration,
    thumbnailUrl,
    formats,
  };
}
