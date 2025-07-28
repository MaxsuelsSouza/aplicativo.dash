import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px 0;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 8px;
  padding-left: 16px;
`;

export const List = styled.ScrollView`
  padding-left: 16px;
`;

export const ItemContainer = styled.View`
  width: 80px;
  margin-right: 12px;
  align-items: center;
`;

export const ItemImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #ddd;
`;

export const ItemName = styled.Text`
  margin-top: 8px;
  color: #333;
  font-size: 12px;
  text-align: center;
`;
