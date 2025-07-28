const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://dashnet-production.up.railway.app/api';

async function testConnection() {
  try {
    const response = await fetch(`${API_URL}/products/foto-valor`);
    if (!response.ok) {
      console.error(`Request failed with status ${response.status}`);
      return;
    }
    const data = await response.json();
    const lojas = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : [];
    console.log('Stores received:', lojas.length);
    console.log(lojas);
  } catch (err) {
    console.error('Error connecting to API:', err);
  }
}

if (require.main === module) {
  testConnection();
}
