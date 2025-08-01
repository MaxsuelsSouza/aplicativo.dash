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
  showTitle?: boolean;
}

export default function CarouselCircularHorizontal({ lojas, title = 'Lojas perto de você', showTitle = true }: CarouselCircularHorizontalProps) {
  return (
    <Container>
      {showTitle && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title>{title}</Title>
          <Text style={{ color: '#8B4513', fontSize: 15, fontWeight: '900', opacity: 0.7, paddingRight: 12, fontFamily: 'System' }}>Ver mais</Text>
        </View>
      )}
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
