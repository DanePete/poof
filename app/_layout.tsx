import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/contexts/AuthContext';

/**
 * Root Layout - Providers only
 * 
 * Route structure:
 * - (auth)/ - Public routes (login, signup)
 * - (app)/ - Protected routes (tabs, profile, settings, etc.)
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <GluestackUIProvider mode="dark">
        <ThemeProvider value={DarkTheme}>
          <Slot />
          <StatusBar style="light" />
        </ThemeProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
