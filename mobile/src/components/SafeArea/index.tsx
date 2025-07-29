import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';

import { UIConfig } from '@/config/ui';

export interface SafeAreaContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * Disable automatic top padding even if the current route isn't in the
   * configured list of disabled screens.
   */
  disablePadding?: boolean;
  /**
   * Ignore the default container styles (background color/flex) defined by
   * the configuration. Useful when a screen manages its own layout.
   */
  disableDefaultStyle?: boolean;
}

export default function SafeAreaContainer({
  children,
  style,
  disablePadding,
  disableDefaultStyle,
}: SafeAreaContainerProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const disabledRoute = UIConfig.safeAreaDisabledRoutes.some(route => pathname.startsWith(route));

  const paddingStyle = disablePadding || disabledRoute ? null : { paddingTop: insets.top };

  return (
    <View
      style={[!disableDefaultStyle && [styles.container, { backgroundColor: UIConfig.colors.background }], paddingStyle, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
