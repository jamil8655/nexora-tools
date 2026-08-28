async function test() {
  const ytId = 'dQw4w9WgXcQ';

  // 1. Test Piped API instances
  const pipedInstances = [
    'https://pipedapi.kavin.rocks',
    'https://pipedapi.tokhmi.xyz',
    'https://api.piped.privacydev.net',
    'https://pipedapi.leptons.xyz',
    'https://piped-api.lunar.icu',
    'https://api.piped.otbea.xyz'
  ];

  for (const p of pipedInstances) {
    try {
      const res = await fetch(`${p}/streams/${ytId}`);
      if (res.ok) {
        const data = await res.json();
        console.log('Piped Success from:', p, 'Title:', data.title);
        const streams = data.videoStreams || [];
        console.log('Piped Streams:', streams.map(s => `${s.quality} (${s.mimeType})`).join(', '));
        if (streams.length > 0) {
          console.log('First stream url:', streams[0].url);
        }
        break;
      }
    } catch (e) {
      console.log('Piped failed from:', p, e.message);
    }
  }

  // 2. Test Invidious working instances list from https://api.invidious.io/instances.json?sort_by=type,health
  try {
    const instRes = await fetch('https://api.invidious.io/instances.json?sort_by=type,health');
    const list = await instRes.json();
    const working = list.filter(i => i[1]?.type === 'https' && i[1]?.api === true).slice(0, 5);
    for (const item of working) {
      const uri = item[1]?.uri;
      try {
        console.log('Testing active invidious:', uri);
        const vidRes = await fetch(`${uri}/api/v1/videos/${ytId}`);
        if (vidRes.ok) {
          const vData = await vidRes.json();
          console.log('SUCCESS active invidious:', uri, 'Title:', vData.title);
          const f = vData.formatStreams?.[0];
          if (f) {
            console.log('Found format stream URL from:', uri);
          }
          break;
        }
      } catch (e) {
        console.log('Failed active invidious:', uri, e.message);
      }
    }
  } catch (e) {
    console.log('Instances list error:', e.message);
  }
}

test();
