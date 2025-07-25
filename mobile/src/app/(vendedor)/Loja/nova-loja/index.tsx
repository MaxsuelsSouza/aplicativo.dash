import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function NovaLojaScreen() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.text}>Fluxo de criação de loja</Text>
    </View>
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
