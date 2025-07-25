import { API_URL } from '@/constants/api';
import { api } from '@/api';

export interface Loja {
  id: string;
  nome: string;
  imagem: string;
}

function resolveImageUrl(imagem: string): string {
  const normalized = imagem.replace(/\\/g, '/');
  const parts = normalized.split('/uploads/');
  if (parts.length > 1) {
    const baseUrl = API_URL.replace(/\/api$/, '');
    return `${baseUrl}/uploads/${parts[1]}`;
  }
  return imagem;
}

export async function fetchLojas(): Promise<Loja[]> {
  const data = await api.get<any[]>('/lojas');
  return data.map((loja: any) => ({
    id: String(loja.identificador ?? loja.id),
    nome: loja.nomeFantasia ?? loja.nome,
    imagem: resolveImageUrl(String(loja.imagem ?? '')),
  }));
}

