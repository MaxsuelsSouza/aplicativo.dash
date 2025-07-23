import React, { useState } from 'react';
import { FlatList, Image, ListRenderItemInfo, Text, View } from 'react-native';
import { CarouselItem, CarouselSectionProps } from './types';
import { styles } from './styles';

export default function CarouselSection({ title, data, isLargeCarousel = false }: CarouselSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderCarouselItem = ({ item }: ListRenderItemInfo<CarouselItem>) => (
        <View style={isLargeCarousel ? styles.secondCarouselContainer : styles.carouselContainer}>
            <View style={isLargeCarousel ? styles.secondCarouselCard : styles.carouselCard}>
                <Image
                    source={{ uri: item.image }}
                    style={isLargeCarousel ? styles.secondCarouselImage : styles.carouselImage}
                />
            </View>
            {!isLargeCarousel && (
                <Text style={styles.carouselTitle}>
                    {item.title}
                </Text>
            )}
        </View>
    );

    const onScroll = (event: any) => {
        if (isLargeCarousel) {
            const scrollPosition = event.nativeEvent.contentOffset.x;
            const itemWidth = 320 + 4; // largura do card + marginRight
            const index = Math.round(scrollPosition / itemWidth);
            setCurrentIndex(index);
        }
    };

    const renderDots = () => {
        if (!isLargeCarousel) return null;

        return (
            <View style={styles.dotsContainer}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === currentIndex ? styles.activeDot : styles.inactiveDot
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderCarouselItem}
                keyExtractor={item => item.id}
                style={styles.carousel}
                onScroll={onScroll}
                scrollEventThrottle={16}
                pagingEnabled={isLargeCarousel}
                snapToInterval={isLargeCarousel ? 324 : undefined}
                decelerationRate={isLargeCarousel ? "fast" : "normal"}
            />
            {renderDots()}
        </View>
    );
}