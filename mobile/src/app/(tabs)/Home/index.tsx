import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import { lojaImagem } from '@/interfaces/loja';
import { imagemLoja } from './page';
import { styles } from './styles';

export default function HomeScreen() {
  const [lojas, setLojas] = useState<lojaImagem[]>([]);

  useEffect(() => {
    imagemLoja()
      .then(dados => setLojas(dados))
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }: { item: lojaImagem }) => (
    <View style={styles.storeItem}>
      <Image source={{ uri: item.imagem }} style={styles.storeImage} />
      <Text style={styles.storeName}>{item.nomeFantasia}</Text>
    </View>
  );

  return (
    <View style={styles.containerTela}>
      <FlatList
        data={lojas.slice(0, 7)}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.carouselContainer}
      />
    </View>
  );
}
