import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LocationStatus() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [location, setLocation] = useState<string | null>(null);

    useEffect(() => {
        // Simulação de busca de localização
        setTimeout(() => {
            // Troque para 'error' para simular erro
            setStatus('error');
            setLocation(null);
            // Para simular sucesso:
            // setStatus('success');
            // setLocation('Recife, PE');
        }, 1500);
    }, []);

    return (
        <View style={styles.container}>
            <Icon name="map-marker" size={22} color="#8B4513" style={styles.icon} />
            {status === 'loading' && (
                <>
                    <Text style={styles.text}>Obtendo localização...</Text>
                    <ActivityIndicator size="small" color="#8B4513" style={{ marginLeft: 8 }} />
                </>
            )}
            {status === 'error' && (
                <Text style={[styles.text, { color: '#c00' }]}>Localização não encontrada</Text>
            )}
            {status === 'success' && location && (
                <Text style={styles.text}>{location}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        height: 50,
        borderWidth: 0,
        backgroundColor: 'transparent',
        marginBottom: 0,
        alignSelf: 'center',
    },
    icon: {
        marginRight: 8,
    },
    text: {
        color: '#8B4513',
        fontSize: 15,
        fontWeight: '500',
    },
});
