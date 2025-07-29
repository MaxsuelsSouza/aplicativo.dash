import React, { useEffect, useRef, useState } from 'react';
import { Modal, Animated, StyleSheet, View, TouchableWithoutFeedback, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import SearchBar from '../SearchBar';
import { fetchAutocomplete, sendFeedback, Suggestion } from '@/utils/search';

interface SearchModalProps {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onRequestClose: () => void;
  userId?: string;
}

export default function SearchModal({ visible, value, onChangeText, onRequestClose, userId }: SearchModalProps) {
  const anim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Debounce search requests
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (visible && value.trim()) {
        const list = await fetchAutocomplete(value.trim());
        setSuggestions(list);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [value, visible]);

  const selectSuggestion = async (s: Suggestion) => {
    onChangeText(s.text);
    setSuggestions([]);
    await sendFeedback({
      term: value,
      suggestion: s.text,
      timestamp: new Date().toISOString(),
      userId,
    });
    onRequestClose();
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    const t = setTimeout(() => {
      if (visible) {
        inputRef.current?.focus();
      }
    }, 100);
    return () => clearTimeout(t);
  }, [visible, anim]);

  const containerHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 280],
  });

  const cardOpacity = anim;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onShow={() => inputRef.current?.focus()}
      onRequestClose={onRequestClose}
    >
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
          inputRef={inputRef}
          fullWidth
        />
        <Animated.View style={[styles.card, { opacity: cardOpacity }]}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => `${index}-${item.text}`}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectSuggestion(item)} style={styles.suggestionItem}>
                <Text style={styles.suggestionText}>{item.text}</Text>
                {item.source === 'banco tradicional' && (
                  <Text style={styles.suggestionSource}>Banco tradicional</Text>
                )}
              </TouchableOpacity>
            )}
          />
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
  suggestionItem: {
    paddingVertical: 8,
  },
  suggestionText: {
    color: '#8B4513',
    fontSize: 16,
  },
  suggestionSource: {
    fontSize: 12,
    color: '#666',
  },
});
