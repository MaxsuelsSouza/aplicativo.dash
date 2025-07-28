import { API_URL } from "@/constants/api";
import { lojaImagem } from "@/interfaces/loja";
import { Produto } from "@/interfaces/product";

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
        imagens: Array.isArray(p.imagens) ? p.imagens : [],
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

  return lojas.map((l: any) => ({
    ...l,
    id: String(l.id),
    nomeFantasia: String(l.nomeFantasia),
    imagem: String(l.imagem),
  }));
}
