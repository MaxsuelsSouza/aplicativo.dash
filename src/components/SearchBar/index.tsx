import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    points?: number;
    showPoints?: boolean | Animated.AnimatedAddition<number>;
    onFocus?: () => void;
    autoFocus?: boolean;
    inputRef?: React.RefObject<TextInput>;
    fullWidth?: boolean;
    onPress?: () => void;
    editable?: boolean;
    onSubmitEditing?: () => void;
    animationValue?: Animated.Value;
    onClearText?: () => void;
    showClearButton?: boolean;
}

export default function SearchBar({ value, onChangeText, placeholder, points = 0, showPoints = true, onFocus, autoFocus, inputRef, fullWidth, onPress, editable = true, onSubmitEditing, animationValue, onClearText, showClearButton = false }: SearchBarProps) {
    const Wrapper: React.ComponentType<any> = onPress ? TouchableOpacity : View;
    
    // Calcular largura máxima considerando margens menores para maior expansão
    const screenWidth = Dimensions.get('window').width;
    const maxWidth = screenWidth - 16; // Apenas 8px de margem de cada lado para maior largura
    
    const animatedWidth = animationValue ? animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [320, maxWidth],
    }) : undefined;
    
    return (
        <Wrapper onPress={onPress} activeOpacity={0.7} style={[styles.wrapper, fullWidth && styles.wrapperFull]}>
            <Animated.View style={[
                styles.container, 
                fullWidth && styles.containerFull,
                animatedWidth && { width: animatedWidth }
            ]}>
                <Icon name="magnify" size={22} color="#8B4513" style={styles.icon} />
                <TextInput
                    ref={inputRef}
                    style={[styles.input, showClearButton && value.length > 0 && { paddingRight: 40 }]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder || 'Pesquisar...'}
                    placeholderTextColor="#8B4513"
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="never"
                    onFocus={onFocus}
                    autoFocus={autoFocus}
                    editable={editable}
                    onSubmitEditing={onSubmitEditing}
                />
                {showClearButton && value.length > 0 && onClearText && (
                    <TouchableOpacity onPress={onClearText} style={styles.clearButton}>
                        <Icon name="close" size={18} color="#8B4513" />
                    </TouchableOpacity>
                )}
            </Animated.View>
            {typeof showPoints === 'boolean' ? (
                showPoints && (
                    <View style={styles.pointsContainer}>
                        <View style={styles.row}>
                            <Text style={styles.pointsIcon}>🎯</Text>
                            <Text style={styles.pointsIconLabel}>Pts</Text>
                        </View>
                        <Text style={styles.points}>{points}</Text>
                    </View>
                )
            ) : (
                <Animated.View style={[styles.pointsContainer, { opacity: showPoints }]}>
                    <View style={styles.row}>
                        <Text style={styles.pointsIcon}>🎯</Text>
                        <Text style={styles.pointsIconLabel}>Pts</Text>
                    </View>
                    <Text style={styles.points}>{points}</Text>
                </Animated.View>
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
    clearButton: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -12 }],
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(139, 69, 19, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
