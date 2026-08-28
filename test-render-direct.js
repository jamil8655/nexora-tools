async function testRenderEndpoints() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const renderServer = 'https://nexora-tools-vgti.onrender.com';

  console.log('1. Testing Render /api/health...');
  try {
    const health = await fetch(`${renderServer}/api/health`);
    console.log('Health status:', health.status, await health.json());
  } catch (e) {
    console.log('Health error:', e.message);
  }

  console.log('\n2. Testing Render POST /api/video/info...');
  try {
    const infoRes = await fetch(`${renderServer}/api/video/info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    console.log('Info status:', infoRes.status);
    const infoText = await infoRes.text();
    console.log('Info response:', infoText);
  } catch (e) {
    console.log('Info error:', e.message);
  }

  console.log('\n3. Testing Render GET /api/video/download...');
  try {
    const dlRes = await fetch(`${renderServer}/api/video/download?url=${encodeURIComponent(url)}&quality=720p&type=video`);
    console.log('Download status:', dlRes.status, 'Content-Type:', dlRes.headers.get('content-type'), 'Content-Disposition:', dlRes.headers.get('content-disposition'));
    const text = await dlRes.text();
    console.log('Download body (first 200 chars):', text.slice(0, 200));
  } catch (e) {
    console.log('Download error:', e.message);
  }
}

testRenderEndpoints();
