import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function InfiniteScrollLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#8B4513" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});