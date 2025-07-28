import React, { useEffect, useRef, useCallback } from 'react';
import { Text, View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native';
import { lojaImagem } from '@/interfaces/loja';
import { SearchBar, LocationStatus, CarouselCircularHorizontal, CarouselRectHorizontal, MasonryGrid, InfiniteScrollLoading } from '../../../components';
import useSearchModal from '@/hooks/useSearchModal';
import { styles } from './styles';
import { MasonryGridItem } from '@/components/MasonryGrid';
import { produtosFotoValor } from '@/app/registros';
import { inscreverExibicaoCabecalhoHome } from '@/utils/homeHeaderEvents';

export interface HomeProps {
    lojas: lojaImagem[];
}
const cardHeights = [120, 160, 220, 280, 320, 180];
export default function Home({ lojas }: HomeProps) {
    const { search, setSearch, visible: searchVisible, openSearch, closeSearch, SearchModal } = useSearchModal();

    // Filtro simples, pode ser melhorado conforme necessidade
    const lojasFiltradas = lojas.filter(loja =>
        loja.nomeFantasia.toLowerCase()
    );

    // Exemplo de dados para o carrossel retangular
    const produtosFake = [
        { id: '1', image: 'https://placehold.co/220x140', value: 'R$ 19,90' },
        { id: '2', image: 'https://placehold.co/220x140', value: 'R$ 29,90' },
        { id: '3', image: 'https://placehold.co/220x140', value: 'R$ 39,90' },
        { id: '4', image: 'https://placehold.co/220x140', value: 'R$ 49,90' },
    ];
    const [masonryData, setMasonryData] = useState<MasonryGridItem[]>([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const scrollRef = useRef<ScrollView>(null);

    const loadPage = useCallback(async (pageNumber: number) => {
        try {
            setLoadingMore(true);
            const produtos = await produtosFotoValor(pageNumber);
            const mapped = produtos.map((p) => ({
                id: `${pageNumber}-${p.id}`,
                image: p.imagem,
                label: `R$ ${p.preco}`,
                height: cardHeights[Math.floor(Math.random() * cardHeights.length)],
            }));
            setMasonryData(prev => pageNumber === 1 ? mapped : [...prev, ...mapped]);
            setPage(pageNumber);
        } catch (err) {
            console.error('Erro ao carregar produtos', err);
        } finally {
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        loadPage(1);
    }, [loadPage]);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
        const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);
        if (distanceFromBottom < 50 && !loadingMore) {
            loadPage(page + 1);
        }
    };

    const refreshHome = useCallback(async () => {
        setRefreshing(true);
        setMasonryData([]);
        await loadPage(1);
        setRefreshing(false);
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [loadPage]);

    useEffect(() => {
        const unsubscribe = inscreverExibicaoCabecalhoHome(refreshHome);
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [refreshHome]);

    return (
        <>
        <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refreshHome} tintColor="#8B4513" />
            }
        >
            <View style={styles.spacer24} />
            <View style={styles.locationStatusWrapper}>
                <LocationStatus />
            </View>
            <View style={styles.searchRow}>
                <View style={styles.searchBarContainer}>
                    {!searchVisible && (
                        <SearchBar
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Tem no Dash..."
                            points={35}
                            onFocus={openSearch}
                        />
                    )}
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
                    data={masonryData}
                    numColumns={2}
                    gap={12}
                    style={styles.masonryGrid}
                />
                {loadingMore && (
                    <InfiniteScrollLoading />
                )}
            </View>
        </ScrollView>
        <SearchModal />
        </>
    );
}
