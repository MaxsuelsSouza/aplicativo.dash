import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Registro } from '@/app/registros';
import useSimpleClickModal from '@/hooks/useSimpleClickModal';
import useUpdateRegistro from '@/hooks/useUpdateRegistro';
import useDeleteRegistro from '@/hooks/useDeleteRegistro';
import useNotesModal from '@/hooks/useNotesModal';
import { inscreverExibicaoCabecalhoHome } from '@/utils/homeHeaderEvents';
import { formatarBRL } from '@/utils/format';

import { styles } from './styles';
const mesesDoAno = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function obterDiasDoMes(mes: number, ano: number) {
  return new Date(ano, mes, 0).getDate();
}

interface PropriedadesDoCalendarioGrade {
  registros: Registro[];
}

export default function CalendarioGrade({ registros }: PropriedadesDoCalendarioGrade) {
  const anoAtual = new Date().getFullYear();
  const mesAtual = new Date().getMonth();
  const referenciaDoScroll = useRef<ScrollView>(null);
  const [posicoesMeses, setPosicoesMeses] = useState<number[]>(new Array(12).fill(0));

  const excluirRegistro = useDeleteRegistro();
  const { openModal: abrirModalDeNotas, NotesModal: ModalDeNotas } = useNotesModal();

  // Definir callback de update
  const handleUpdate = (item: Registro) => {
    abrirModalDeAtualizacao(item);
  };

  const { openModal: abrirModal, closeModal: fecharModal, SimpleClickModal: ModalDeCliqueSimpless, LongTextModal: ModalDeTextoLongo } = useSimpleClickModal({
    onUpdate: handleUpdate,
    onDelete: excluirRegistro,
    onShowNotes: abrirModalDeNotas,
  });

  const { openModal: abrirModalDeAtualizacao, UpdateModal: ModalDeAtualizacao } = useUpdateRegistro(undefined, fecharModal);

  const rolarParaMesAtual = useCallback(() => {
    if (referenciaDoScroll.current && posicoesMeses[mesAtual] > 0) {
      referenciaDoScroll.current.scrollTo({
        y: posicoesMeses[mesAtual],
        animated: true
      });
    }
  }, [mesAtual, posicoesMeses]);

  const aoDefinirPosicaoDoMes = useCallback((indice: number, y: number) => {
    setPosicoesMeses(anterior => {
      const nova = [...anterior];
      nova[indice] = y;
      return nova;
    });
  }, []);

  useEffect(() => {
    // Scroll para o mês atual quando o componente montar
    const temporizador = setTimeout(() => {
      rolarParaMesAtual();
    }, 100);

    // Inscreve no evento de home header
    const cancelarInscricao = inscreverExibicaoCabecalhoHome(rolarParaMesAtual);

    return () => {
      clearTimeout(temporizador);
      cancelarInscricao();
    };
  }, [rolarParaMesAtual]);

  const mapaDeRegistros = React.useMemo(() => {
    const mapa = new Map<
      string,
      {
        entrada: number;
        saida: number;
        items: Registro[];
      }
    >();
    registros.forEach(registro => {
      const chave = new Date(registro.dia_atualizacao).toISOString().split('T')[0];
      const existente = mapa.get(chave);
      if (existente) {
        existente.entrada += Number(registro.entrada_total);
        existente.saida += Number(registro.saida_total);
        existente.items.push(registro);
      } else {
        mapa.set(chave, {
          entrada: Number(registro.entrada_total),
          saida: Number(registro.saida_total),
          items: [registro],
        });
      }
    });
    return mapa;
  }, [registros]);

  const primeiroDiaDaSemana = (indiceMes: number) => new Date(anoAtual, indiceMes, 1).getDay();

  // Calcular saldo acumulativo para todo o ano
  const saldosPorData = React.useMemo(() => {
    const saldos = new Map<string, number>();
    let saldoAcumulado = 0;

    // Percorrer todos os dias do ano em ordem cronológica
    for (let mes = 0; mes < 12; mes++) {
      const diasDoMes = obterDiasDoMes(mes + 1, anoAtual);
      for (let dia = 1; dia <= diasDoMes; dia++) {
        const stringData = `${anoAtual}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const registrosDoDia = mapaDeRegistros.get(stringData);

        if (registrosDoDia) {
          saldoAcumulado += registrosDoDia.entrada - registrosDoDia.saida;
        }

        saldos.set(stringData, saldoAcumulado);
      }
    }

    return saldos;
  }, [mapaDeRegistros, anoAtual]);

  const renderizarMes = (indiceMes: number) => {
    const diasDoMes = obterDiasDoMes(indiceMes + 1, anoAtual);
    const primeiroDia = primeiroDiaDaSemana(indiceMes);
    const semanas: (number | null)[][] = [];
    let diaAtual = 1;
    while (diaAtual <= diasDoMes) {
      const semana: (number | null)[] = new Array(7).fill(null);
      for (let i = semanas.length === 0 ? primeiroDia : 0; i < 7 && diaAtual <= diasDoMes; i++) {
        semana[i] = diaAtual;
        diaAtual++;
      }
      semanas.push(semana);
    }
    return (
      <View
        key={indiceMes}
        style={styles.containerMes}
        onLayout={(evento) => {
          aoDefinirPosicaoDoMes(indiceMes, evento.nativeEvent.layout.y);
        }}
      >
        <Text style={styles.tituloMes}>{mesesDoAno[indiceMes]}</Text>
        <View style={styles.cabecalhoSemana}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((dia, indice) => (
            <Text key={dia} style={[
              styles.diaSemana,
              (indice === 0 || indice === 6) && styles.diaSemanaFds
            ]}>{dia}</Text>
          ))}
        </View>
        <View>
          {semanas.map((semana, indiceSemana) => (
            <View key={indiceSemana} style={styles.linhaSemana}>
              {semana.map((dia, indiceDia) => {
                if (!dia) return <View key={indiceDia} style={styles.celulaDia} />;
                const stringData = `${anoAtual}-${String(indiceMes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                const registrosDoDia = mapaDeRegistros.get(stringData);
                const saldoDoDia = saldosPorData.get(stringData) || 0;
                const diaDaSemana = new Date(anoAtual, indiceMes, dia).getDay();
                const ehFimDeSemana = diaDaSemana === 0 || diaDaSemana === 6;

                // Verifica se há valores de entrada ou saída para mostrar o card
                const temValores = registrosDoDia && (registrosDoDia.entrada > 0 || registrosDoDia.saida > 0);

                return temValores ? (
                  <TouchableOpacity
                    key={indiceDia}
                    style={styles.celulaDia}
                    onPress={() =>
                      abrirModal(stringData, {
                        entrada: registrosDoDia ? registrosDoDia.entrada : 0,
                        saida: registrosDoDia ? registrosDoDia.saida : 0,
                        saldo: saldoDoDia,
                        items: registrosDoDia ? registrosDoDia.items : [],
                      })
                    }
                  >
                    <Text style={[styles.numeroDia, ehFimDeSemana && styles.textoFds]}>{dia}</Text>
                    <View style={styles.containerValores}>
                      <Text style={styles.textoDia}>{formatarBRL(registrosDoDia ? registrosDoDia.entrada : 0)}</Text>
                      <Text style={styles.textoDia}>{formatarBRL(registrosDoDia ? registrosDoDia.saida : 0)}</Text>
                      <Text style={[styles.textoDia, { color: obterCorDoSaldo(saldoDoDia) }]}>{formatarBRL(saldoDoDia)}</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View key={indiceDia} style={styles.celulaDia}>
                    <Text style={[styles.numeroDia, ehFimDeSemana && styles.textoFds]}>{dia}</Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    );
  };

  function obterCorDoSaldo(valor: number) {
    if (valor > 2000) return '#6aa84f';
    if (valor >= 1000) return '#b7e1cd';
    if (valor >= 0) return '#fce8b2';
    if (valor <= -500) return '#ff0000';
    return '#f4cccc';
  }

  return (
    <>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ref={referenciaDoScroll}
      >
        {mesesDoAno.map((_, indice) => renderizarMes(indice))}
      </ScrollView>
      <ModalDeCliqueSimpless />
      <ModalDeTextoLongo />
      <ModalDeNotas />
      <ModalDeAtualizacao />
    </>
  );
}


