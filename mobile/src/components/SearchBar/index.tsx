import React, { useCallback, useRef, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Animated,
    Pressable,
    Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    points?: number;
}

export default function SearchBar({ value, onChangeText, placeholder, points = 0 }: SearchBarProps) {
    const [expanded, setExpanded] = useState(false);
    const [editable, setEditable] = useState(false);
    const heightAnim = useRef(new Animated.Value(48)).current;
    const modalAnim = useRef(new Animated.Value(0)).current;
    const inputRef = useRef<TextInput>(null);

    const open = useCallback(() => {
        setExpanded(true);
        Animated.timing(heightAnim, {
            toValue: 180,
            duration: 250,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(modalAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: false,
            }).start();
        });
    }, [heightAnim, modalAnim]);

    const close = useCallback(() => {
        Keyboard.dismiss();
        setEditable(false);
        Animated.timing(modalAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(heightAnim, {
                toValue: 48,
                duration: 200,
                useNativeDriver: false,
            }).start(() => setExpanded(false));
        });
    }, [heightAnim, modalAnim]);

    const handlePressBar = () => {
        if (!expanded) {
            open();
        } else if (!editable) {
            setEditable(true);
            inputRef.current?.focus();
        }
    };

    return (
        <View style={styles.wrapper}>
            <Pressable onPress={handlePressBar} style={{ flex: 1 }}>
                <Animated.View style={[styles.container, { height: heightAnim }]}>
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
                        editable={editable}
                        onPressIn={() => {
                            if (expanded && !editable) {
                                setEditable(true);
                                inputRef.current?.focus();
                            }
                        }}
                    />
                </Animated.View>
            </Pressable>
            {!expanded && (
                <View style={styles.pointsContainer}>
                    <View style={styles.row}>
                        <Text style={styles.pointsIcon}>🎯</Text>
                        <Text style={styles.pointsIconLabel}>Pts</Text>
                    </View>
                    <Text style={styles.points}>{points}</Text>
                </View>
            )}
            {expanded && (
                <Animated.View
                    style={[
                        styles.modalCard,
                        {
                            opacity: modalAnim,
                            transform: [
                                {
                                    scale: modalAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.8, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.modalText}>Digite para pesquisar</Text>
                    <Pressable onPress={close} style={styles.closeButton}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </Pressable>
                </Animated.View>
            )}
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
    modalCard: {
        backgroundColor: '#FFFAF0',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#DDD8C0',
    },
    modalText: {
        color: '#8B4513',
        fontSize: 16,
        marginBottom: 12,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    closeText: {
        color: '#8B4513',
        fontSize: 14,
    },
});
