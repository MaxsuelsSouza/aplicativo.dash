import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
// import Menu from '@/components/Menu'; // Menu temporariamente oculto

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      {/* Menu temporariamente oculto */}
      {/* <Menu /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
