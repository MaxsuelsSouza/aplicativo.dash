import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';

interface CarouselItem {
  id: string;
  title: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  aspectRatio: number;
}

const highlights: CarouselItem[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `d${i}`,
  title: `Destaque ${i + 1}`,
  image: `https://picsum.photos/seed/highlight${i}/300/200`,
}));

const promotions: CarouselItem[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `p${i}`,
  title: `Promoção ${i + 1}`,
  image: `https://picsum.photos/seed/promo${i}/300/200`,
}));

function generateProducts(count: number): Product[] {
  return Array.from({ length: count }).map((_, i) => {
    const id = Math.random().toString(36).slice(2);
    const aspect = Math.random() > 0.5 ? 1 : 3 / 4;
    return {
      id,
      name: `Produto ${i + 1}`,
      price: `R$ ${(Math.random() * 100).toFixed(2)}`,
      image: `https://picsum.photos/seed/${id}/400/400`,
      aspectRatio: aspect,
    };
  });
}

export default function HomeScreen() {
  const [location, setLocation] = useState('Obtendo localização...');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocation('Localização indisponível');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const [rev] = await Location.reverseGeocodeAsync(loc.coords);
        if (rev?.city) {
          setLocation(`${rev.city}${rev.subregion ? '/' + rev.subregion : ''}`);
        } else {
          setLocation('Localização desconhecida');
        }
      } catch {
        setLocation('Localização indisponível');
      }
    })();
    loadMore();
  }, []);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setProducts(p => [...p, ...generateProducts(10)]);
      setLoading(false);
    }, 300);
  }, [loading]);

  const renderCarouselItem = ({ item }: ListRenderItemInfo<CarouselItem>) => (
    <View style={styles.carouselCard}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </View>
  );

  const renderProduct = ({ item }: ListRenderItemInfo<Product>) => (
    <View style={[styles.productCard, { aspectRatio: item.aspectRatio }]}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );

  const header = (
    <View>
      <FlatList
        data={highlights}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCarouselItem}
        keyExtractor={i => i.id}
        style={styles.carousel}
      />
      <Text style={styles.promoTitle}>Promoções dos produtos que você viu ultimamente</Text>
      <FlatList
        data={promotions}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCarouselItem}
        keyExtractor={i => i.id}
        style={styles.carousel}
      />
    </View>
  );

  return (
    <View style={styles.containerTela}>
      <StatusBar style="light" />
      <View style={styles.searchBar}>
        <TouchableOpacity>
          <Icon name="map-pin" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.locationText}>{location}</Text>
        <TextInput
          placeholder="Buscar produtos"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={products}
        numColumns={2}
        columnWrapperStyle={styles.column}
        renderItem={renderProduct}
        keyExtractor={i => i.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#fff" style={{ margin: 16 }} /> : null}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
