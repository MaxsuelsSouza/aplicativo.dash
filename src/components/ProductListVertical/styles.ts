import styled from 'styled-components/native';

export const ListContainer = styled.View`
  width: 100%;
`;

export const Card = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.07;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

export const ProductImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: #ddd;
`;

export const Info = styled.View`
  flex: 1;
`;

export const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 4px;
`;

export const ProductPrice = styled.Text`
  font-size: 15px;
  color: #8b4513;
  margin-bottom: 2px;
`;

export const ProductDistance = styled.Text`
  font-size: 13px;
  color: #333;
`;
