import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Switch,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import DateInput from '../DateInput';
import CurrencyInput from '../CurrencyInput';
import { createRegistro, marcarRecorrente } from '@/app/registros';

export const HANDLE_VISIBLE_HEIGHT = 35;
export const SWIPE_THRESHOLD = 50;

export interface AnalyticsHeaderHandle {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  isHidden: () => boolean;
}

interface AnalyticsHeaderProps {
  translateY?: Animated.Value;
  onHeight?: (height: number) => void;
  onAdd?: (addedDate: Date) => void;
  onVisibleChange?: (visible: boolean) => void;
}

const AnalyticsHeader = (
  { translateY: externalY, onHeight, onAdd, onVisibleChange }: AnalyticsHeaderProps,
  ref: React.Ref<AnalyticsHeaderHandle>,
) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [isEntry, setIsEntry] = useState(true);
  const [showRecorrente, setShowRecorrente] = useState(false);
  const [recorrenteTipo, setRecorrenteTipo] = useState<'parcelas' | 'ano' | null>(null);
  const [parcelas, setParcelas] = useState('');
  const [errors, setErrors] = useState<{ amount?: boolean; description?: boolean; recorrente?: boolean; parcelas?: boolean }>({});
  const internalY = useRef(new Animated.Value(0)).current;
  const translateY = externalY ?? internalY;

  const handleAdd = async () => {
    const newErrors: typeof errors = {};
    if (amount <= 0 || amount > 100000000) newErrors.amount = true;
    if (!description.trim()) newErrors.description = true;
    if (showRecorrente) {
      if (!recorrenteTipo) newErrors.recorrente = true;
      if (recorrenteTipo === 'parcelas' && parcelas.trim() === '')
        newErrors.parcelas = true;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 3000);
      return;
    }
    try {
      Keyboard.dismiss();
      const registro = await createRegistro({
        date,
        amount,
        description,
        isEntry,
      });
      if (showRecorrente) {
        if (recorrenteTipo === 'parcelas') {
          await marcarRecorrente(registro.id, parseInt(parcelas, 10));
        } else {
          await marcarRecorrente(registro.id);
        }
      }
      setAmount(0);
      setDescription('');
      setParcelas('');
      setRecorrenteTipo(null);
      setShowRecorrente(false);
      onAdd?.(date);
      hideHeader();
    } catch (err) {
      console.error(err);
    }
  };

  const hideHeader = () => {
    Animated.timing(translateY, {
      toValue: -headerHeight + HANDLE_VISIBLE_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setHidden(true);
      onVisibleChange?.(false);
    });
  };

  const showHeader = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setHidden(false);
      onVisibleChange?.(true);
    });
  };

  const toggleHeader = () => {
    if (hidden) {
      showHeader();
    } else {
      hideHeader();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 20,
      onPanResponderMove: (_, gestureState) => {
        const hiddenPos = -headerHeight + HANDLE_VISIBLE_HEIGHT;
        const newPos = hidden ? hiddenPos + gestureState.dy : gestureState.dy;
        translateY.setValue(Math.max(hiddenPos, Math.min(newPos, 0)));
      },
      onPanResponderRelease: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        if (gestureState.dy < -SWIPE_THRESHOLD) {
          hideHeader();
        } else if (gestureState.dy > SWIPE_THRESHOLD) {
          showHeader();
        } else {
          Animated.spring(translateY, {
            toValue: hidden ? -headerHeight + HANDLE_VISIBLE_HEIGHT : 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const addDisabled =
    !amount ||
    amount > 100000000 ||
    !description.trim() ||
    (showRecorrente &&
      (!recorrenteTipo ||
        (recorrenteTipo === 'parcelas' && parcelas.trim() === '')));

  useImperativeHandle(ref, () => ({
    show: showHeader,
    hide: hideHeader,
    toggle: toggleHeader,
    isHidden: () => hidden,
  }));

  return (
    <Animated.View
      style={[styles.containerCabecalho, { transform: [{ translateY }] }]}
      onLayout={e => {
        const h = e.nativeEvent.layout.height;
        setHeaderHeight(h);
        onHeight?.(h);
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.puxador}>
        <View style={styles.barraPuxador} />
      </View>
      <TouchableOpacity style={styles.botaoAlternar} onPress={toggleHeader}>
        <Icon
          name={hidden ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      <Text style={styles.textoCabecalho}>Lançamentos</Text>
      <View style={styles.linhaEntradas}>
        <DateInput
          value={date}
          onChange={setDate}
          style={[styles.campo, styles.campoFlexivel, styles.margemDireitaPequena]}
        />
        <CurrencyInput
          value={amount}
          onChangeValue={setAmount}
          placeholder="R$ 0,00"
          placeholderTextColor="#ffffff"
          style={[
            styles.campo,
            styles.campoFlexivel,
            errors.amount && { borderColor: 'red' },
          ]}
        />
      </View>
      <TextInput
        style={[styles.areaTexto, errors.description && { borderColor: 'red' }]}
        multiline
        placeholder="Descrição"
        placeholderTextColor="#ffffff"
        value={description}
        onChangeText={setDescription}
        maxLength={219}
      />
      <Text style={styles.contadorCaracteres}>
        {description.length}/219 caracteres
      </Text>
      <View style={styles.linhaRecorrente}>
        <TouchableOpacity
          style={[
            styles.alternarRecorrente,
            errors.recorrente && { borderColor: 'red', borderWidth: 1 },
          ]}
          onPress={() => {
            if (showRecorrente) {
              setRecorrenteTipo(null);
              setParcelas('');
            }
            setShowRecorrente(prev => !prev);
          }}
        >
          <Icon
            name={showRecorrente ? 'chevron-down' : 'chevron-right'}
            size={16}
            color="#fff"
          />
          <Text style={styles.textoRecorrente}>Recorrente</Text>
        </TouchableOpacity>
        <View style={styles.alternarEntrada}>
          <Text style={styles.rotuloAlternar}>{isEntry ? 'Entrada' : 'Saída'}</Text>
          <Switch value={isEntry} onValueChange={setIsEntry} />
        </View>
      </View>
      {showRecorrente && (
        <View>
          <View style={styles.botoesRecorrente}>
            <TouchableOpacity
              style={[
                styles.botaoRecorrente,
                recorrenteTipo === 'parcelas' && styles.botaoRecorrenteSelecionado,
              ]}
              onPress={() => setRecorrenteTipo('parcelas')}
            >
              <Text style={styles.textoBotaoRecorrente}>Parcelas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.botaoRecorrente,
                recorrenteTipo === 'ano' && styles.botaoRecorrenteSelecionado,
              ]}
              onPress={() => setRecorrenteTipo('ano')}
            >
              <Text style={styles.textoBotaoRecorrente}>Ano Todo</Text>
            </TouchableOpacity>
          </View>
          {recorrenteTipo === 'parcelas' && (
            <TextInput
              style={[
                styles.campo,
                styles.inputParcelas,
                errors.parcelas && { borderColor: 'red' },
              ]}
              placeholder="Número de parcelas"
              placeholderTextColor="#ffffff"
              keyboardType="numeric"
              value={parcelas}
              onChangeText={setParcelas}
            />
          )}
        </View>
      )}
      <View style={styles.linhaInferior}>
        <TouchableOpacity
          style={[styles.botaoAdicionar, addDisabled && styles.botaoAdicionarDesabilitado]}
          onPress={addDisabled ? undefined : handleAdd}
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default forwardRef(AnalyticsHeader);
