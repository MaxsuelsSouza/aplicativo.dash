import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatarBRLCompleto } from '@/utils/format';
import { ProductActions } from '@/components';
import { useNotification } from '@/hooks/useNotification';
import { useHeartAnimation } from '@/hooks/useHeartAnimation';

export default function ProdutoScreen() {
  const { id, nome, preco, imagem } = useLocalSearchParams<{
    id?: string;
    nome?: string;
    preco?: string;
    imagem?: string;
  }>();
  
  const [isFavorited, setIsFavorited] = useState(false);
  const { showWarning } = useNotification();
  const { showHearts } = useHeartAnimation();

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (isFavorited) {
      showWarning('Removido dos favoritos', 'Produto removido da sua lista de favoritos');
    } else {
      showHearts();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imagem || 'https://placehold.co/400x300' }} 
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.productName}>{nome || 'Produto'}</Text>
          <Text style={styles.productPrice}>{formatarBRLCompleto(parseFloat(preco || '0'))}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações</Text>
            <View style={styles.infoRow}>
              <Icon name="store" size={20} color="#8B4513" />
              <Text style={styles.infoText}>Loja Exemplo</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="map-marker" size={20} color="#8B4513" />
              <Text style={styles.infoText}>2.5 km de distância</Text>
            </View>
          </View>
        </View>
      </View>

      <ProductActions
        productId={id}
        productName={nome}
        productPrice={preco}
        productImage={imagem}
        isFavorited={isFavorited}
        onFavoriteToggle={handleFavorite}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  mainContent: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '900',
    color: '#8B4513',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#8B4513',
    opacity: 0.8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#8B4513',
    marginLeft: 12,
  },
});