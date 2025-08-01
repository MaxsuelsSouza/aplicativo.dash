import styled from "styled-components/native";

export const ContainerMenu = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  background: #fff;
  padding: 0 16px 24px 16px;
  height: 85px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-top-width: 1px;
  border-color: #ddd8c0;
`;

export const BotaoMenu = styled.TouchableOpacity`
  flex: 1;
`;

export const ItemMenu = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

export const IconeMenu = styled.View`
  margin-bottom: 4px;
`;

export const RotuloMenu = styled.Text<{ ativo?: boolean }>`
  font-size: 14px;
  color: ${({ ativo }) => (ativo ? "#FFD700" : "#8B4513")};
  font-family: "Inter";
  font-weight: 500;
`;
