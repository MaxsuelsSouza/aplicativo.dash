import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { lojaImagem } from '@/interfaces/loja';

export const Container = styled(FlatList as new () => FlatList<lojaImagem>).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Item = styled.View`
  align-items: center;
  padding: 8px;
`;

export const LojaImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const LojaNome = styled.Text`
  margin-top: 4px;
  color: #8B4513;
  font-size: 12px;
  text-align: center;
`;
