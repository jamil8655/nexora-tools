async function checkRenderServices() {
  const possibleUrls = [
    'https://nexora-tools.onrender.com',
    'https://nexora-media-server.onrender.com',
    'https://nexora-tools-api.onrender.com',
    'https://nexora.onrender.com',
    'https://nexora-api.onrender.com',
    'https://nexoratools.onrender.com'
  ];

  for (const url of possibleUrls) {
    try {
      console.log('Testing URL:', url);
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      const text = await res.text();
      console.log(`URL ${url} Status:`, res.status, 'Response:', text.slice(0, 100));
    } catch (e) {
      console.log(`URL ${url} Error:`, e.message);
    }
  }
}

checkRenderServices();
