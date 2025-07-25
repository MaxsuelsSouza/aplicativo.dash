const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Verifica se o backend esta respondendo e retornando dados.
 * Retorna `true` quando a requisicao obtiver sucesso e
 * algum dado for recebido.
 */
async function checkBackendData() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    console.error('Erro ao verificar dados do backend:', error);
    return false;
  }
}

module.exports = { checkBackendData };
