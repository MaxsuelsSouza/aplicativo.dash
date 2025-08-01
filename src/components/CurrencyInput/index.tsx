import React, { useState, useEffect } from 'react';
import { TextInput, TextInputProps } from 'react-native';

export interface CurrencyInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: number;
  onChangeValue: (value: number) => void;
}

export default function CurrencyInput({ value, onChangeValue, style, ...props }: CurrencyInputProps) {
  const [inputValue, setInputValue] = useState('');

  // Sincronizar o estado interno quando o prop value mudar
  useEffect(() => {
    if (value === 0) {
      setInputValue('');
    } else {
      const digits = Math.round(value * 100).toString();
      setInputValue(formatCurrency(digits));
    }
  }, [value]);

  const handleChange = (text: string) => {
    // Manter apenas dígitos
    const digits = text.replace(/\D/g, '');

    // Criar valor formatado para exibição
    const formattedValue = formatCurrency(digits);
    setInputValue(formattedValue);

    // Converter para número em reais e notificar
    const valueInReais = Number(digits) / 100;
    onChangeValue(valueInReais);
  };

  const formatCurrency = (digits: string) => {
    if (!digits || digits === '0') return '';

    const value = Number(digits) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <TextInput
      {...props}
      style={[{ backgroundColor: '#fff', padding: 12, borderRadius: 8, color: '#000' }, style]}
      keyboardType="numeric"
      value={inputValue}
      onChangeText={handleChange}
      placeholder="R$ 0,00"
    />
  );
}
