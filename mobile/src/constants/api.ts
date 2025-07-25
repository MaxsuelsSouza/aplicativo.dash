// URL do backend utilizada para as requisições.
// Pode ser sobrescrita pela variável de ambiente `EXPO_PUBLIC_API_URL`.
// Caso nenhuma seja definida, assume o servidor local utilizado no desenvolvimento.
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';
