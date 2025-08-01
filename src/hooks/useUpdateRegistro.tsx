import React, { useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import { Registro, updateRegistro, deleteRegistro, deleteRecorrente } from '@/app/registros';
import CurrencyInput from '@/components/CurrencyInput';

export default function useUpdateRegistro(onUpdated?: () => void, onModalsClosed?: () => void) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);
  const registroRef = useRef<Registro | null>(null);

  const openModal = (registro: Registro) => {
    registroRef.current = registro;
    const atual = Number(registro.entrada_total) > 0
      ? Number(registro.entrada_total)
      : Number(registro.saida_total);
    setValue(atual); // Não multiplicar por 100 aqui
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const confirm = async () => {
    if (!registroRef.current) return;

    try {
      // Se o valor for zero, excluir o registro
      if (value === 0) {
        Alert.alert(
          'Excluir',
          'Valor zero detectado. Deseja excluir este lançamento?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Excluir',
              onPress: async () => {
                try {
                  if (registroRef.current!.id_pai !== null) {
                    await deleteRecorrente(registroRef.current!.id);
                  } else {
                    await deleteRegistro(registroRef.current!.id);
                  }
                  onUpdated?.();
                  onModalsClosed?.(); // Fechar todos os modais
                  setVisible(false);
                } catch (error) {
                  console.error('Erro ao excluir registro:', error);
                }
              },
            },
          ]
        );
        return; // Não fecha o modal aqui, deixa o Alert gerenciar
      }

      // Caso contrário, atualizar normalmente
      await updateRegistro(
        registroRef.current.id,
        value,
        Number(registroRef.current.entrada_total) > 0,
      );
      onUpdated?.();
      onModalsClosed?.(); // Fechar todos os modais
    } finally {
      setVisible(false);
    }
  };

  const UpdateModal = () => (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={closeModal}>
      <Pressable style={styles.overlay} onPress={closeModal}>
        <Pressable style={styles.card} onPress={e => e.stopPropagation()}>
          <CurrencyInput value={value} onChangeValue={setValue} style={styles.input} />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal} style={styles.button}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirm} style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return { openModal, UpdateModal };
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#23242a',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
  },
  input: {
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: '#444',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

