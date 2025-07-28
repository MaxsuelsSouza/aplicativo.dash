const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dashnet-production.up.railway.app/api';

async function testConnection() {
  try {
    const response = await fetch(`${API_URL}/lojas`);
    if (!response.ok) {
      console.error(`Request failed with status ${response.status}`);
      return;
    }
    const data = await response.json();
    console.log('Stores received:', Array.isArray(data) ? data.length : data);
    console.log(data);
  } catch (err) {
    console.error('Error connecting to API:', err);
  }
}

if (require.main === module) {
  testConnection();
}
