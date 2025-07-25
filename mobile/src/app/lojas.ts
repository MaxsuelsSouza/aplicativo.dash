export interface Loja {
  id: string | number;
  nome: string;
  imagem: string;
}

export async function fetchLojas(): Promise<Loja[]> {
  // Fetch stores directly from the local API.
  // The backend is expected to run on http://localhost:3000.
  const response = await fetch('http://localhost:3000/api/lojas');
  if (!response.ok) {
    throw new Error('Failed to fetch lojas');
  }
  return response.json();
}
