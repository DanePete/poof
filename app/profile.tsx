import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
  avatar: null,
  memberSince: 'Jan 2024',
  stats: {
    itemsSold: 47,
    totalEarnings: 3420,
    avgRating: 4.9,
    pendingItems: 3,
  },
  recentActivity: [
    { id: 1, item: 'Nike Air Max 90', status: 'sold', amount: 85, date: '2 days ago' },
    { id: 2, item: 'MacBook Pro Charger', status: 'pending', amount: 45, date: '3 days ago' },
    { id: 3, item: 'Vintage Levi\'s Jacket', status: 'sold', amount: 120, date: '1 week ago' },
  ],
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Avatar */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.headerGradient}
        >
          <Center>
            <Box className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4 border-4 border-white/30">
              <Text size="4xl">👤</Text>
            </Box>
            <Heading size="2xl" className="text-white">
              {userData.name}
            </Heading>
            <Text className="text-white/80 mt-1">
              {userData.email}
            </Text>
            <Badge className="bg-white/20 rounded-full px-4 py-1 mt-3">
              <BadgeText className="text-white">Member since {userData.memberSince}</BadgeText>
            </Badge>
          </Center>
        </LinearGradient>

        <Box className="px-6 -mt-6">
          {/* Stats Cards */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
            <HStack className="justify-around">
              <VStack className="items-center">
                <Heading size="2xl" className="text-violet-400">
                  {userData.stats.itemsSold}
                </Heading>
                <Text size="sm" className="text-slate-400">Items Sold</Text>
              </VStack>

              <Box className="w-px h-12 bg-slate-700" />

              <VStack className="items-center">
                <Heading size="2xl" className="text-green-400">
                  ${userData.stats.totalEarnings}
                </Heading>
                <Text size="sm" className="text-slate-400">Earnings</Text>
              </VStack>

              <Box className="w-px h-12 bg-slate-700" />

              <VStack className="items-center">
                <Heading size="2xl" className="text-amber-400">
                  {userData.stats.avgRating}⭐
                </Heading>
                <Text size="sm" className="text-slate-400">Rating</Text>
              </VStack>
            </HStack>
          </Box>

          {/* Pending Items Alert */}
          {userData.stats.pendingItems > 0 && (
            <Box className="bg-amber-500/10 rounded-2xl p-4 border border-amber-500/30 mb-6">
              <HStack className="items-center justify-between">
                <HStack space="sm" className="items-center">
                  <Text size="xl">📦</Text>
                  <VStack>
                    <Text className="text-amber-400 font-semibold">
                      {userData.stats.pendingItems} Pending Items
                    </Text>
                    <Text size="sm" className="text-slate-400">
                      Awaiting courier pickup
                    </Text>
                  </VStack>
                </HStack>
                <Button size="sm" className="bg-amber-500 rounded-xl">
                  <ButtonText className="text-white">View</ButtonText>
                </Button>
              </HStack>
            </Box>
          )}

          {/* Recent Activity */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
            <HStack className="justify-between items-center mb-4">
              <Heading size="lg" className="text-slate-50">Recent Activity</Heading>
              <TouchableOpacity>
                <Text className="text-violet-400">See All</Text>
              </TouchableOpacity>
            </HStack>

            <VStack space="md">
              {userData.recentActivity.map((item, index) => (
                <Box key={item.id}>
                  <HStack className="justify-between items-center py-3">
                    <HStack space="md" className="items-center flex-1">
                      <Box className="w-12 h-12 bg-slate-700 rounded-xl items-center justify-center">
                        <Text size="xl">
                          {item.status === 'sold' ? '✅' : '⏳'}
                        </Text>
                      </Box>
                      <VStack className="flex-1">
                        <Text className="text-slate-50 font-medium" numberOfLines={1}>
                          {item.item}
                        </Text>
                        <Text size="sm" className="text-slate-400">
                          {item.date}
                        </Text>
                      </VStack>
                    </HStack>
                    <VStack className="items-end">
                      <Text className={`font-semibold ${item.status === 'sold' ? 'text-green-400' : 'text-amber-400'}`}>
                        ${item.amount}
                      </Text>
                      <Badge className={`rounded-full px-2 ${item.status === 'sold' ? 'bg-green-500/20' : 'bg-amber-500/20'}`}>
                        <BadgeText className={item.status === 'sold' ? 'text-green-400' : 'text-amber-400'}>
                          {item.status}
                        </BadgeText>
                      </Badge>
                    </VStack>
                  </HStack>
                  {index < userData.recentActivity.length - 1 && (
                    <Divider className="bg-slate-700" />
                  )}
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Quick Actions */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
            <Heading size="lg" className="text-slate-50 mb-4">Quick Actions</Heading>
            
            <VStack space="sm">
              <TouchableOpacity style={styles.actionRow} onPress={() => router.push('/settings')}>
                <HStack className="items-center" space="md">
                  <Box className="w-10 h-10 bg-slate-700 rounded-xl items-center justify-center">
                    <Text>⚙️</Text>
                  </Box>
                  <Text className="text-slate-50">Settings</Text>
                </HStack>
                <Text className="text-slate-500">→</Text>
              </TouchableOpacity>

              <Divider className="bg-slate-700" />

              <TouchableOpacity style={styles.actionRow}>
                <HStack className="items-center" space="md">
                  <Box className="w-10 h-10 bg-slate-700 rounded-xl items-center justify-center">
                    <Text>💳</Text>
                  </Box>
                  <Text className="text-slate-50">Payment Methods</Text>
                </HStack>
                <Text className="text-slate-500">→</Text>
              </TouchableOpacity>

              <Divider className="bg-slate-700" />

              <TouchableOpacity style={styles.actionRow}>
                <HStack className="items-center" space="md">
                  <Box className="w-10 h-10 bg-slate-700 rounded-xl items-center justify-center">
                    <Text>📍</Text>
                  </Box>
                  <Text className="text-slate-50">Pickup Addresses</Text>
                </HStack>
                <Text className="text-slate-500">→</Text>
              </TouchableOpacity>

              <Divider className="bg-slate-700" />

              <TouchableOpacity style={styles.actionRow}>
                <HStack className="items-center" space="md">
                  <Box className="w-10 h-10 bg-slate-700 rounded-xl items-center justify-center">
                    <Text>🎁</Text>
                  </Box>
                  <Text className="text-slate-50">Refer a Friend</Text>
                </HStack>
                <Badge className="bg-violet-500/20 rounded-full px-2">
                  <BadgeText className="text-violet-400">Earn $10</BadgeText>
                </Badge>
              </TouchableOpacity>
            </VStack>
          </Box>

          {/* Logout */}
          <Button 
            size="lg"
            variant="outline"
            className="border-red-500/50 rounded-2xl mb-8"
            onPress={() => router.replace('/login')}
          >
            <ButtonText className="text-red-400">Sign Out</ButtonText>
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
