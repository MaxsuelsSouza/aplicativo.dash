import { API_URL } from "@/constants/api";

export interface Nota {
  id: number;
  descricao_do_gasto: string;
  isSaida: boolean;
  valor: number;
}

export interface Registro {
  id: number;
  id_pai: number | null;
  dia_atualizacao: string;
  entrada_total: number;
  saida_total: number;
  notas: Nota[];
}

export async function fetchRegistros(): Promise<Registro[]> {
  const response = await fetch(`${API_URL}/controle/registros`);
  if (!response.ok) {
    throw new Error('Failed to fetch registros');
  }
  const data = await response.json();
  return data.map((r: any) => ({
    ...r,
    id: Number(r.id),
    id_pai: r.id_pai !== null && r.id_pai !== undefined ? Number(r.id_pai) : null,
    notas: Array.isArray(r.notas)
      ? r.notas.map((n: any) => ({
          ...n,
          isSaida: Boolean(n.isSaida),
          valor: Boolean(n.isSaida)
            ? Number(r.saida_total)
            : Number(r.entrada_total),
        }))
      : [],
  }));
}

export interface NovoRegistroParams {
  date: Date;
  amount: number;
  description: string;
  isEntry: boolean;
}

export async function createRegistro({
  date,
  amount,
  description,
  isEntry,
}: NovoRegistroParams) {
  const normalizedDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const body = {
    data: normalizedDate.toISOString(),
    entrada: isEntry ? amount : 0,
    saida: isEntry ? 0 : amount,
    descricao_do_gasto: description,
    is_saida: !isEntry,
  };
  const response = await fetch(`${API_URL}/controle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Failed to create registro');
  }
  return response.json();
}

export async function updateRegistro(
  id: number,
  amount: number,
  isEntry: boolean
) {
  const body: any = {};
  if (isEntry) body.entrada = amount;
  else body.saida = amount;
  const response = await fetch(`${API_URL}/controle/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Failed to update registro');
  }
  return response.json();
}

export async function marcarRecorrente(id: number, meses?: number) {
  const body: any = {};
  if (typeof meses === 'number') body.meses = meses;
  const response = await fetch(`${API_URL}/controle/${id}/recorrente`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Failed to marcar recorrente');
  }
  return response.json();
}

export async function deleteRecorrente(id: number) {
  const response = await fetch(`${API_URL}/controle/${id}/recorrente`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to apagar recorrencia');
  }
}

export async function deleteRegistro(id: number) {
  const response = await fetch(`${API_URL}/controle/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete registro');
  }
}
