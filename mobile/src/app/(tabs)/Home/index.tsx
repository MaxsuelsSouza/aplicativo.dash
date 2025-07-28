import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { lojaImagem } from '@/interfaces/loja';
import { SearchBar, PointsCounter, LocationStatus, CarouselCircularHorizontal, CarouselRectHorizontal, MasonryGrid } from '../../../components';
import { styles } from './styles';
import { MasonryGridItem } from '@/components/MasonryGrid';

export interface HomeProps {
    lojas: lojaImagem[];
}
const cardHeights = [120, 160, 220, 280, 320, 180];

const feedData: MasonryGridItem[] = Array.from({ length: 24 }).map((_, i) => ({
    id: String(i),
    image: `https://picsum.photos/id/${i + 10}/400/600`,
    label: `Item ${i + 1}`,
    height: cardHeights[Math.floor(Math.random() * cardHeights.length)],
}));

export default function Home({ lojas }: HomeProps) {
    const [search, setSearch] = useState('');

    // Filtro simples, pode ser melhorado conforme necessidade
    const lojasFiltradas = lojas.filter(loja =>
        loja.nomeFantasia.toLowerCase().includes(search.toLowerCase())
    );

    // Exemplo de dados para o carrossel retangular
    const produtosFake = [
        { id: '1', image: 'https://placehold.co/220x140', value: 'R$ 19,90' },
        { id: '2', image: 'https://placehold.co/220x140', value: 'R$ 29,90' },
        { id: '3', image: 'https://placehold.co/220x140', value: 'R$ 39,90' },
        { id: '4', image: 'https://placehold.co/220x140', value: 'R$ 49,90' },
    ];
    // Exemplo de dados para o MasonryGrid
    const [masonryData, setMasonryData] = useState(() => Array.from({ length: 12 }, (_, i) => ({
        id: String(i + 1),
        image: 'https://placehold.co/300x180',
        label: `Produto ${i + 1}`,
        height: 100 + Math.floor(Math.random() * 100),
    })));
    const [loadingMore, setLoadingMore] = useState(false);

    const handleLoadMore = () => {
        if (loadingMore) return;
        setLoadingMore(true);
        setTimeout(() => {
            setMasonryData(prev => [
                ...prev,
                ...Array.from({ length: 6 }, (_, i) => ({
                    id: String(prev.length + i + 1),
                    image: 'https://placehold.co/300x180',
                    label: `Produto ${prev.length + i + 1}`,
                    height: 100 + Math.floor(Math.random() * 100),
                }))
            ]);
            setLoadingMore(false);
        }, 1200);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={handleLoadMore}
        >
            <View style={styles.spacer24} />
            <View style={styles.locationStatusWrapper}>
                <LocationStatus />
            </View>
            <View style={styles.searchRow}>
                <View style={styles.searchBarContainer}>
                    <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar lojas..." />
                </View>
                <View style={styles.pointsCounter}>
                    <PointsCounter />
                </View>
            </View>
            <View style={styles.titleRow}>
                <Text style={styles.titleText}>
                    Produtos vistos em oferta
                </Text>
                <Text style={styles.seeMoreText}>Ver mais</Text>
            </View>
            <CarouselRectHorizontal data={produtosFake} size="small" />
            <CarouselCircularHorizontal lojas={lojasFiltradas} />
            <View style={styles.sectionTitleWrapper}>
                <Text style={styles.titleTextWithMargin}>
                    Destaque da semana
                </Text>
            </View>
            <CarouselRectHorizontal data={produtosFake} size="large" />
            <View style={styles.masonrySection}>
                <Text style={styles.titleTextWithMarginBottom}>
                    Talvez você nem precisasse
                </Text>
                <MasonryGrid
                    data={feedData}
                    numColumns={2}
                    gap={12}
                    style={styles.masonryGrid}
                />
                {loadingMore && (
                    <View style={styles.loadingMoreWrapper}>
                        <Text style={styles.loadingMoreText}>Carregando mais...</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
