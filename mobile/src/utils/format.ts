export function formatarBRL(valor: number): string {
  // Arredonda para cima apenas se os centavos forem >= 95
  const centavos = Math.round((valor % 1) * 100);
  let valorFinal: number;

  if (centavos >= 95) {
    valorFinal = Math.ceil(valor);
  } else {
    valorFinal = Math.floor(valor);
  }
  
  return valorFinal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatarBRLCompleto(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
