export interface Suggestion {
  text: string;
  source?: string;
}

export interface FeedbackPayload {
  term: string;
  suggestion: string;
  timestamp: string;
  userId?: string;
}

import { API_URL } from '@/constants/api';

// Busca produtos no backend conforme o termo informado.
// Retorna no máximo 10 sugestões para exibir no SearchModal.
export async function fetchAutocomplete(term: string): Promise<Suggestion[]> {
  try {
    const resp = await fetch(
      `${API_URL}/products/busca?termo=${encodeURIComponent(term)}`,
    );
    if (!resp.ok) {
      console.error('Failed to fetch autocomplete', resp.status);
      return [];
    }
    const data = await resp.json();
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.dados)
        ? data.dados
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.resultados)
            ? data.resultados
            : [];
    return list.slice(0, 10).map((item: any) => ({
      text: String(item.text ?? item.nome ?? item),
      source: item.source ? String(item.source) : 'banco tradicional',
    }));
  } catch (err) {
    console.error('Error fetching autocomplete', err);
    return [];
  }
}

export async function sendFeedback(payload: FeedbackPayload): Promise<void> {
  try {
    await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('Error sending feedback', err);
  }
}
