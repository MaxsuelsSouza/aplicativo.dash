import React from 'react';
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

export default function CarouselCircularHorizontal({ lojas, title = 'Promoções perto de você' }: CarouselCircularHorizontalProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <List horizontal showsHorizontalScrollIndicator={false}>
        {lojas.map(loja => (
          <ItemContainer key={loja.id}>
            <ItemImage source={{ uri: loja.imagem }} />
            <ItemName numberOfLines={1}>{loja.nomeFantasia}</ItemName>
          </ItemContainer>
        ))}
      </List>
    </Container>
  );
}
