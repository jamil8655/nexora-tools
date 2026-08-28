async function testLiveRender() {
  const url = 'https://nexora-tools-vgti.onrender.com';
  try {
    console.log('Pinging Render server at:', url);
    const res = await fetch(url);
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('Error connecting to Render:', err.message);
  }
}
testLiveRender();
