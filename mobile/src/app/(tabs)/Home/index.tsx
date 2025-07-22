import AnalyticsHeader, {
  AnalyticsHeaderHandle,
  SWIPE_THRESHOLD,
  HANDLE_VISIBLE_HEIGHT,
} from '@/components/AnalyticsHeader';
import MonthlyTable, { MonthlyTableHandle } from '@/components/MonthlyTable';
import CalendarGrid from '@/components/CalendarGrid';
import CalendarSwipe from '@/components/CalendarSwipe';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, PanResponder, Animated, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import { fetchRegistros, Registro } from '@/app/registros';
import { inscreverExibicaoCabecalhoHome } from '@/utils/homeHeaderEvents';
import { HOME_REFRESH_INTERVAL_MS } from '@/constants/refresh';

let cacheRegistros: Registro[] = [];
let ultimoUpdate = 0;

export default function TelaInicialFinanceiro() {
  const referenciaDoHeader = useRef<AnalyticsHeaderHandle>(null);
  const referenciaDaTabela = useRef<MonthlyTableHandle>(null);
  const movimentoVerticalDoHeader = useRef(new Animated.Value(0)).current;
  const alturaDoHeader = useRef(new Animated.Value(0)).current;
  const [listaDeRegistros, setListaDeRegistros] = useState<Registro[]>(cacheRegistros);
  const [headerEstaVisivel, setHeaderEstaVisivel] = useState(true);
  const [modoDeVisualizacao, setModoDeVisualizacao] = useState<'grid' | 'swipe' | 'table'>('table');

  const atualizarListaDeRegistros = useCallback(() => {
    fetchRegistros()
      .then(dados => {
        cacheRegistros = dados;
        ultimoUpdate = Date.now();
        setListaDeRegistros(dados);
      })
      .catch(erro => console.error(erro));
  }, []);

  const aoAdicionarNovoRegistro = useCallback(
    (data: Date) => {
      atualizarListaDeRegistros();
      referenciaDoHeader.current?.hide();
      referenciaDaTabela.current?.scrollToMonth(data.getMonth());
    },
    [atualizarListaDeRegistros],
  );

  useEffect(() => {
    let ativo = true;

    const atualizar = () => {
      fetchRegistros()
        .then(dados => {
          cacheRegistros = dados;
          ultimoUpdate = Date.now();
          if (ativo) setListaDeRegistros(dados);
        })
        .catch(erro => console.error(erro));
    };

    if (cacheRegistros.length > 0) {
      setListaDeRegistros(cacheRegistros);
      if (Date.now() - ultimoUpdate > HOME_REFRESH_INTERVAL_MS) {
        atualizar();
      }
    } else {
      atualizar();
    }

    const id = setInterval(atualizar, HOME_REFRESH_INTERVAL_MS);
    return () => {
      ativo = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const cancelarInscricao = inscreverExibicaoCabecalhoHome(() => {
      referenciaDoHeader.current?.show();
    });
    return () => {
      cancelarInscricao();
    };
  }, []);

  const controladorDeGestos = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, estadoDoGesto) =>
        Math.abs(estadoDoGesto.dy) > 20,
      onPanResponderRelease: (_, estadoDoGesto) => {
        if (estadoDoGesto.dy > SWIPE_THRESHOLD) {
          referenciaDoHeader.current?.show();
        } else if (estadoDoGesto.dy < -SWIPE_THRESHOLD) {
          referenciaDoHeader.current?.hide();
        }
      },
    }),
  ).current;

  const alternarModoDeVisualizacao = useCallback(() => {
    setModoDeVisualizacao(modoAtual => {
      if (modoAtual === 'table') return 'swipe';
      if (modoAtual === 'swipe') return 'grid';
      return 'table';
    });
  }, []);

  const aoMudarAlturaDoHeader = useCallback(
    (altura: number) => {
      alturaDoHeader.setValue(altura);
    },
    [alturaDoHeader],
  );

  return (
    <View style={styles.containerTela} {...controladorDeGestos.panHandlers}>
      <StatusBar hidden={!headerEstaVisivel} />
      <AnalyticsHeader
        ref={referenciaDoHeader}
        translateY={movimentoVerticalDoHeader}
        onHeight={aoMudarAlturaDoHeader}
        onAdd={aoAdicionarNovoRegistro}
        onVisibleChange={setHeaderEstaVisivel}
      />
      <Animated.View
        style={[
          styles.areaConteudo,
          {
            transform: [
              {
                translateY: Animated.add(
                  movimentoVerticalDoHeader,
                  Animated.subtract(alturaDoHeader, HANDLE_VISIBLE_HEIGHT),
                ),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.botaoAlternarVisao} onPress={alternarModoDeVisualizacao}>
          <Icon
            name={
              modoDeVisualizacao === 'table'
                ? 'calendar'
                : modoDeVisualizacao === 'swipe'
                  ? 'grid'
                  : 'refresh-cw'
            }
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        {modoDeVisualizacao === 'swipe' ? (
          <CalendarSwipe registros={listaDeRegistros} />
        ) : modoDeVisualizacao === 'grid' ? (
          <CalendarGrid registros={listaDeRegistros} />
        ) : (
          <MonthlyTable
            ref={referenciaDaTabela}
            registros={listaDeRegistros}
            onUpdated={atualizarListaDeRegistros}
          />
        )}
      </Animated.View>
    </View>
  );
}

