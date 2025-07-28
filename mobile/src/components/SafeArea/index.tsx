import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';

import { SAFE_AREA_DISABLED_ROUTES } from '@/constants/safeArea';

export interface SafeAreaContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function SafeAreaContainer({ children, style }: SafeAreaContainerProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const disabled = SAFE_AREA_DISABLED_ROUTES.some(route => pathname.startsWith(route));

  const paddingStyle = disabled ? null : { paddingTop: insets.top };

  return <View style={[styles.container, paddingStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
