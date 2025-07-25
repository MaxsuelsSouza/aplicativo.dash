import React from 'react';
import HomeScreen from './index';
import { API_URL } from '@/constants/api';
import { LojaImagem } from '@/interfaces/loja';

export async function imagemLoja(): Promise<LojaImagem[]> {
  const response = await fetch(`${API_URL}/lojas`);
  if (!response.ok) {
    throw new Error('Failed to fetch registros');
  }
  const data = await response.json();
  return data.map((l: any) => ({
    ...l,
    id: String(l.id),
    nomeFantasia: String(l.nomeFantasia),
    imagem: String(l.imagem),
  }));
}

export default function HomePage() {
  return <HomeScreen />;
}

