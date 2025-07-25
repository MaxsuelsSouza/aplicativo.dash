import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { imagemLoja } from '@/app/registros';
import { LojaImagem } from '@/interfaces/loja';
import CarrosselLojas from '@/components/CarrosselLojas';
import { styles } from './styles';

export default function HomeScreen() {
  const fallbackLojas: LojaImagem[] = Array.from({ length: 7 }).map((_, i) => ({
    id: `placeholder${i}`,
    nomeFantasia: `Loja ${i + 1}`,
    imagem: `https://picsum.photos/seed/loja${i}/300/300`,
  }));

  const [lojas, setLojas] = useState<LojaImagem[]>(fallbackLojas);

  useEffect(() => {
    imagemLoja()
      .then(data => setLojas(data.slice(0, 7)))
      .catch(err => {
        console.error('Erro ao carregar lojas', err);
        setLojas(fallbackLojas);
      });
  }, []);

  return (
    <View style={styles.containerTela}>
      <CarrosselLojas lojas={lojas} />
    </View>
  );
}
