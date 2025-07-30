export interface Produto {
  id: string;
  lojaId: string;
  nome: string;
  SKU: string;
  marca: string;
  modelo: string;
  codigoBarras: string;
  preco: string;
  quantidadeEstoque: number;
  peso: string;
  dimensoes: string;
  cor: string;
  tamanho: string;
  material: string;
  /**
   * Relacionamento opcional com a tabela de imagens do produto.
   * Pode ser nulo quando o produto ainda não possui foto cadastrada.
   */
  produtoImagemId?: string | null;
  ativo: boolean;
  avaliacaoMedia: number;
  numeroCompras: number;
  ultimaAtualizacao: string;
  loja: {
    id: string;
    nomeFantasia: string;
  };
}
