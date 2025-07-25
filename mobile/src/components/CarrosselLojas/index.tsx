import React from 'react';
import { Dimensions } from 'react-native';
import { LojaImagem } from '@/interfaces/loja';
import { Container, Item, LojaImage, LojaNome } from './styles';

export interface CarrosselLojasProps {
  lojas: LojaImagem[];
}

export default function CarrosselLojas({ lojas }: CarrosselLojasProps) {
  const itemWidth = Dimensions.get('window').width / 7;

  return (
    <Container
      data={lojas}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Item style={{ width: itemWidth }}>
          <LojaImage source={{ uri: item.imagem }} />
          <LojaNome numberOfLines={1}>{item.nomeFantasia}</LojaNome>
        </Item>
      )}
    />
  );
}
