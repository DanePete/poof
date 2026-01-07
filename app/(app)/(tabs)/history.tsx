import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { useAuth } from '@/contexts/AuthContext';
import { useItems } from '@/hooks/useItems';
import { ItemStatus } from '@/lib/database.types';
import {
  CheckCircle2,
  Clock,
  Package,
  TrendingUp,
  Truck,
  XCircle
} from 'lucide-react-native';

type FilterType = 'all' | 'active' | 'sold' | 'cancelled';

const statusConfig: Record<ItemStatus, { icon: any; color: string; bgColor: string; label: string }> = {
  draft: { icon: Clock, color: '#94a3b8', bgColor: '#334155', label: 'Draft' },
  analyzing: { icon: Clock, color: '#f59e0b', bgColor: '#78350f', label: 'Analyzing' },
  listed: { icon: Package, color: '#3b82f6', bgColor: '#1e3a8a', label: 'Listed' },
  pending_pickup: { icon: Truck, color: '#8b5cf6', bgColor: '#4c1d95', label: 'Pickup Scheduled' },
  in_transit: { icon: Truck, color: '#f59e0b', bgColor: '#78350f', label: 'In Transit' },
  sold: { icon: CheckCircle2, color: '#22c55e', bgColor: '#14532d', label: 'Sold' },
  cancelled: { icon: XCircle, color: '#ef4444', bgColor: '#7f1d1d', label: 'Cancelled' },
};

export default function HistoryScreen() {
  const { user } = useAuth();
  const { items, loading, stats, refetch } = useItems();
  const [filter, setFilter] = useState<FilterType>('all');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Filter items
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['listed', 'pending_pickup', 'in_transit'].includes(item.status);
    if (filter === 'sold') return item.status === 'sold';
    if (filter === 'cancelled') return item.status === 'cancelled';
    return true;
  });

  // Not logged in
  if (!user) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.emptyContent}>
        <Box className="items-center p-8">
          <Box className="w-20 h-20 bg-slate-800 rounded-full items-center justify-center mb-6">
            <Icon as={Package} size="xl" className="text-slate-500" />
          </Box>
          <Heading size="xl" className="text-white mb-2">Track Your Items</Heading>
          <Text className="text-slate-400 text-center mb-6">
            Sign in to see your liquidation history
          </Text>
          <TouchableOpacity 
            style={styles.signInButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-white font-bold">Sign In</Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Stats Summary */}
      <Box className="px-6 pt-4 pb-2">
        <HStack space="md">
          <Box className="flex-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <HStack className="items-center" space="sm">
              <Icon as={TrendingUp} size="sm" className="text-emerald-400" />
              <Text className="text-slate-400">Earnings</Text>
            </HStack>
            <Heading size="xl" className="text-emerald-400 mt-1">
              ${stats.totalEarnings.toLocaleString()}
            </Heading>
          </Box>
          <Box className="flex-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <HStack className="items-center" space="sm">
              <Icon as={Package} size="sm" className="text-violet-400" />
              <Text className="text-slate-400">Items</Text>
            </HStack>
            <Heading size="xl" className="text-white mt-1">
              {stats.total}
            </Heading>
          </Box>
        </HStack>
      </Box>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {(['all', 'active', 'sold', 'cancelled'] as FilterType[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text className={filter === f ? 'text-white font-semibold' : 'text-slate-400'}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'active' && stats.pending > 0 && (
                <Text className="text-violet-400"> ({stats.pending})</Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Items List */}
      {loading ? (
        <Box className="flex-1 items-center justify-center">
          <Spinner size="large" />
          <Text className="text-slate-400 mt-4">Loading items...</Text>
        </Box>
      ) : filteredItems.length === 0 ? (
        <Box className="flex-1 items-center justify-center p-8">
          <Box className="w-16 h-16 bg-slate-800 rounded-full items-center justify-center mb-4">
            <Icon as={Package} size="lg" className="text-slate-500" />
          </Box>
          <Text className="text-slate-400 text-center">
            {filter === 'all' 
              ? 'No items yet. Start liquidating!' 
              : `No ${filter} items`}
          </Text>
          {filter === 'all' && (
            <TouchableOpacity 
              style={styles.liquidateButton}
              onPress={() => router.push('/(app)/liquidate')}
            >
              <Text className="text-violet-400 font-semibold">Start Liquidating →</Text>
            </TouchableOpacity>
          )}
        </Box>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8b5cf6" />
          }
          renderItem={({ item }) => {
            const config = statusConfig[item.status];
            return (
              <TouchableOpacity style={styles.itemCard}>
                <HStack space="md" className="items-center">
                  {/* Item Image/Placeholder */}
                  <Box className="w-16 h-16 bg-slate-700 rounded-xl items-center justify-center overflow-hidden">
                    {item.photos && item.photos[0] ? (
                      <Box className="w-full h-full bg-slate-600" />
                      // Would use Image component with item.photos[0]
                    ) : (
                      <Icon as={Package} size="md" className="text-slate-500" />
                    )}
                  </Box>

                  {/* Item Details */}
                  <VStack className="flex-1">
                    <Text className="text-white font-semibold" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text className="text-slate-400 text-sm" numberOfLines={1}>
                      {item.brand} {item.model}
                    </Text>
                    <HStack className="items-center mt-1" space="xs">
                      <Box 
                        style={[styles.statusBadge, { backgroundColor: config.bgColor }]}
                      >
                        <Icon as={config.icon} size="xs" color={config.color} />
                        <Text style={{ color: config.color, fontSize: 12, marginLeft: 4 }}>
                          {config.label}
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>

                  {/* Price */}
                  <VStack className="items-end">
                    {item.final_sale_price ? (
                      <Text className="text-emerald-400 font-bold">
                        ${item.final_sale_price.toLocaleString()}
                      </Text>
                    ) : item.estimated_value ? (
                      <Text className="text-slate-300">
                        ~${item.estimated_value.toLocaleString()}
                      </Text>
                    ) : null}
                    <Text className="text-slate-500 text-xs">
                      {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                  </VStack>
                </HStack>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  filterContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#8b5cf6',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  signInButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  liquidateButton: {
    marginTop: 16,
    padding: 12,
  },
});
