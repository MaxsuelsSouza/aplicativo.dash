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
import CarouselSection from '../../../components/CarouselSection';
import CircularCarousel from '../../../components/CircularCarousel';
import { CarouselItem } from '../../../components/CarouselSection/types';
import { imagemLoja } from './page';
import { styles } from './styles';

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

const fallbackNearbyPromotions: CarouselItem[] = Array.from({ length: 6 }).map(
  (_, i) => ({
    id: `np${i}`,
    title: `Oferta ${i + 1}`,
    image: `https://picsum.photos/seed/nearby${i}/300/300`,
  }),
);


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
  const [nearbyPromotions, setNearbyPromotions] =
    useState<CarouselItem[]>(fallbackNearbyPromotions);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setProducts(p => [...p, ...generateProducts(10)]);
      setLoading(false);
    }, 300);
  }, [loading]);

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
    imagemLoja()
      .then(lojas => {
        setNearbyPromotions(
          lojas.map((loja, i) => ({
            id: String(loja.id),
            title: loja.nomeFantasia,
            image: loja.imagem ?? `https://picsum.photos/seed/nearby${i}/300/300`,
          }))
        );
      })
      .catch(() => {
        setNearbyPromotions(fallbackNearbyPromotions);
      });
    loadMore();
  }, [loadMore]);

  const renderProduct = ({ item }: ListRenderItemInfo<Product>) => (
    <View style={[styles.productCard, { aspectRatio: item.aspectRatio }]}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
    </View>
  );

  const header = (
    <View>
      <CarouselSection
        title="Ofertas dos itens visualizados"
        data={promotions}
        isLargeCarousel={false}
      />
      <CircularCarousel
        title="Promoções perto de você"
        data={nearbyPromotions}
      />
      <CarouselSection
        title="Destaque do dia"
        data={highlights}
        isLargeCarousel={true}
      />
      <Text style={styles.infiniteScrollTitle}>Talvez você nem precisasse</Text>
    </View>
  ); return (
    <View style={styles.containerTela}>
      <View style={styles.statusBarBackground} />
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <TouchableOpacity>
            <Icon name="map-pin" size={20} color="#8B4513" />
          </TouchableOpacity>
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar produtos"
            placeholderTextColor="#A0522D"
            style={styles.searchInput}
          />
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>🎯 Pts</Text>
            <Text style={styles.codeText}>D015</Text>
          </View>
        </View>
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
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#FFD700" style={{ margin: 16 }} /> : null}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
