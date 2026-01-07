import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

/**
 * Root Index - Entry point that redirects based on auth state
 */
export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text className="text-5xl">💎</Text>
        </View>
        <Spinner size="large" />
        <Text className="text-slate-400 mt-4">Loading LOOP...</Text>
      </View>
    );
  }

  // Redirect based on auth state
  if (user) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});
