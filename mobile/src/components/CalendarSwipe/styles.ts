import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  listaDeslizante: {
    flex: 1,
  },
  containerMes: {
    padding: 4,
    paddingTop: 60,
    paddingBottom: 100,
  },
  tituloMes: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cabecalhoSemana: {
    flexDirection: 'row',
  },
  diaSemana: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  diaSemanaFds: {
    color: '#FF6B6B', // Vermelho para sábado e domingo
  },
  linhaSemana: {
    flexDirection: 'row',
  },
  celulaDia: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#555',
    padding: 6,
    minHeight: 115,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  containerValores: {
    alignItems: 'flex-start',
    width: '100%',
  },
  numeroDia: {
    color: '#fff',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  textoFds: {
    color: '#FF6B6B', // Vermelho para números dos dias de fim de semana
  },
  textoDia: {
    color: '#fff',
    fontSize: 10,
    marginVertical: 1,
    textAlign: 'left',
  },
});
