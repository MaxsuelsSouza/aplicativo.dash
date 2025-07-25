import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { fetchRegistros } from '@/app/registros';

const lojas = [
  { id: '1', nome: 'Loja 1', endereco: 'Rua A, 123' },
  { id: '2', nome: 'Loja 2', endereco: 'Av. B, 456' },
];

export default function LojaScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRegistros().finally(() => setRefreshing(false));
  }, []);

  const novaLoja = () => {
    router.push('/(vendedor)/Loja/nova');
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Lojas</Text>
        <Pressable onPress={novaLoja} style={styles.addButton}>
          <Icon name="plus" size={28} color="#FFD700" />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        {lojas.map(loja => (
          <View key={loja.id} style={styles.card}>
            <Text style={styles.storeName}>{loja.nome}</Text>
            <Text style={styles.storeAddress}>{loja.endereco}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F28',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 4,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#23242a',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    width: '100%',
  },
  storeName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeAddress: {
    color: '#ddd',
    marginTop: 4,
  },
});
