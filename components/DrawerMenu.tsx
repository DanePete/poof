import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Divider } from '@/components/ui/divider';

import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { 
  Home as HomeIcon, 
  Search as SearchIcon, 
  History as HistoryIcon, 
  User as UserIcon, 
  LogIn as LogInIcon, 
  Settings as SettingsIcon, 
  LogOut as LogOutIcon,
  Zap,
} from 'lucide-react-native';

const DrawerMenu = (props: any) => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  // Get initials for avatar
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || '?';

  const handleNavigation = (href: string) => {
    props.navigation.closeDrawer();
    router.push(href as any);
  };

  return (
    <Box style={styles.container}>
      {/* Header */}
      <Box style={styles.header}>
        {user ? (
          <>
            <TouchableOpacity onPress={() => handleNavigation('/(app)/profile')}>
              <HStack space="md" className="items-center">
                <Avatar size="lg" className="bg-violet-500">
                  {profile?.avatar_url ? (
                    <AvatarImage source={{ uri: profile.avatar_url }} alt="Profile" />
                  ) : (
                    <AvatarFallbackText className="text-white">{initials}</AvatarFallbackText>
                  )}
                </Avatar>
                <VStack>
                  <Text className="text-white text-xl font-bold">
                    {profile?.full_name || 'LOOP User'}
                  </Text>
                  <Text className="text-slate-400 text-sm">View Profile</Text>
                </VStack>
              </HStack>
            </TouchableOpacity>

            {/* Quick Stats */}
            <HStack className="mt-4" space="lg">
              <VStack>
                <Text className="text-white font-bold">{profile?.total_items_sold || 0}</Text>
                <Text className="text-slate-500 text-xs">Items Sold</Text>
              </VStack>
              <VStack>
                <Text className="text-emerald-400 font-bold">
                  ${(profile?.total_earnings || 0).toLocaleString()}
                </Text>
                <Text className="text-slate-500 text-xs">Earnings</Text>
              </VStack>
            </HStack>
          </>
        ) : (
          <TouchableOpacity onPress={() => handleNavigation('/(auth)/login')}>
            <HStack space="md" className="items-center">
              <Box className="w-14 h-14 bg-slate-800 rounded-full items-center justify-center">
                <Icon as={UserIcon} size="lg" className="text-slate-500" />
              </Box>
              <VStack>
                <Text className="text-white text-lg font-semibold">Sign In</Text>
                <Text className="text-slate-400 text-sm">Tap to get started</Text>
              </VStack>
            </HStack>
          </TouchableOpacity>
        )}
      </Box>

      <Divider className="bg-slate-800" />

      {/* Navigation Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <VStack space="xs">
          <DrawerItem 
            icon={HomeIcon}
            label="Home" 
            href="/(app)/(tabs)" 
            currentPath={pathname}
            onPress={() => handleNavigation('/(app)/(tabs)')}
          />
          <DrawerItem 
            icon={SearchIcon}
            label="Explore" 
            href="/(app)/(tabs)/explore" 
            currentPath={pathname}
            onPress={() => handleNavigation('/(app)/(tabs)/explore')}
          />
          <DrawerItem 
            icon={Zap}
            label="Liquidate" 
            href="/(app)/liquidate" 
            currentPath={pathname}
            onPress={() => handleNavigation('/(app)/liquidate')}
            highlight
          />
          <DrawerItem 
            icon={HistoryIcon}
            label="History" 
            href="/(app)/(tabs)/history" 
            currentPath={pathname}
            onPress={() => handleNavigation('/(app)/(tabs)/history')}
          />
          <DrawerItem 
            icon={UserIcon}
            label="Account" 
            href="/(app)/(tabs)/account" 
            currentPath={pathname}
            onPress={() => handleNavigation('/(app)/(tabs)/account')}
          />

          <Divider className="my-4 bg-slate-800" />

          <DrawerItem 
            icon={SettingsIcon}
            label="Settings" 
            href="/(app)/settings" 
            currentPath={pathname}
            onPress={() => handleNavigation('/(app)/settings')}
          />
        </VStack>
      </DrawerContentScrollView>

      {/* Footer */}
      {user && (
        <Box style={styles.footer}>
          <TouchableOpacity onPress={signOut}>
            <HStack space="md" className="items-center p-4">
              <Icon as={LogOutIcon} size="md" className="text-red-400" />
              <Text className="text-red-400 text-lg">Sign Out</Text>
            </HStack>
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
};

interface DrawerItemProps {
  icon: any;
  label: string;
  href: string;
  currentPath: string;
  onPress: () => void;
  highlight?: boolean;
}

function DrawerItem({ icon: ItemIcon, label, href, currentPath, onPress, highlight }: DrawerItemProps) {
  const isActive = currentPath === href || 
    currentPath.includes(href.replace('/(app)', ''));

  return (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        isActive && styles.drawerItemActive,
        highlight && styles.drawerItemHighlight,
      ]}
      onPress={onPress}
    >
      <HStack space="md" className="items-center">
        <Icon 
          as={ItemIcon} 
          size="md" 
          color={highlight ? '#a855f7' : isActive ? '#8b5cf6' : '#94a3b8'} 
        />
        <Text 
          className={`text-lg ${highlight ? 'text-violet-400 font-bold' : isActive ? 'text-white font-semibold' : 'text-slate-300'}`}
        >
          {label}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  drawerItemActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  drawerItemHighlight: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
});

export default DrawerMenu;
