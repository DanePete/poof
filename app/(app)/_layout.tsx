import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

/**
 * App Layout - Protected routes
 * Redirects to login if user is not authenticated
 */
export default function AppLayout() {
  const { user, loading } = useAuth();

  // Show loading while checking auth state
  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner size="large" />
        <Text className="text-slate-400 mt-4">Loading...</Text>
      </View>
    );
  }

  // Not authenticated? Redirect to login
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Authenticated - show protected screens
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f8fafc',
        contentStyle: { backgroundColor: '#0f172a' },
      }}
    >
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
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
      <Stack.Screen 
        name="liquidate" 
        options={{ 
          headerShown: true,
          title: 'Liquidate Item',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
