import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { fetchRegistros } from '@/app/registros';

export default function ContaScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRegistros().finally(() => setRefreshing(false));
  }, []);

  const acessarModoVendedor = () => {
    router.push('/(vendedor)/Dashboard');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        <Text style={styles.username}>Usuário</Text>
        <Pressable onPress={acessarModoVendedor}>
          <Text style={styles.link}>Acessar modo vendedor</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F28',
  },
  content: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  username: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 1,
  },
  link: {
    color: '#FFD700',
    fontSize: 16,
  },
});
