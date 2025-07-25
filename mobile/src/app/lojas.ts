export interface Loja {
  id: string | number;
  nome: string;
  imagem: string;
}

import { API_URL } from "@/constants/api";

export async function fetchLojas(): Promise<Loja[]> {
  // Fetch stores from the configured backend URL.
  const response = await fetch(`${API_URL}/lojas`);
  if (!response.ok) {
    throw new Error('Failed to fetch lojas');
  }
  return response.json();
}
