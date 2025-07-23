import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import MenuVendedor from '@/components/MenuVendedor';

export default function VendedorLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <MenuVendedor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
