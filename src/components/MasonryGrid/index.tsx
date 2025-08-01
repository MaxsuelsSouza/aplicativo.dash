import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';

export interface MasonryGridItem {
    id: string;
    image: string;
    label?: string;
    height: number;
}

export interface MasonryGridProps {
    data: MasonryGridItem[];
    numColumns?: number;
    gap?: number;
    style?: any;
    title?: string;
    showTitle?: boolean;
}

export default function MasonryGrid({
    data,
    numColumns = 2,
    gap = 12,
    style,
    title,
    showTitle = true,
}: MasonryGridProps) {
    const screenWidth = Dimensions.get('window').width;
    const horizontalPadding = 24; // Padding horizontal total (12 de cada lado)
    const totalGap = gap * (numColumns - 1);
    const cardWidth = (screenWidth - totalGap - horizontalPadding) / numColumns;

    // Distribui itens nas colunas tipo masonry
    const columns: MasonryGridItem[][] = Array.from({ length: numColumns }, () => []);
    const columnHeights = Array(numColumns).fill(0);

    data.forEach((item) => {
        const minCol = columnHeights.indexOf(Math.min(...columnHeights));
        columns[minCol].push(item);
        columnHeights[minCol] += item.height;
    });

    return (
        <View style={style}>
            {showTitle && title && (
                <Text style={styles.titleText}>{title}</Text>
            )}
            <View style={styles.row}>
            {columns.map((col, colIdx) => (
                <View
                    key={colIdx}
                    style={{
                        width: cardWidth,
                        marginRight: colIdx === numColumns - 1 ? 0 : gap,
                    }}
                >
                    {col.map((item) => (
                        <View key={item.id} style={{ marginBottom: gap }}>
                            <View style={[styles.card, { height: item.height, width: cardWidth }]}>
                                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                                {item.label && <Text style={styles.label}>{item.label}</Text>}
                            </View>
                        </View>
                    ))}
                </View>
            ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    card: {
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 0,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    label: {
        position: 'absolute',
        left: 8,
        bottom: 8,
        color: '#8B4513',
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    titleText: {
        color: '#8B4513',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 12,
        fontFamily: 'System',
        paddingLeft: 0, // Mais próximo da borda esquerda
    },
});
