import React from 'react';
import CarouselCircularHorizontal from '@/components/CarouselCircularHorizontal';
import { lojaImagem } from '@/interfaces/loja';

export interface HomeProps {
  lojas: lojaImagem[];
}

export default function Home({ lojas }: HomeProps) {
  return <CarouselCircularHorizontal lojas={lojas} />;
}
