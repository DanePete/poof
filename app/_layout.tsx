import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={DarkTheme}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#0f172a' },
            headerTintColor: '#f8fafc',
            contentStyle: { backgroundColor: '#0f172a' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="login" 
            options={{ 
              headerShown: false,
              presentation: 'fullScreenModal',
            }} 
          />
          <Stack.Screen 
            name="liquidate" 
            options={{ 
              headerShown: true,
              title: 'Liquidate Item',
              headerBackTitle: 'Back',
            }} 
          />
          <Stack.Screen 
            name="profile" 
            options={{ 
              headerShown: true,
              title: 'Profile',
              headerBackTitle: 'Back',
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              headerShown: true,
              title: 'Settings',
              headerBackTitle: 'Back',
            }} 
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
