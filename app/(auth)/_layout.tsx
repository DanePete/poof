import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

/**
 * Auth Layout - Public routes (login, signup, etc.)
 * Redirects to app if user is already authenticated
 */
export default function AuthLayout() {
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

  // Already authenticated? Redirect to app
  if (user) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  // Not authenticated - show auth screens
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0f172a' },
      }}
    >
      <Stack.Screen name="login" />
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
