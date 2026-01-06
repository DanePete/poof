import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// gluestack-ui components
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Divider } from '@/components/ui/divider';
import { Badge, BadgeText } from '@/components/ui/badge';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  icon: string;
  label: string;
  badge?: string;
  onPress: () => void;
}

const MenuItem = ({ icon, label, badge, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          <Text size="lg">{icon}</Text>
        </View>
        <Text className="text-slate-100 font-medium">{label}</Text>
      </View>
      {badge && (
        <Badge className="bg-violet-500/20 rounded-full px-2">
          <BadgeText className="text-violet-400">{badge}</BadgeText>
        </Badge>
      )}
    </View>
  </TouchableOpacity>
);

export function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const insets = useSafeAreaInsets();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path as any);
  };

  return (
    <>
      {/* Backdrop */}
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1}
        onPress={onClose}
      />
      
      {/* Drawer */}
      <View style={[styles.drawer, { paddingTop: insets.top }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Profile Section */}
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.profileSection}
          >
            <TouchableOpacity onPress={() => handleNavigation('/profile')}>
              <View style={styles.profileRow}>
                <View style={styles.profileAvatar}>
                  <Text size="2xl">👤</Text>
                </View>
                <VStack>
                  <Heading size="lg" className="text-white">Alex Johnson</Heading>
                  <Text size="sm" className="text-white/80">alex@example.com</Text>
                </VStack>
              </View>
            </TouchableOpacity>
            
            {/* Quick Stats */}
            <View style={styles.statsRow}>
              <VStack className="items-center">
                <Text className="text-white font-bold">47</Text>
                <Text size="xs" className="text-white/70">Items</Text>
              </VStack>
              <VStack className="items-center">
                <Text className="text-white font-bold">$3,420</Text>
                <Text size="xs" className="text-white/70">Earned</Text>
              </VStack>
              <VStack className="items-center">
                <Text className="text-white font-bold">4.9⭐</Text>
                <Text size="xs" className="text-white/70">Rating</Text>
              </VStack>
            </View>
          </LinearGradient>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            <Text size="xs" className="text-slate-500 font-semibold uppercase tracking-wider mb-2 px-2">
              Navigation
            </Text>
            <MenuItem icon="🏠" label="Home" onPress={() => handleNavigation('/')} />
            <MenuItem icon="📸" label="Liquidate Item" onPress={() => handleNavigation('/liquidate')} />
            <MenuItem icon="📦" label="History" onPress={() => handleNavigation('/history')} />
            <MenuItem icon="🔍" label="Explore" onPress={() => handleNavigation('/explore')} />

            <Divider className="bg-slate-800 my-4" />

            <Text size="xs" className="text-slate-500 font-semibold uppercase tracking-wider mb-2 px-2">
              Account
            </Text>
            <MenuItem icon="👤" label="Profile" onPress={() => handleNavigation('/profile')} />
            <MenuItem icon="💳" label="Payment Methods" onPress={() => {}} />
            <MenuItem icon="📍" label="Pickup Addresses" onPress={() => {}} />
            <MenuItem icon="📦" label="Pending Pickups" badge="3" onPress={() => {}} />

            <Divider className="bg-slate-800 my-4" />

            <Text size="xs" className="text-slate-500 font-semibold uppercase tracking-wider mb-2 px-2">
              Settings
            </Text>
            <MenuItem icon="⚙️" label="Settings" onPress={() => handleNavigation('/settings')} />
            <MenuItem icon="🔔" label="Notifications" onPress={() => handleNavigation('/settings')} />
            <MenuItem icon="🌙" label="Dark Mode" onPress={() => {}} />

            <Divider className="bg-slate-800 my-4" />

            <Text size="xs" className="text-slate-500 font-semibold uppercase tracking-wider mb-2 px-2">
              Support
            </Text>
            <MenuItem icon="❓" label="Help Center" onPress={() => {}} />
            <MenuItem icon="💬" label="Contact Us" onPress={() => {}} />
            <MenuItem icon="🎁" label="Refer a Friend" badge="Earn $10" onPress={() => {}} />

            <Divider className="bg-slate-800 my-4" />

            <MenuItem icon="🚪" label="Sign Out" onPress={() => handleNavigation('/login')} />
          </View>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text size="xs" className="text-slate-600">LOOP v1.0.0</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: Math.min(width * 0.85, 320),
    zIndex: 101,
    backgroundColor: '#0f172a',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  profileSection: {
    padding: 20,
    paddingTop: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#334155',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 16,
  },
});
