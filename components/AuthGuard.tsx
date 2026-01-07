import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Protects routes that require authentication.
 * Redirects to /login if user is not authenticated.
 */
export function AuthGuard({ children }: AuthGuardProps) {
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

  // Not authenticated - redirect to login
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Authenticated - render children
  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
