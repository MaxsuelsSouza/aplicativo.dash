import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SafeScreen from '@/components/SafeScreen';
import { StatusBar } from 'expo-status-bar';

export default function NovaLojaScreen() {
  return (
    <SafeScreen style={styles.container}>
      <StatusBar />
      <Text style={styles.text}>Fluxo de criação de loja</Text>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F28',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
