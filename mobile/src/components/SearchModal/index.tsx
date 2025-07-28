import React, { useEffect, useRef } from 'react';
import { Modal, Animated, StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import SearchBar from '../SearchBar';

interface SearchModalProps {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onRequestClose: () => void;
}

export default function SearchModal({ visible, value, onChangeText, onRequestClose }: SearchModalProps) {
  const searchAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const { height } = Dimensions.get('window');

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(searchAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(cardAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      searchAnim.setValue(0);
      cardAnim.setValue(0);
    }
  }, [visible, searchAnim, cardAnim]);

  const translateY = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height / 2 - 80],
  });

  const cardSlide = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.searchWrapper, { transform: [{ translateY }] }]}>
        <SearchBar value={value} onChangeText={onChangeText} placeholder="Tem no Dash..." showPoints={false} autoFocus />
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardAnim,
            transform: [{ translateY: Animated.add(translateY, cardSlide) }],
          },
        ]}
      >
        {/* Conteúdo do modal pode ser inserido aqui */}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  searchWrapper: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
  },
  card: {
    position: 'absolute',
    top: 40 + 56,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFAF0',
    elevation: 4,
  },
});
