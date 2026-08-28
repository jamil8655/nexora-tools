async function test() {
  const ytUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const ytId = 'dQw4w9WgXcQ';

  // 1. Test Cobalt public instances
  const cobaltInstances = [
    'https://cobalt.tools',
    'https://api.cobalt.tools',
    'https://co.wuk.sh',
    'https://cobalt.api.scav.be',
    'https://cobalt-api.kwiatekm.pl'
  ];

  for (const inst of cobaltInstances) {
    try {
      const res = await fetch(`${inst}/`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: ytUrl })
      });
      const data = await res.json();
      console.log('Cobalt from', inst, ':', data);
      if (data.url) {
        console.log('FOUND DIRECT DOWNLOAD URL:', data.url);
        break;
      }
    } catch (e) {
      console.log('Cobalt failed from', inst, e.message);
    }
  }

  // 2. Test Y2Mate / YT1s public AJAX endpoints
  try {
    const yt1sRes = await fetch('https://yt1s.com/api/ajaxSearch/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0'
      },
      body: new URLSearchParams({ q: ytUrl, vt: 'home' })
    });
    const yt1sData = await yt1sRes.json();
    console.log('YT1S status:', yt1sData.status, 'Title:', yt1sData.title, 'Formats:', Object.keys(yt1sData.links || {}));
  } catch (e) {
    console.log('YT1S error:', e.message);
  }

  // 3. Test SaveFrom / SSYouTube public stream helper
  try {
    const sfRes = await fetch(`https://worker.sf-helper.com/savefrom.php?url=${encodeURIComponent(ytUrl)}`);
    console.log('SaveFrom helper status:', sfRes.status);
  } catch (e) {
    console.log('SaveFrom error:', e.message);
  }
}

test();
