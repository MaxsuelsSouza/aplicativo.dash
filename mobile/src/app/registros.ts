import { API_URL } from "@/constants/api";
import { lojaImagem } from "@/interfaces/loja";
import { Produto } from "@/interfaces/product";
import { FotoValor } from "@/interfaces/fotoValor";

export async function ProdutosDetalhado(): Promise<Produto[]> {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch registros");
  }
  const data = await response.json();
  return data.map((p: any) => ({
    ...p,
        id: String(p.id),
        lojaId: String(p.lojaId),
        nome: p.nome,
        SKU: p.SKU,
        marca: p.marca,
        modelo: p.modelo,
        codigoBarras: p.codigoBarras,
        preco: p.preco,
        quantidadeEstoque: Number(p.quantidadeEstoque),
        peso: p.peso,
        dimensoes: p.dimensoes,
        cor: p.cor,
        tamanho: p.tamanho,
        material: p.material,
        produtoImagemId: p.produtoImagemId ? String(p.produtoImagemId) : null,
        ativo: Boolean(p.ativo),
        avaliacaoMedia: Number(p.avaliacaoMedia),
        numeroCompras: Number(p.numeroCompras),
        ultimaAtualizacao: p.ultimaAtualizacao,
        loja: p.loja
          ? {
              id: String(p.loja.id ?? ""),
              nomeFantasia: p.loja.nomeFantasia ?? "",
            }
          : { id: "", nomeFantasia: "" },
      }));
}

export async function imagemLoja(): Promise<lojaImagem[]> {
  const response = await fetch(`${API_URL}/lojas`);
  if (!response.ok) {
    throw new Error("Failed to fetch registros");
  }
  const data = await response.json();

  const lojas = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  return lojas.map((l: any, index: number) => ({
    ...l,
    id: String(l.id ?? index),
    nomeFantasia: String(l.nomeFantasia ?? ''),
    imagem: String(l.imagem ?? ''),
  }));
}

export async function produtosFotoValor(page = 1): Promise<FotoValor[]> {
  const response = await fetch(`${API_URL}/products/foto-valor?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch foto-valor');
  }
  const data = await response.json();

  const produtos = Array.isArray(data)
    ? data
    : Array.isArray(data?.dados)
      ? data.dados
      : [];

  return produtos.map((p: any, index: number) => ({
    id: p?.id != null ? String(p.id) : `${page}-${index}`,
    nome: String(p.nome ?? ''),
    preco: String(p.preco ?? ''),
    imagem: String(p.imagem ?? ''),
  }));
}

/**
 * Envia uma imagem para um produto existente e recebe o produto atualizado
 * com o id da imagem registrada.
 */
export async function adicionarFotoProduto(
  produtoId: string,
  foto: FormData
): Promise<Produto> {
  const response = await fetch(`${API_URL}/products/${produtoId}/imagem`, {
    method: 'POST',
    body: foto,
  });

  if (!response.ok) {
    throw new Error('Failed to upload product image');
  }

  const data = await response.json();

  // Assume o backend devolve o produto atualizado já com produtoImagemId
  return {
    ...data,
    id: String(data.id),
    produtoImagemId: data.produtoImagemId
      ? String(data.produtoImagemId)
      : null,
  } as Produto;
}
