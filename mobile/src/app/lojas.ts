import { api } from '@/Api/api';

export interface Loja {
  id: number | string;
  nome: string;
  imagem?: string;
}

export async function fetchLojas(): Promise<Loja[]> {
  return api.get('/lojas');
}
