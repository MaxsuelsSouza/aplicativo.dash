import React, { useEffect, useState } from 'react';
import HomeScreen from './index';
import { lojaImagem } from '@/interfaces/loja';
import { imagemLoja } from '@/app/registros';

const DEFAULT_IMAGE = 'https://placehold.co/64x64';

export default function HomePage() {
  const [lojas, setLojas] = useState<lojaImagem[]>([]);

  useEffect(() => {
    imagemLoja()
      .then((data) => {
        const mapped = data.map((l) => ({
          ...l,
          imagem:
            l.imagem && l.imagem !== 'null' && l.imagem !== ''
              ? l.imagem
              : DEFAULT_IMAGE,
        }));
        setLojas(mapped);
      })
      .catch(() => {
        // ignore errors for now
      });
  }, []);

  return <HomeScreen lojas={lojas} />;
}
