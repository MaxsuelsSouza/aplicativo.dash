import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

export interface InfiniteScrollLoadingProps {
    text?: string;
    color?: string;
    size?: 'small' | 'large';
}

export default function InfiniteScrollLoading({
    text = 'Carregando mais...',
    color = '#8B4513',
    size = 'small',
}: InfiniteScrollLoadingProps) {
    return (
        <View style={{ alignItems: 'center', padding: 16, flexDirection: 'row', justifyContent: 'center' }}>
            <ActivityIndicator color={color} size={size} style={{ marginRight: 10 }} />
            <Text style={{ color, fontSize: 15 }}>{text}</Text>
        </View>
    );
}
