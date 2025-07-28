import React, { useEffect, useRef } from 'react';
import { Modal, Animated, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import SearchBar from '../SearchBar';

interface SearchModalProps {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onRequestClose: () => void;
}

export default function SearchModal({ visible, value, onChangeText, onRequestClose }: SearchModalProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: false }).start();
    } else {
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }
  }, [visible, anim]);

  const containerHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 280],
  });

  const cardOpacity = anim;

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.container, { height: containerHeight }]}>
        <SearchBar
          value={value}
          onChangeText={onChangeText}
          placeholder="Tem no Dash..."
          showPoints={false}
          autoFocus
        />
        <Animated.View style={[styles.card, { opacity: cardOpacity }]}>
          {/* Conteúdo do modal pode ser inserido aqui */}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    overflow: 'hidden',
    borderRadius: 12,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFAF0',
    elevation: 4,
  },
});
