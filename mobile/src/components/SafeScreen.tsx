import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeScreenProps {
  children: ReactNode;
  style?: any;
}

export default function SafeScreen({ children, style }: SafeScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.container, { paddingTop: insets.top + 24 }, style]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
