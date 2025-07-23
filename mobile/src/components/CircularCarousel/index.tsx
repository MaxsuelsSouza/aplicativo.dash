import React from 'react';
import { FlatList, Image, ListRenderItemInfo, Text, View, TouchableOpacity } from 'react-native';
import { CarouselItem } from '../CarouselSection/types';
import { styles } from './styles';

interface CircularCarouselProps {
  title: string;
  data: CarouselItem[];
}

export default function CircularCarousel({ title, data }: CircularCarouselProps) {
  const renderCircularItem = ({ item }: ListRenderItemInfo<CarouselItem>) => (
    <View style={styles.circularContainer}>
      <View style={styles.circularCard}>
        <Image source={{ uri: item.image }} style={styles.circularImage} />
      </View>
      <Text style={styles.circularTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCircularItem}
        keyExtractor={item => item.id}
        style={styles.carousel}
        contentContainerStyle={styles.circularCarousel}
      />
    </View>
  );
}
