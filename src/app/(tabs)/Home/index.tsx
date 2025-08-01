import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl, Animated, TextInput, TouchableWithoutFeedback, Keyboard, ListRenderItem } from 'react-native';
import { useRouter } from 'expo-router';
import { lojaImagem } from '@/interfaces/loja';
import { SearchBar, LocationStatus, CarouselCircularHorizontal, CarouselRectHorizontal, MasonryGrid, InfiniteScrollLoading } from '../../../components';
import { styles } from './styles';
import { MasonryGridItem } from '@/components/MasonryGrid';
import { produtosFotoValor } from '@/app/registros';
import { inscreverExibicaoCabecalhoHome } from '@/utils/homeHeaderEvents';

export interface HomeProps {
    lojas: lojaImagem[];
}
const cardHeights = [120, 160, 220, 280, 320, 180];
export default function Home({ lojas }: HomeProps) {
    const [search, setSearch] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const searchAnimation = useRef(new Animated.Value(0)).current;
    const searchInputRef = useRef<TextInput>(null);
    
    const openSearch = () => {
        setSearchVisible(true);
        Animated.timing(searchAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        
        // Foca o input após a animação iniciar
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 100);
    };
    
    const closeSearch = () => {
        // Fechar o teclado antes da animação
        Keyboard.dismiss();
        
        // Limpar o texto quando fechar
        setSearch('');
        
        Animated.timing(searchAnimation, {
            toValue: 0,
            duration: 250, // Duração um pouco maior para a animação de fechamento
            useNativeDriver: false,
        }).start(() => {
            setSearchVisible(false);
        });
    };
    
    const clearSearch = () => {
        setSearch('');
    };
    
    const router = useRouter();
    const handleSearchSubmit = () => {
        closeSearch();
        router.push({ pathname: '/Pesquisa', params: { q: search } });
    };

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
    const scrollRef = useRef<FlatList>(null);

    // Estrutura de dados para o FlatList
    interface HomeSection {
        id: string;
        type: 'spacer' | 'location' | 'search' | 'carousel-rect' | 'carousel-circular' | 'masonry';
        data?: any;
        title?: string;
        size?: 'small' | 'large';
    }

    const homeSections: HomeSection[] = [
        { id: 'spacer-top', type: 'spacer' },
        { id: 'location', type: 'location' },
        { id: 'search', type: 'search' },
        { id: 'carousel-1', type: 'carousel-rect', data: produtosFake, title: 'Produtos vistos em oferta', size: 'small' },
        { id: 'carousel-circular', type: 'carousel-circular', data: lojasFiltradas, title: 'Lojas perto de você' },
        { id: 'carousel-2', type: 'carousel-rect', data: produtosFake, title: 'Destaque da semana', size: 'large' },
        { id: 'masonry', type: 'masonry', data: masonryData },
    ];

    const renderSection: ListRenderItem<HomeSection> = ({ item }) => {
        switch (item.type) {
            case 'spacer':
                return <View style={styles.spacer24} />;
            
            case 'location':
                return (
                    <View style={styles.locationStatusWrapper}>
                        <LocationStatus />
                    </View>
                );
            
            case 'search':
                return (
                    <View style={styles.searchRow}>
                        <View style={[
                            styles.searchBarContainer,
                            searchVisible && { alignItems: 'center' }
                        ]}>
                            <SearchBar
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Tem no Dash..."
                                points={35}
                                onPress={openSearch}
                                editable={searchVisible}
                                showPoints={searchAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0],
                                })}
                                animationValue={searchAnimation}
                                inputRef={searchInputRef}
                                autoFocus={searchVisible}
                                onSubmitEditing={handleSearchSubmit}
                                onClearText={clearSearch}
                                showClearButton={searchVisible}
                            />
                        </View>
                    </View>
                );
            
            case 'carousel-rect':
                return (
                    <CarouselRectHorizontal 
                        data={item.data} 
                        size={item.size} 
                        title={item.title}
                    />
                );
            
            case 'carousel-circular':
                return (
                    <CarouselCircularHorizontal 
                        lojas={item.data} 
                        title={item.title}
                    />
                );
            
            case 'masonry':
                return (
                    <View style={styles.masonrySection}>
                        <MasonryGrid
                            data={item.data}
                            numColumns={2}
                            gap={12}
                            style={styles.masonryGrid}
                            title="Talvez você nem precisasse"
                        />
                        {loadingMore && (
                            <InfiniteScrollLoading />
                        )}
                    </View>
                );
            
            default:
                return null;
        }
    };

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
        scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
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
        <FlatList
            ref={scrollRef}
            data={homeSections}
            renderItem={renderSection}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refreshHome} tintColor="#8B4513" />
            }
        />
        {searchVisible && (
            <>
                <TouchableWithoutFeedback onPress={closeSearch}>
                    <View style={styles.searchBackdrop} />
                </TouchableWithoutFeedback>
                <Animated.View style={[
                    styles.searchOverlay,
                    {
                        opacity: searchAnimation,
                        transform: [{
                            scaleY: searchAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                            })
                        }, {
                            translateY: searchAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0], // Mantém na mesma posição vertical
                            })
                        }]
                    }
                ]}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <Animated.View style={[
                            styles.searchContent,
                            {
                                transform: [{
                                    scaleX: searchAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.8, 1], // Cresce horizontalmente
                                    })
                                }]
                            }
                        ]}>
                            {/* Conteúdo da busca expandido */}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </>
        )}
        </>
    );
}
