import { API_URL } from "@/constants/api";

export interface Loja {
  id: string | number;
  nome: string;
  imagem: string;
}

export async function fetchLojas(): Promise<Loja[]> {
  const response = await fetch(`${API_URL}/lojas`);
  if (!response.ok) {
    throw new Error('Failed to fetch lojas');
  }
  return response.json();
}
