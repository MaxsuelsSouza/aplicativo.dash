import { API_URL } from '@/constants/api';

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
  const response = await fetch(`${API_URL}/lojas`);
  if (!response.ok) {
    throw new Error('Failed to fetch lojas');
  }
  const data = await response.json();
  return data.map((loja: any) => ({
    id: String(loja.identificador ?? loja.id),
    nome: loja.nomeFantasia ?? loja.nome,
    imagem: resolveImageUrl(String(loja.imagem ?? '')),
  }));
}

