import React, { useEffect, useState } from 'react';
import HomeScreen from './index';
import { API_URL } from '@/constants/api';
import { lojaImagem } from '@/interfaces/loja';
import { CarouselItem } from '../../../components/CarouselSection/types';

export async function imagemLoja(): Promise<lojaImagem[]> {
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
  const [nearbyPromotions, setNearbyPromotions] = useState<CarouselItem[]>([]);

  useEffect(() => {
    imagemLoja()
      .then(lojas =>
        setNearbyPromotions(
          lojas.map(loja => ({
            id: loja.id,
            title: loja.nomeFantasia,
            image: loja.imagem,
          }))
        )
      )
      .catch(console.error);
  }, []);

  return <HomeScreen nearbyPromotions={nearbyPromotions} />;
}

