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

export function formatarData(data: Date | string): string {
  const date = typeof data === 'string' ? new Date(data) : data;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatarDataHora(data: Date | string): string {
  const date = typeof data === 'string' ? new Date(data) : data;
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatarDataRelativa(data: Date | string): string {
  const date = typeof data === 'string' ? new Date(data) : data;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Hoje';
  } else if (diffDays === 1) {
    return 'Ontem';
  } else if (diffDays <= 7) {
    return `${diffDays} dias atrás`;
  } else {
    return formatarData(date);
  }
}
