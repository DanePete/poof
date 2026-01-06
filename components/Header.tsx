import React from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// gluestack-ui components
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showProfile?: boolean;
  onMenuPress?: () => void;
}

export function Header({ 
  title = 'LOOP', 
  showMenu = true, 
  showProfile = true,
  onMenuPress 
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.content}>
        {/* Left: Hamburger Menu */}
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onMenuPress}
        >
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={[styles.hamburgerLine, styles.hamburgerLineShort]} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>

        {/* Center: Logo/Title */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text size="lg">💎</Text>
          </View>
          <Heading size="lg" className="text-slate-50 tracking-tight">
            {title}
          </Heading>
        </View>

        {/* Right: Profile Avatar */}
        {showProfile ? (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/profile')}
          >
            <View style={styles.avatar}>
              <Text size="sm">👤</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburger: {
    width: 22,
    height: 16,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 2.5,
    backgroundColor: '#f8fafc',
    borderRadius: 2,
  },
  hamburgerLineShort: {
    width: '70%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
});
