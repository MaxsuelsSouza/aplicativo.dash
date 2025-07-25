import React, { useEffect, useState } from 'react';
import HomeScreen from './index';
import { fetchLojas } from '@/app/lojas';
import { CarouselItem } from '../../../components/CarouselSection/types';

export default function HomePage() {
  const [nearbyPromotions, setNearbyPromotions] =
    useState<CarouselItem[]>([]);

  useEffect(() => {
    fetchLojas()
      .then(lojas => {
        setNearbyPromotions(
          lojas.map(loja => ({
            id: String(loja.id),
            title: loja.nome,
            image: loja.imagem ?? '',
          }))
        );
      })
      .catch(() => {
        setNearbyPromotions([]);
      });
  }, []);

  return <HomeScreen nearbyPromotions={nearbyPromotions} />;
}

