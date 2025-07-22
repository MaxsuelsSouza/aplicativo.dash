import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rolagem: {
    flex: 1,
    width: "100%",
  },
  conteudo: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 8,
  },
  containerMes: {
    marginBottom: 24,
    paddingHorizontal: 8,
    paddingTop: 40,
  },
  tituloMes: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    paddingLeft: 4,
  },
  cabecalhoLinha: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#555",
    paddingBottom: 4,
    marginBottom: 4,
  },
  celulaCabecalho: {
    flex: 1,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 8,
  },
  celulaValorCabecalho: {
    flex: 1,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "left",
  },
  linha: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  celula: {
    flex: 1,
    color: "#fff",
    textAlign: "left",
    fontSize: 14,
    fontVariant: ["tabular-nums"],
    paddingLeft: 8,
  },
  celulaValor: {
    flex: 1,
    alignItems: "flex-start",
  },
  textoValor: {
    color: "#fff",
    textAlign: "left",
    fontSize: 14,
    fontVariant: ["tabular-nums"],
  },
  sobreposicaoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  conteudoModal: {
    backgroundColor: "#23242a",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  textoNota: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 14,
  },
  textoSoma: {
    color: "#fff",
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
  botaoOpcao: {
    marginBottom: 8,
    paddingVertical: 6,
    backgroundColor: "#444",
    borderRadius: 4,
  },
  botaoOpcaoText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  conteudoOpcoes: {
    paddingTop: 32,
  },
  iconeFechar: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  botaoFechar: {
    marginTop: 12,
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#444",
    borderRadius: 4,
  },
  textoBotaoFechar: {
    color: "#fff",
    fontSize: 14,
  },
  linhaBotoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  botaoAcao: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#444",
    borderRadius: 4,
  },
  botaoAcaoDesabilitado: {
    opacity: 0.5,
  },
  celulaDia: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 4,
  },
  linhaLista: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  textoLista: {
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },
  acoesLista: {
    flexDirection: "row",
    alignItems: "center",
  },
  campoEntrada: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 6,
    marginBottom: 8,
    color: "#000",
  },
});
