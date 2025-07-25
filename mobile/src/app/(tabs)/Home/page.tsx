import React, { useEffect, useState } from 'react';
import HomeScreen from './index';
import { fetchLojas } from '@/app/lojas';
import { CarouselItem } from '../../../components/CarouselSection/types';

const fallbackNearbyPromotions: CarouselItem[] = Array.from({ length: 6 }).map(
  (_, i) => ({
    id: `np${i}`,
    title: `Oferta ${i + 1}`,
    image: `https://picsum.photos/seed/nearby${i}/300/300`,
  }),
);

export default function HomePage() {
  const [nearbyPromotions, setNearbyPromotions] =
    useState<CarouselItem[]>(fallbackNearbyPromotions);

  useEffect(() => {
    fetchLojas()
      .then(lojas => {
        setNearbyPromotions(
          lojas.map((loja, i) => ({
            id: String(loja.id),
            title: loja.nome,
            image: loja.imagem ?? `https://picsum.photos/seed/nearby${i}/300/300`,
          })),
        );
      })
      .catch(() => {
        setNearbyPromotions(fallbackNearbyPromotions);
      });
  }, []);

  return <HomeScreen nearbyPromotions={nearbyPromotions} />;
}

