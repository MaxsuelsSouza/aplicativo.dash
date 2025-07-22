import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Registro } from '@/app/registros';
import useUpdateRegistro from '@/hooks/useUpdateRegistro';
import useDeleteRegistro from '@/hooks/useDeleteRegistro';
import useNotesModal from '@/hooks/useNotesModal';
import { formatarBRLCompleto } from '@/utils/format';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useSimpleClickModal from '@/hooks/useSimpleClickModal';
import { styles } from './styles';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export interface MonthlyTableHandle {
  scrollToCurrentMonth: () => void;
  scrollToMonth: (monthIndex: number, animated?: boolean) => void;
}

interface MonthlyTableProps {
  registros: Registro[];
  onUpdated?: () => void;
}

const MonthlyTable = (
  { registros, onUpdated }: MonthlyTableProps,
  ref: React.Ref<MonthlyTableHandle>,
) => {
  const scrollRef = useRef<ScrollView>(null);
  const monthPositions = useRef<number[]>([]);
  const [snapOffsets, setSnapOffsets] = useState<number[]>([]);

  const currentMonthIndex = new Date().getMonth();
  const year = new Date().getFullYear();

  const deleteRegistro = useDeleteRegistro(onUpdated);
  const { openModal: openNotesModal, NotesModal } = useNotesModal();

  // Definir callback de update
  const handleUpdate = (item: Registro) => {
    openUpdateModal(item);
  };

  const { openModal, closeModal, SimpleClickModal, LongTextModal } = useSimpleClickModal({
    onUpdate: handleUpdate,
    onDelete: deleteRegistro,
    onShowNotes: openNotesModal,
  });

  const { openModal: openUpdateModal, UpdateModal } = useUpdateRegistro(onUpdated, closeModal);

  const registrosMap = React.useMemo(() => {
    const map = new Map<
      string,
      {
        entrada: number;
        saida: number;
        items: Registro[];
        recorrente: boolean;
      }
    >();
    registros.forEach(r => {
      const key = new Date(r.dia_atualizacao).toISOString().split('T')[0];
      const existing = map.get(key);
      if (existing) {
        existing.entrada += Number(r.entrada_total);
        existing.saida += Number(r.saida_total);
        existing.items.push(r);
        if (r.id_pai !== null) existing.recorrente = true;
      } else {
        map.set(key, {
          entrada: Number(r.entrada_total),
          saida: Number(r.saida_total),
          items: [r],
          recorrente: r.id_pai !== null,
        });
      }
    });
    return map;
  }, [registros]);

  function onMonthLayout(index: number, event: any) {
    const { y } = event.nativeEvent.layout;
    monthPositions.current[index] = y;
    setSnapOffsets(monthPositions.current.filter(v => v !== undefined));
    if (index === currentMonthIndex && scrollRef.current) {
      scrollRef.current.scrollTo({ y, animated: false });
    }
  }

  const scrollToMonth = (index: number, animated = true) => {
    const pos = monthPositions.current[index];
    if (scrollRef.current && pos !== undefined) {
      scrollRef.current.scrollTo({ y: pos, animated });
    }
  };

  const scrollToCurrentMonth = (animated = true) => {
    scrollToMonth(currentMonthIndex, animated);
  };

  useImperativeHandle(ref, () => ({
    scrollToCurrentMonth,
    scrollToMonth,
  }));

  function getSaldoColor(value: number) {
    if (value > 2000) {
      return '#6aa84f';
    }
    if (value >= 1000) {
      return '#b7e1cd';
    }
    if (value >= 0) {
      return '#fce8b2';
    }
    if (value <= -500) {
      return '#ff0000';
    }
    return '#f4cccc';
  }

  let saldo = 0;

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        snapToOffsets={snapOffsets}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        showsVerticalScrollIndicator={false}
      >
        {months.map((month, index) => {
          const days = daysInMonth(index + 1, year);
          // Não resetar o saldo aqui - ele deve ser acumulativo
          return (
            <View
              key={month}
              style={styles.containerMes}
              onLayout={event => onMonthLayout(index, event)}
            >
              <Text style={styles.tituloMes}>{month}</Text>
              <View>
                <View style={styles.cabecalhoLinha}>
                  <Text style={styles.celulaCabecalho}>Dia</Text>
                  <Text style={styles.celulaValorCabecalho}>Entrada</Text>
                  <Text style={styles.celulaValorCabecalho}>Saída</Text>
                  <Text style={styles.celulaValorCabecalho}>Saldo</Text>
                </View>
                {Array.from({ length: days }, (_, i) => {
                  const date = new Date(year, index, i + 1)
                    .toISOString()
                    .split('T')[0];
                  const r = registrosMap.get(date);
                  if (r) {
                    saldo += r.entrada - r.saida;
                  }
                  const saldoDoDia = saldo;
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.linha,
                        r && {
                          backgroundColor: 'rgba(106, 168, 79, 0.08)',
                          borderRadius: 4,
                          marginVertical: 1,
                        }
                      ]}
                      onPress={() => {
                        if (r) {
                          openModal(date, {
                            entrada: r.entrada,
                            saida: r.saida,
                            saldo: saldoDoDia,
                            items: r.items,
                          });
                        }
                      }}
                    >
                      <View style={styles.celulaDia}>
                        <Text style={styles.celula}>{i + 1}</Text>
                        {r?.recorrente && (
                          <Icon
                            name="repeat"
                            size={12}
                            color="#f0ad4e"
                            style={{ marginLeft: 2 }}
                          />
                        )}
                      </View>
                      <View style={styles.celulaValor}>
                        <Text style={styles.textoValor}>{formatarBRLCompleto(r ? r.entrada : 0)}</Text>
                      </View>
                      <View style={styles.celulaValor}>
                        <Text style={styles.textoValor}>{formatarBRLCompleto(r ? r.saida : 0)}</Text>
                      </View>
                      <Text
                        style={[
                          styles.celula,
                          styles.textoValor,
                          { color: getSaldoColor(saldoDoDia) },
                        ]}
                      >
                        {formatarBRLCompleto(saldoDoDia)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <SimpleClickModal />
      <LongTextModal />
      <NotesModal />
      <UpdateModal />
    </>
  );
};

export default forwardRef(MonthlyTable);


