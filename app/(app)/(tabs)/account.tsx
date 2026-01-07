import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { Link, router } from 'expo-router';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Divider } from '@/components/ui/divider';

import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useItems } from '@/hooks/useItems';
import { 
  Settings as SettingsIcon, 
  History as HistoryIcon, 
  LogOut as LogOutIcon,
  User as UserIcon,
  CreditCard,
  HelpCircle,
  Bell,
  ChevronRight,
  Wallet,
} from 'lucide-react-native';

export default function AccountScreen() {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading, refetch } = useProfile();
  const { stats, loading: itemsLoading } = useItems();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleSignOut = async () => {
    await signOut();
  };

  const loading = profileLoading || itemsLoading;

  // Not logged in state
  if (!user) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.centerContent}>
        <Box className="items-center p-8">
          <Box className="w-24 h-24 bg-slate-800 rounded-full items-center justify-center mb-6">
            <Icon as={UserIcon} size="xl" className="text-slate-500" />
          </Box>
          <Heading size="xl" className="text-white mb-2">Welcome to LOOP</Heading>
          <Text className="text-slate-400 text-center mb-6">
            Sign in to track your liquidations,{'\n'}earnings, and more.
          </Text>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-white font-bold text-lg">Sign In / Sign Up</Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    );
  }

  // Get initials for avatar
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() || 'U';

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8b5cf6" />
      }
    >
      {/* Profile Header */}
      <Box className="items-center mb-8">
        <Avatar size="2xl" className="bg-violet-500 mb-4">
          {profile?.avatar_url ? (
            <AvatarImage source={{ uri: profile.avatar_url }} alt="Profile" />
          ) : (
            <AvatarFallbackText className="text-white text-2xl">{initials}</AvatarFallbackText>
          )}
        </Avatar>
        <Heading size="2xl" className="text-white">
          {profile?.full_name || 'LOOP User'}
        </Heading>
        <Text className="text-slate-400">{user.email}</Text>
        
        <TouchableOpacity 
          style={styles.editProfileButton}
          onPress={() => router.push('/(app)/profile')}
        >
          <Text className="text-violet-400 font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </Box>

      {/* Stats Cards */}
      <HStack space="md" className="mb-8">
        <Box className="flex-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <Text className="text-slate-400 mb-1">Items Sold</Text>
          <Heading size="2xl" className="text-white">
            {loading ? <Spinner size="small" /> : (profile?.total_items_sold || stats.sold)}
          </Heading>
        </Box>
        <Box className="flex-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <Text className="text-slate-400 mb-1">Total Earnings</Text>
          <Heading size="2xl" className="text-emerald-400">
            {loading ? <Spinner size="small" /> : `$${(profile?.total_earnings || stats.totalEarnings).toLocaleString()}`}
          </Heading>
        </Box>
      </HStack>

      {/* Menu Items */}
      <VStack space="sm">
        <Text className="text-slate-500 uppercase text-xs mb-2 px-2">Account</Text>
        
        <MenuItem 
          icon={Wallet}
          label="Payment Methods"
          onPress={() => router.push('/(app)/settings')}
        />
        <MenuItem 
          icon={HistoryIcon}
          label="Transaction History"
          onPress={() => router.push('/(app)/(tabs)/history')}
        />
        <MenuItem 
          icon={CreditCard}
          label="Payout Settings"
          onPress={() => router.push('/(app)/settings')}
        />

        <Divider className="my-4 bg-slate-800" />

        <Text className="text-slate-500 uppercase text-xs mb-2 px-2">Preferences</Text>
        
        <MenuItem 
          icon={Bell}
          label="Notifications"
          onPress={() => router.push('/(app)/settings')}
        />
        <MenuItem 
          icon={SettingsIcon}
          label="Settings"
          onPress={() => router.push('/(app)/settings')}
        />
        <MenuItem 
          icon={HelpCircle}
          label="Help & Support"
          onPress={() => {}}
        />

        <Divider className="my-4 bg-slate-800" />

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <HStack space="md" className="items-center">
            <Icon as={LogOutIcon} size="md" className="text-red-400" />
            <Text className="text-red-400 text-lg">Sign Out</Text>
          </HStack>
        </TouchableOpacity>
      </VStack>

      {/* App Version */}
      <Text className="text-slate-600 text-center mt-8 mb-4">
        LOOP v1.0.0
      </Text>
    </ScrollView>
  );
}

interface MenuItemProps {
  icon: any;
  label: string;
  onPress: () => void;
  badge?: string;
}

function MenuItem({ icon: ItemIcon, label, onPress, badge }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <HStack className="items-center justify-between">
        <HStack space="md" className="items-center">
          <Box className="w-10 h-10 bg-slate-800 rounded-xl items-center justify-center">
            <Icon as={ItemIcon} size="sm" className="text-violet-400" />
          </Box>
          <Text className="text-white text-lg">{label}</Text>
        </HStack>
        <HStack space="sm" className="items-center">
          {badge && (
            <Box className="bg-violet-500 px-2 py-1 rounded-full">
              <Text className="text-white text-xs">{badge}</Text>
            </Box>
          )}
          <Icon as={ChevronRight} size="sm" className="text-slate-500" />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  editProfileButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8b5cf6',
  },
  signInButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
  },
  menuItem: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  signOutButton: {
    padding: 16,
    alignItems: 'center',
  },
});
