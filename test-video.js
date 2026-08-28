async function test() {
  // 1. Test Invidious API for YouTube streams
  const ytId = 'dQw4w9WgXcQ';
  const invidiousInstances = [
    'https://vid.puffyan.us',
    'https://invidious.nerdvpn.de',
    'https://yewtu.be',
    'https://inv.tux.pizza'
  ];

  for (const inst of invidiousInstances) {
    try {
      const res = await fetch(`${inst}/api/v1/videos/${ytId}`);
      if (res.ok) {
        const data = await res.json();
        console.log('Invidious success from', inst, 'Title:', data.title);
        const format720 = data.formatStreams?.find(f => f.qualityLabel === '720p') || data.formatStreams?.[0];
        console.log('Format 720 URL:', format720?.url ? 'FOUND STREAM' : 'NO STREAM');
        break;
      }
    } catch (e) {
      console.log('Invidious error from', inst, e.message);
    }
  }

  // 2. Test VKR Video Downloader API for Social Media
  try {
    const vkrRes = await fetch('https://api.vkrdownloader.com/server?vkr=https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    const vkrData = await vkrRes.json();
    console.log('VKR Downloader API response:', vkrData.data ? 'SUCCESS' : vkrData);
  } catch (e) {
    console.log('VKR error:', e.message);
  }
}
test();
