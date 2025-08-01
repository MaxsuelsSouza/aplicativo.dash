import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import SafeAreaContainer from './SafeArea';
import { UIConfig } from '@/config/ui';

interface ScreenProps {
  children: React.ReactNode;
  /** Wrap children in a ScrollView when true */
  scrollable?: boolean;
  /** Controls the RefreshControl. Ignored when scrollable is false */
  refreshing?: boolean;
  /** Callback for pull to refresh. Ignored when scrollable is false */
  onRefresh?: () => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Disable the SafeArea wrapper */
  disableSafeArea?: boolean;
  /** Ignore the default container background */
  disableDefaultStyle?: boolean;
}

export default function Screen({
  children,
  scrollable,
  refreshing = false,
  onRefresh,
  style,
  contentContainerStyle,
  disableSafeArea,
  disableDefaultStyle,
}: ScreenProps) {
  const Wrapper: React.ComponentType<any> = disableSafeArea ? View : SafeAreaContainer;

  const refresh = scrollable && onRefresh ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={UIConfig.colors.primary}
    />
  ) : undefined;

  const content = scrollable ? (
    <ScrollView
      style={[styles.flex, style]}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={refresh}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, style]}>{children}</View>
  );

  return (
    <Wrapper
      style={[
        !disableDefaultStyle && { backgroundColor: UIConfig.colors.background },
        styles.flex,
      ]}
    >
      {content}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
