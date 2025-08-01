import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen, SearchBar, ProductListVertical } from '@/components';
import { produtosFotoValor } from '@/app/registros';
import { ProductListItem } from '@/components/ProductListVertical';

export default function PesquisaScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [search, setSearch] = useState(q ? String(q) : '');
  const [produtos, setProdutos] = useState<ProductListItem[]>([]);

  useEffect(() => {
    produtosFotoValor()
      .then((data) => {
        const mapped: ProductListItem[] = data.map((p) => ({
          id: p.id,
          nome: p.nome,
          preco: p.preco,
          imagem: p.imagem,
          distanciaKm: 0,
        }));
        setProdutos(mapped);
      })
      .catch(() => {
        // ignore errors
      });
  }, []);

  const filtered = produtos.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Screen contentContainerStyle={styles.content} scrollable>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        showPoints={false}
        placeholder="Pesquisar..."
      />
      <ProductListVertical produtos={filtered} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});
