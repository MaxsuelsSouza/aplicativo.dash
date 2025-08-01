import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SafeAreaContainer from '@/components/SafeArea';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaContainer>
          <ThemeProvider value={DefaultTheme}>
            <Stack 
              initialRouteName="index"
              screenOptions={{ 
                headerShown: false 
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(vendedor)" />
              <Stack.Screen name="Produto" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" />
          </ThemeProvider>
        </SafeAreaContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
