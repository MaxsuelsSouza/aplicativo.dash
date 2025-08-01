export type OuvinteCabecalhoHome = () => void;

const ouvintes = new Set<OuvinteCabecalhoHome>();

export function emitirExibicaoCabecalhoHome() {
  ouvintes.forEach(o => o());
}

export function inscreverExibicaoCabecalhoHome(ouvinte: OuvinteCabecalhoHome) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}
