import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screen, SearchBar, ProductListVertical } from '@/components';
import { produtosFotoValor } from '@/app/registros';
import { ProductListItem } from '@/components/ProductListVertical';

export default function PesquisaScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const router = useRouter();
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
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            showPoints={false}
            placeholder="Pesquisar..."
          />
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => router.push('/Carrinho')}
        >
          <Icon name="cart" size={24} color="#8B4513" />
        </TouchableOpacity>
      </View>
      <ProductListVertical produtos={filtered} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: -15,
    borderRadius: 8,
  },
});
