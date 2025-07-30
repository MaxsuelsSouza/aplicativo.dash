import React from 'react';
import { FlatList } from 'react-native';
import {
  ListContainer,
  Card,
  ProductImage,
  Info,
  ProductName,
  ProductPrice,
  ProductDistance,
} from './styles';

export interface ProductListItem {
  id: string;
  nome: string;
  preco: string | number;
  imagem: string;
  distanciaKm: number;
}

export interface ProductListVerticalProps {
  produtos: ProductListItem[];
  style?: any;
}

export default function ProductListVertical({ produtos, style }: ProductListVerticalProps) {
  return (
    <ListContainer style={style}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <ProductImage source={{ uri: item.imagem }} />
            <Info>
              <ProductName numberOfLines={1}>{item.nome}</ProductName>
              <ProductPrice>{item.preco}</ProductPrice>
              <ProductDistance>{item.distanciaKm} km</ProductDistance>
            </Info>
          </Card>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ListContainer>
  );
}
