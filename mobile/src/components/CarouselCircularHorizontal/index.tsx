import React from 'react';
import { Text, View } from 'react-native';
import { lojaImagem } from '@/interfaces/loja';
import {
  Container,
  Title,
  List,
  ItemContainer,
  ItemImage,
  ItemName,
} from './styles';

export interface CarouselCircularHorizontalProps {
  lojas: lojaImagem[];
  title?: string;
}

export default function CarouselCircularHorizontal({ lojas, title = 'Lojas perto de você' }: CarouselCircularHorizontalProps) {
  return (
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title>{title}</Title>
        <Text style={{ color: '#8B4513', fontSize: 15, fontWeight: 'bold', opacity: 0.7, paddingRight: 9 }}>Ver mais</Text>
      </View>
      <List horizontal showsHorizontalScrollIndicator={false}>
        {lojas.map((loja, idx) => (
          <ItemContainer key={loja.id || idx.toString()}>
            <ItemImage source={{ uri: loja.imagem }} />
            <ItemName numberOfLines={1}>{loja.nomeFantasia}</ItemName>
          </ItemContainer>
        ))}
      </List>
    </Container>
  );
}
