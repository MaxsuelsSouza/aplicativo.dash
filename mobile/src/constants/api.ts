// URL do backend utilizada para as requisições.
// Pode ser sobrescrita pela variável de ambiente `EXPO_PUBLIC_API_URL`.
// Caso nenhuma seja definida, assume o servidor local utilizado no desenvolvimento.
import { Platform } from 'react-native';

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api');
