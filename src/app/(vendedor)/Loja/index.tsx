import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const lojas = [
  { id: '1', nome: 'Loja 1', endereco: 'Rua A, 123' },
  { id: '2', nome: 'Loja 2', endereco: 'Av. B, 456' },
];

export default function LojaScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const novaLoja = () => {
    router.push('/(vendedor)/Loja/nova-loja' as any);
  };

  return (
    <View style={styles.container}>
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


