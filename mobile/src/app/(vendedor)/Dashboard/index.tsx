import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import SafeScreen from '@/components/SafeScreen';
import { StatusBar } from 'expo-status-bar';
import { fetchRegistros } from '@/app/registros';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRegistros().finally(() => setRefreshing(false));
  }, []);

  return (
    <SafeScreen style={styles.container}>
      <StatusBar />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        <Text style={styles.text}>em criação</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
