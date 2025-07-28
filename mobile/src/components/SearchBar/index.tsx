import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <Icon name="magnify" size={22} color="#8B4513" style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder || 'Pesquisar...'}
                placeholderTextColor="#8B4513"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 1,
        borderColor: '#DDD8C0',
        marginBottom: 12,
        width: 310, // Defina a largura desejada aqui
        alignSelf: 'flex-start', // Centraliza horizontalmente (opcional)
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#8B4513',
        fontWeight: '500',
    },
});
