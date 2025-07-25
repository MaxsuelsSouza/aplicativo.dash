import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SafeAreaContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function SafeAreaContainer({ children, style }: SafeAreaContainerProps) {
  const insets = useSafeAreaInsets();

  return <View style={[styles.container, { paddingTop: insets.top }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
