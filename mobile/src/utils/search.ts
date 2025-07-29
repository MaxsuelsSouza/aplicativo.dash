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

export async function fetchAutocomplete(term: string): Promise<Suggestion[]> {
  try {
    const resp = await fetch(`${API_URL}/autocomplete?term=${encodeURIComponent(term)}`);
    if (!resp.ok) {
      console.error('Failed to fetch autocomplete', resp.status);
      return [];
    }
    const data = await resp.json();
    const list = Array.isArray(data) ? data : data?.data || [];
    return list.slice(0, 10).map((item: any) => ({
      text: String(item.text ?? item),
      source: item.source ? String(item.source) : undefined,
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
