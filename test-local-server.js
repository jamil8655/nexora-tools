async function test() {
  try {
    const res = await fetch('http://localhost:3001/api/health');
    const data = await res.json();
    console.log('✅ Server Health:', data);

    const infoRes = await fetch('http://localhost:3001/api/video/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
    });
    const infoData = await infoRes.json();
    console.log('✅ Video Info Title:', infoData.title);
    console.log('✅ Video Formats:', infoData.formats?.map(f => f.label));
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}
test();
