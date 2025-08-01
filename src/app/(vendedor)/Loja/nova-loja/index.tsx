import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NovaLojaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fluxo de criação de loja</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
