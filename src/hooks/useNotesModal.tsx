import React, { useState } from 'react';
import { Modal, View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Nota } from '@/app/registros';
import { formatarBRLCompleto } from '@/utils/format';

export default function useNotesModal() {
  const [visible, setVisible] = useState(false);
  const [notes, setNotes] = useState<Nota[]>([]);

  const openModal = (ns: Nota[]) => {
    setNotes(ns);
    setVisible(true);
  };

  const closeModal = () => setVisible(false);

  const NotesModal = () => (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={closeModal}>
      <Pressable style={styles.overlay} onPress={closeModal}>
        <View style={styles.card}>
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={true}
            bounces={true}
            contentContainerStyle={styles.scrollContent}
          >
            {notes.map(n => (
              <Text key={n.id} style={styles.noteText}>
                {`${n.descricao_do_gasto} - ${formatarBRLCompleto(n.valor)}`}
              </Text>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );

  return { openModal, closeModal, NotesModal };
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    maxWidth: 380,
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#1f2937',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    maxHeight: 400,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    borderLeftWidth: 4,
    borderLeftColor: '#4524ff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  noteText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 28,
    paddingBottom: 10,
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
});
