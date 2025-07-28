import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { lojaImagem } from '@/interfaces/loja';
import { SearchBar, PointsCounter, LocationStatus, CarouselCircularHorizontal, CarouselRectHorizontal, MasonryGrid } from '../../../components';
import { styles } from './styles';
import { MasonryGridItem } from '@/components/MasonryGrid';
import { produtosFotoValor } from '@/app/registros';

export interface HomeProps {
    lojas: lojaImagem[];
}
const cardHeights = [120, 160, 220, 280, 320, 180];
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
    const [masonryData, setMasonryData] = useState<MasonryGridItem[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const produtos = await produtosFotoValor();
                const mapped = produtos.map((p) => ({
                    id: p.id,
                    image: p.imagem,
                    label: `R$ ${p.preco}`,
                    height: cardHeights[Math.floor(Math.random() * cardHeights.length)],
                }));
                setMasonryData(mapped);
            } catch (err) {
                console.error('Erro ao carregar produtos', err);
            }
        })();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
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
                    data={masonryData}
                    numColumns={2}
                    gap={12}
                    style={styles.masonryGrid}
                />
            </View>
        </ScrollView>
    );
}
