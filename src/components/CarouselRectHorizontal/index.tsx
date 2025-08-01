import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

export interface CarouselRectHorizontalItem {
    id: string;
    image: string;
    value: string | number;
}

export interface CarouselRectHorizontalProps {
    data: CarouselRectHorizontalItem[];
    size?: 'small' | 'large';
    cardWidthSmall?: number;
    cardWidthLarge?: number;
    cardHeightSmall?: number;
    cardHeightLarge?: number;
    style?: any;
    title?: string;
    showTitle?: boolean;
}

const DEFAULT_WIDTH_SMALL = 140;
const DEFAULT_WIDTH_LARGE = 220;
const DEFAULT_HEIGHT_SMALL = 90;
const DEFAULT_HEIGHT_LARGE = 140;

export default function CarouselRectHorizontal({
    data,
    size = 'small',
    cardWidthSmall = DEFAULT_WIDTH_SMALL,
    cardWidthLarge = DEFAULT_WIDTH_LARGE,
    cardHeightSmall = DEFAULT_HEIGHT_SMALL,
    cardHeightLarge = DEFAULT_HEIGHT_LARGE,
    style,
    title,
    showTitle = true,
}: CarouselRectHorizontalProps) {
    const cardWidth = size === 'large' ? cardWidthLarge : cardWidthSmall;
    const cardHeight = size === 'large' ? cardHeightLarge : cardHeightSmall;

    return (
        <View style={style}>
            {showTitle && title && (
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.seeMoreText}>Ver mais</Text>
                </View>
            )}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8 }}
            >
                {data.map((item) => (
                    <View key={item.id} style={[styles.card, { width: cardWidth, height: cardHeight }]}>
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>{item.value}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        backgroundColor: '#fff',
        marginRight: 14,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    valueContainer: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 40,
        alignItems: 'flex-end',
    },
    valueText: {
        color: '#8B4513',
        fontWeight: 'bold',
        fontSize: 16,
    },
    badge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FFD700',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        zIndex: 2,
        elevation: 2,
    },
    badgeText: {
        color: '#8B4513',
        fontWeight: 'bold',
        fontSize: 13,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 8,
        paddingHorizontal: 12,
    },
    titleText: {
        color: '#8B4513',
        fontSize: 18,
        fontWeight: '900',
        fontFamily: 'System',
    },
    seeMoreText: {
        color: '#8B4513',
        fontSize: 15,
        fontWeight: '900',
        opacity: 0.7,
        fontFamily: 'System',
    },
});
