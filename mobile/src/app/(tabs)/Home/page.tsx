import React, { useEffect, useState } from 'react';
import HomeScreen from './index';
import { lojaImagem } from '@/interfaces/loja';
import { API_URL } from '@/constants/api';

const DEFAULT_IMAGE = 'https://placehold.co/64x64';

export default function HomePage() {
  const [lojas, setLojas] = useState<lojaImagem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/lojas`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((l: any) => ({
          id: String(l.id),
          nomeFantasia: String(l.nomeFantasia ?? ''),
          imagem: l.imagem ? String(l.imagem) : DEFAULT_IMAGE,
        }));
        setLojas(mapped);
      })
      .catch(() => {
        // ignore errors for now
      });
  }, []);

  return <HomeScreen lojas={lojas} />;
}
