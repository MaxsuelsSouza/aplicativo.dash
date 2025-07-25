import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { imagemLoja } from '@/app/registros';
import { lojaImagem } from '@/interfaces/loja';
import CarrosselLojas from '@/components/CarrosselLojas';
import { styles } from './styles';

export default function HomeScreen() {
  const [lojas, setLojas] = useState<lojaImagem[]>([]);

  useEffect(() => {
    imagemLoja()
      .then(setLojas)
      .catch(err => console.error('Erro ao carregar lojas', err));
  }, []);

  return (
    <View style={styles.containerTela}>
      <CarrosselLojas lojas={lojas} />
    </View>
  );
}
