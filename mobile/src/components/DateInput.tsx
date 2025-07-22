import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export interface DateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  style?: any;
}

export default function DateInput({ value, onChange, style }: DateInputProps) {
  const [show, setShow] = useState(false);

  const onChangeInternal = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS !== 'ios') {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(true)} style={style}>
        <Text style={{ color: '#fff' }}>{value.toLocaleDateString('pt-BR')}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={onChangeInternal}
        />
      )}
    </View>
  );
}
