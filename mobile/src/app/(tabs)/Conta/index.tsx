import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components';

export default function ContaScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const acessarModoVendedor = () => {
    router.push('/(vendedor)/Dashboard');
  };

  return (
    <Screen
      scrollable
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.username}>Usuário</Text>
      <Pressable onPress={acessarModoVendedor}>
        <Text style={styles.link}>Acessar modo vendedor</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
