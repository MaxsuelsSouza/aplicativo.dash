import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    backgroundColor: '#1E1F28',
  },
  areaConteudo: {
    flex: 1,
  },
  botaoAlternarVisao: {
    position: 'absolute',
    top: '75%',
    right: 0,
    transform: [{ translateY: -18 }],
    zIndex: 11,
    backgroundColor: '#444',
    padding: 6,
    borderRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
