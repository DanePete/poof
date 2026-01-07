import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text as RNText } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth();
  const { profile } = useProfile();

  // Get initials for avatar
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || '?';

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={() => router.push('/(app)/settings')}
      >
        <RNText style={styles.menuIcon}>☰</RNText>
      </TouchableOpacity>
      
      <RNText style={styles.title}>{title}</RNText>
      
      {user ? (
        <TouchableOpacity 
          style={styles.avatarButton}
          onPress={() => router.push('/(app)/profile')}
        >
          <View style={styles.avatar}>
            <RNText style={styles.avatarText}>{initials}</RNText>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <RNText style={styles.loginText}>Login</RNText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50, // Account for safe area
    paddingBottom: 12,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#f8fafc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  avatarButton: {
    padding: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  loginText: {
    color: '#8b5cf6',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Header;
