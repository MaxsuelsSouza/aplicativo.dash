import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { formatarBRLCompleto } from '@/utils/format';
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
  const router = useRouter();

  const handleProductPress = (item: ProductListItem) => {
    router.push({
      pathname: '/Produto',
      params: {
        id: item.id,
        nome: item.nome,
        preco: item.preco.toString(),
        imagem: item.imagem,
      },
    });
  };

  return (
    <ListContainer style={style}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)} activeOpacity={0.7}>
            <Card>
              <ProductImage source={{ uri: item.imagem }} />
              <Info>
                <ProductName numberOfLines={1}>{item.nome}</ProductName>
                <ProductPrice>{formatarBRLCompleto(typeof item.preco === 'string' ? parseFloat(item.preco) : item.preco)}</ProductPrice>
                <ProductDistance>{item.distanciaKm} km</ProductDistance>
              </Info>
            </Card>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ListContainer>
  );
}
