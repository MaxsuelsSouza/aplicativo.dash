import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

import { useRouter } from 'expo-router';

const USERNAME = 'Usuário';

export default function PerfilVendedorScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <Text style={styles.username}>{USERNAME}</Text>
          <Text style={styles.tag}>Vendedor</Text>
        </View>
        <Pressable onPress={() => router.replace('/Home/page')}>
          <Text style={styles.link}>Sair do modo vendedor</Text>
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
  },
  username: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    marginRight: 2,
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#FFD700',
    color: '#1E1F28',
    fontSize: 13,
    fontWeight: 'bold',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
    marginTop: 10,
  },
  link: {
    color: '#FFD700',
    fontSize: 16,
  },
});
