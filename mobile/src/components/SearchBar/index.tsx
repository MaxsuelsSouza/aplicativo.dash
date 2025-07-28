import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    points?: number;
}

export default function SearchBar({ value, onChangeText, placeholder, points = 0 }: SearchBarProps) {
    return (
        <View style={styles.wrapper}>
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
            <View style={styles.pointsContainer}>
                <View style={styles.row}>
                    <Text style={styles.pointsIcon}>🎯</Text>
                    <Text style={styles.pointsIconLabel}>Pts</Text>
                </View>
                <Text style={styles.points}>{points}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
        justifyContent: 'space-between',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 1,
        borderColor: '#DDD8C0',
        width: 310,
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
    pointsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 38,
        height: 40,
        backgroundColor: 'transparent',
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 0,
        borderColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    pointsIcon: {
        marginRight: 4,
    },
    pointsIconLabel: {
        color: '#8B4513',
        fontSize: 12,
        fontWeight: '500',
    },
    points: {
        color: '#8B4513',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
    },
});
