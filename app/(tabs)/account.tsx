import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Badge, BadgeText } from '@/components/ui/badge';

// Mock user data
const userData = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  memberSince: 'Jan 2024',
  stats: {
    itemsSold: 47,
    totalEarnings: 3420,
    avgRating: 4.9,
  },
};

export default function AccountScreen() {
  const MenuRow = ({ 
    icon, 
    title, 
    subtitle,
    badge,
    onPress 
  }: { 
    icon: string; 
    title: string; 
    subtitle?: string;
    badge?: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress}>
      <HStack className="justify-between items-center py-4">
        <HStack space="md" className="items-center flex-1">
          <Box className="w-11 h-11 bg-slate-700 rounded-xl items-center justify-center">
            <Text size="lg">{icon}</Text>
          </Box>
          <VStack className="flex-1">
            <Text className="text-slate-50 font-medium">{title}</Text>
            {subtitle && <Text size="sm" className="text-slate-400">{subtitle}</Text>}
          </VStack>
        </HStack>
        {badge ? (
          <Badge className="bg-violet-500/20 rounded-full px-3">
            <BadgeText className="text-violet-400">{badge}</BadgeText>
          </Badge>
        ) : (
          <Text className="text-slate-500 text-lg">›</Text>
        )}
      </HStack>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Box className="px-6 pt-4">
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <HStack className="items-center mb-6" space="md">
              <Box className="w-16 h-16 rounded-full bg-violet-500/20 items-center justify-center border-2 border-violet-500/30">
                <Text size="3xl">👤</Text>
              </Box>
              <VStack className="flex-1">
                <Heading size="xl" className="text-slate-50">{userData.name}</Heading>
                <Text size="sm" className="text-slate-400">{userData.email}</Text>
              </VStack>
              <Text className="text-slate-500 text-2xl">›</Text>
            </HStack>
          </TouchableOpacity>

          {/* Quick Stats */}
          <Box className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-6">
            <HStack className="justify-around">
              <VStack className="items-center">
                <Text className="text-violet-400 font-bold text-xl">{userData.stats.itemsSold}</Text>
                <Text size="xs" className="text-slate-400">Items Sold</Text>
              </VStack>
              <Box className="w-px h-10 bg-slate-700" />
              <VStack className="items-center">
                <Text className="text-green-400 font-bold text-xl">${userData.stats.totalEarnings}</Text>
                <Text size="xs" className="text-slate-400">Earned</Text>
              </VStack>
              <Box className="w-px h-10 bg-slate-700" />
              <VStack className="items-center">
                <Text className="text-amber-400 font-bold text-xl">{userData.stats.avgRating}⭐</Text>
                <Text size="xs" className="text-slate-400">Rating</Text>
              </VStack>
            </HStack>
          </Box>
        </Box>

        {/* Menu Sections */}
        <Box className="px-6">
          {/* Account Section */}
          <Box className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-4">
            <Text size="sm" className="text-slate-500 font-semibold mb-2 uppercase tracking-wide">
              Account
            </Text>
            <MenuRow 
              icon="👤" 
              title="View Profile" 
              onPress={() => router.push('/profile')} 
            />
            <Divider className="bg-slate-700" />
            <MenuRow 
              icon="💳" 
              title="Payment Methods" 
              subtitle="Add or manage cards"
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            <MenuRow 
              icon="📍" 
              title="Pickup Addresses" 
              onPress={() => {}} 
            />
          </Box>

          {/* Activity Section */}
          <Box className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-4">
            <Text size="sm" className="text-slate-500 font-semibold mb-2 uppercase tracking-wide">
              Activity
            </Text>
            <MenuRow 
              icon="📦" 
              title="Pending Pickups" 
              badge="3"
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            <MenuRow 
              icon="🚚" 
              title="Track Shipments" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            <MenuRow 
              icon="📊" 
              title="Earnings Report" 
              onPress={() => {}} 
            />
          </Box>

          {/* Settings Section */}
          <Box className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-4">
            <Text size="sm" className="text-slate-500 font-semibold mb-2 uppercase tracking-wide">
              Settings
            </Text>
            <MenuRow 
              icon="⚙️" 
              title="Settings" 
              onPress={() => router.push('/settings')} 
            />
            <Divider className="bg-slate-700" />
            <MenuRow 
              icon="🔔" 
              title="Notifications" 
              onPress={() => router.push('/settings')} 
            />
          </Box>

          {/* Support Section */}
          <Box className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-4">
            <Text size="sm" className="text-slate-500 font-semibold mb-2 uppercase tracking-wide">
              Support
            </Text>
            <MenuRow 
              icon="❓" 
              title="Help Center" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            <MenuRow 
              icon="💬" 
              title="Contact Us" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            <MenuRow 
              icon="🎁" 
              title="Refer a Friend" 
              badge="Earn $10"
              onPress={() => {}} 
            />
          </Box>

          {/* Sign Out */}
          <Button 
            size="lg"
            variant="outline"
            className="border-slate-600 rounded-2xl mb-8"
            onPress={() => router.replace('/login')}
          >
            <ButtonText className="text-slate-400">Sign Out</ButtonText>
          </Button>

          {/* App Version */}
          <Center className="mb-8">
            <Text size="xs" className="text-slate-600">LOOP v1.0.0</Text>
          </Center>
        </Box>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
});
