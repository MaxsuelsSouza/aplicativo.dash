import React from 'react';
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import SafeScreen from '@/components/SafeScreen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const USERNAME = 'Usuário';

export default function PerfilVendedorScreen() {
  const router = useRouter();

  return (
    <SafeScreen style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.username}>{USERNAME}</Text>
        <Text style={styles.text}>Perfil do vendedor</Text>
        <Pressable onPress={() => router.replace('/Home')}>
          <Text style={styles.link}>Sair do modo vendedor</Text>
        </Pressable>
      </ScrollView>
    </SafeScreen>
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
  },
  username: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 32,
  },
  link: {
    color: '#FFD700',
    fontSize: 16,
  },
});
