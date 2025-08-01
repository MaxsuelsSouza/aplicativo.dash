import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCartAnimation } from '@/hooks/useCartAnimation';

interface ProductActionsProps {
  productId?: string;
  productName?: string;
  productPrice?: string;
  productImage?: string;
  isFavorited: boolean;
  onFavoriteToggle: () => void;
}

export default function ProductActions({
  productId,
  productName,
  productPrice,
  productImage,
  isFavorited,
  onFavoriteToggle,
}: ProductActionsProps) {
  const router = useRouter();
  const { showCartAnimation } = useCartAnimation();

  const handleReserve = () => {
    router.push(`/Reserva?produtoId=${productId}&nome=${productName}&preco=${productPrice}&imagem=${productImage}`);
  };

  const handleAddToCart = () => {
    showCartAnimation();
  };

  return (
    <View style={styles.bottomActions}>
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={onFavoriteToggle}
      >
        <Icon 
          name={isFavorited ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorited ? "#E74C3C" : "#8B4513"} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.reserveButton}
        onPress={handleReserve}
      >
        <Text style={styles.reserveText}>Reservar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Icon name="cart" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#DDD8C0',
    gap: 12,
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFAF0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDD8C0',
  },
  reserveButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#F39C12',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reserveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartButton: {
    width: 48,
    height: 48,
    backgroundColor: '#8B4513',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});