import React, { useState } from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Registro } from '@/app/registros';
import { formatarBRLCompleto } from '@/utils/format';
import useLongTextModal from './useLongTextModal';

interface DayInfo {
  date: string;
  entrada: number;
  saida: number;
  saldo: number;
  items: Registro[];
  weekday: string;
  day: number;
}

interface UseSimpleClickModalOptions {
  onUpdate?: (item: Registro) => void;
  onDelete?: (item: Registro) => Promise<boolean> | void;
  onShowNotes?: (notas: Registro['notas']) => void;
  onModalClose?: () => void;
}

export default function useSimpleClickModal(options?: UseSimpleClickModalOptions) {
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<'summary' | 'actions'>('summary');
  const [filterType, setFilterType] = useState<'entrada' | 'saida' | null>(null);
  const [info, setInfo] = useState<DayInfo | null>(null);
  const { openModal: openLongTextModal, LongTextModal } = useLongTextModal();

  const openModal = (date: string, data: { entrada: number; saida: number; saldo: number; items: Registro[] }) => {
    // Criar a data diretamente a partir da string YYYY-MM-DD para evitar problemas de timezone
    const [year, month, day] = date.split('-').map(Number);
    const d = new Date(year, month - 1, day); // month - 1 porque Date usa índice baseado em 0

    setInfo({
      date,
      entrada: data.entrada,
      saida: data.saida,
      saldo: data.saldo,
      items: data.items,
      weekday: d.toLocaleDateString('pt-BR', { weekday: 'long' }),
      day: d.getDate(),
    });
    setView('summary');
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setView('summary');
    setFilterType(null);
  };

  const showActions = (type: 'entrada' | 'saida') => {
    setFilterType(type);
    setView('actions');
  };
  const showSummary = () => {
    setView('summary');
    setFilterType(null);
  };

  const handleUpdate = (item: Registro) => {
    options?.onUpdate?.(item);
    closeModal();
    options?.onModalClose?.();
  };
  const handleDelete = async (item: Registro) => {
    const deleted = await options?.onDelete?.(item);
    if (deleted && info) {
      const newItems = info.items.filter(i => i.id !== item.id);
      if (newItems.length === 0) {
        closeModal();
        setInfo(null);
        return;
      }
      const newEntrada = info.entrada - Number(item.entrada_total);
      const newSaida = info.saida - Number(item.saida_total);
      const diff = Number(item.entrada_total) - Number(item.saida_total);
      setInfo({
        ...info,
        items: newItems,
        entrada: newEntrada,
        saida: newSaida,
        saldo: info.saldo - diff,
      });
    }
  };
  const handleShowNotes = (notas: Registro['notas']) => options?.onShowNotes?.(notas);

  const SimpleClickModal = () => (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={closeModal}>
      <Pressable style={styles.overlay} onPress={closeModal}>
        <Pressable style={styles.card} onPress={e => e.stopPropagation()}>
          {info && view === 'summary' && (
            <>
              <View style={styles.headerTop}>
                <Text style={styles.dayNumber}>{info.day}</Text>
                <Text style={styles.weekDay}>{info.weekday}</Text>
                <TouchableOpacity onPress={closeModal} style={styles.closeIconTop}>
                  <Icon name="x" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.labelsRow}>
                <Text style={styles.labelText}>Entrada</Text>
                <Text style={styles.labelText}>Saída</Text>
                <Text style={styles.labelText}>Saldo</Text>
              </View>
              <View style={styles.valuesRow}>
                <TouchableOpacity style={styles.valueContainer} onPress={() => showActions('entrada')}>
                  <Text style={styles.valueText}>{formatarBRLCompleto(info.entrada)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.valueContainer} onPress={() => showActions('saida')}>
                  <Text style={styles.valueText}>{formatarBRLCompleto(info.saida)}</Text>
                </TouchableOpacity>
                <View style={styles.valueContainer}>
                  <Text style={[styles.valueText, { color: getSaldoColor(info.saldo) }]}>
                    {formatarBRLCompleto(info.saldo)}
                  </Text>
                </View>
              </View>
            </>
          )}
          {info && view === 'actions' && (
            <>
              <View style={styles.headerActions}>
                <View style={styles.backSection}>
                  <TouchableOpacity onPress={showSummary}>
                    <Icon name="chevron-left" size={20} color="#fff" />
                  </TouchableOpacity>
                  <Text style={styles.actionTitle}>
                    {filterType === 'entrada' ? 'Entradas' : 'Saídas'}
                  </Text>
                </View>
                <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                  <Icon name="x" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              {(() => {
                const filteredItems = info.items.filter(item =>
                  filterType === 'entrada'
                    ? Number(item.entrada_total) > 0
                    : Number(item.saida_total) > 0
                );

                if (filteredItems.length === 1) {
                  const item = filteredItems[0];
                  return (
                    <>
                      <TouchableOpacity style={styles.actionButton} onPress={() => handleUpdate(item)}>
                        <Text style={styles.actionButtonText}>Atualizar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item)}>
                        <Text style={styles.actionButtonText}>Excluir</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleShowNotes(item.notas)}
                      >
                        <Text style={styles.actionButtonText}>Exibir Nota</Text>
                      </TouchableOpacity>
                    </>
                  );
                } else if (filteredItems.length > 1) {
                  return (
                    <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                      {filteredItems.map(item => {
                        const val = filterType === 'entrada' ? Number(item.entrada_total) : Number(item.saida_total);
                        const desc = item.notas[0]?.descricao_do_gasto || '';
                        return (
                          <View key={item.id} style={styles.listItem}>
                            {desc.length >= 24 ? (
                              <TouchableOpacity
                                onPress={() => openLongTextModal(desc)}
                                style={{ flex: 1 }}
                              >
                                <Text style={styles.itemText} numberOfLines={1}>
                                  {`${formatarBRLCompleto(val)} - ${desc}`}
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <Text style={styles.itemText} numberOfLines={1}>
                                {`${formatarBRLCompleto(val)} - ${desc}`}
                              </Text>
                            )}
                            <View style={styles.itemActions}>
                              <TouchableOpacity onPress={() => handleUpdate(item)}>
                                <Icon name="edit-2" size={16} color="#fff" />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleDelete(item)} style={{ marginLeft: 12 }}>
                                <Icon name="trash" size={16} color="#e74c3c" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>
                  );
                } else {
                  return (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>
                        Nenhum registro de {filterType} encontrado
                      </Text>
                    </View>
                  );
                }
              })()}
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );

  return { openModal, closeModal, SimpleClickModal, LongTextModal };
}

function getSaldoColor(value: number) {
  if (value > 2000) return '#6aa84f';
  if (value >= 1000) return '#b7e1cd';
  if (value >= 0) return '#fce8b2';
  if (value <= -500) return '#ff0000';
  return '#f4cccc';
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
    padding: 16,
    paddingVertical: 16,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    minHeight: 180,
    maxHeight: '80%',
  },
  headerSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  closeIconTop: {
    padding: 4,
  },
  dayNumberContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  dayNumber: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    flex: 0,
  },
  weekDayContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  weekDay: {
    color: '#ffffff88',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
  },
  closeIcon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  labelText: {
    color: '#ffffff88',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
  },
  valueText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  actionButton: {
    backgroundColor: '#444',
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  listContainer: {},
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingVertical: 4,
    minHeight: 36,
  },
  itemText: {
    color: '#fff',
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#ffffff88',
    fontSize: 16,
    textAlign: 'center',
  },
});

