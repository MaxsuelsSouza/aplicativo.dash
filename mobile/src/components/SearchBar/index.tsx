import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    points?: number;
    showPoints?: boolean;
    onFocus?: () => void;
    autoFocus?: boolean;
    inputRef?: React.RefObject<TextInput>;
    fullWidth?: boolean;
    onPress?: () => void;
    editable?: boolean;
}

export default function SearchBar({ value, onChangeText, placeholder, points = 0, showPoints = true, onFocus, autoFocus, inputRef, fullWidth, onPress, editable = true }: SearchBarProps) {
    const Wrapper: React.ComponentType<any> = onPress ? TouchableOpacity : View;
    return (
        <Wrapper onPress={onPress} activeOpacity={0.7} style={[styles.wrapper, fullWidth && styles.wrapperFull]}>
            <View style={[styles.container, fullWidth && styles.containerFull]}>
                <Icon name="magnify" size={22} color="#8B4513" style={styles.icon} />
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder || 'Pesquisar...'}
                    placeholderTextColor="#8B4513"
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    onFocus={onFocus}
                    autoFocus={autoFocus}
                    editable={editable}
                />
            </View>
            {showPoints && (
                <View style={styles.pointsContainer}>
                    <View style={styles.row}>
                        <Text style={styles.pointsIcon}>🎯</Text>
                        <Text style={styles.pointsIconLabel}>Pts</Text>
                    </View>
                    <Text style={styles.points}>{points}</Text>
                </View>
            )}
        </Wrapper>
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
    wrapperFull: {
        marginBottom: 0,
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
    containerFull: {
        width: '100%',
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
