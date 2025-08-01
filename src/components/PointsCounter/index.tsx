import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PointsCounter() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>🎯 pts</Text>
      </View>
      <Text style={styles.points}>35</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: undefined,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  icon: {
    marginRight: 4,
  },
  label: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: '500',
  },
  points: {
    color: '#8B4513',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
