import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Divider } from '@/components/ui/divider';

type ItemStatus = 'sold' | 'pending' | 'shipped' | 'cancelled';

interface HistoryItem {
  id: string;
  name: string;
  image: string;
  status: ItemStatus;
  price: number;
  date: string;
  buyer?: string;
}

const mockHistory: HistoryItem[] = [
  { id: '1', name: 'Nike Air Jordan 1 Retro High', image: '👟', status: 'sold', price: 127, date: 'Today', buyer: 'StockX' },
  { id: '2', name: 'MacBook Pro 13" Charger', image: '🔌', status: 'shipped', price: 45, date: 'Yesterday' },
  { id: '3', name: 'Vintage Levi\'s Denim Jacket', image: '🧥', status: 'pending', price: 85, date: '2 days ago' },
  { id: '4', name: 'Sony WH-1000XM4 Headphones', image: '🎧', status: 'sold', price: 189, date: '3 days ago', buyer: 'eBay' },
  { id: '5', name: 'Nintendo Switch Controller', image: '🎮', status: 'sold', price: 42, date: '1 week ago', buyer: 'Facebook' },
  { id: '6', name: 'Patagonia Fleece Pullover', image: '🧷', status: 'cancelled', price: 65, date: '1 week ago' },
  { id: '7', name: 'Apple Watch Series 7', image: '⌚', status: 'sold', price: 275, date: '2 weeks ago', buyer: 'Swappa' },
  { id: '8', name: 'Dyson V11 Vacuum', image: '🧹', status: 'sold', price: 320, date: '3 weeks ago', buyer: 'eBay' },
];

const statusConfig: Record<ItemStatus, { color: string; bgColor: string; label: string }> = {
  sold: { color: 'text-green-400', bgColor: 'bg-green-500/20', label: 'Sold' },
  pending: { color: 'text-amber-400', bgColor: 'bg-amber-500/20', label: 'Pending' },
  shipped: { color: 'text-blue-400', bgColor: 'bg-blue-500/20', label: 'Shipped' },
  cancelled: { color: 'text-red-400', bgColor: 'bg-red-500/20', label: 'Cancelled' },
};

export default function HistoryScreen() {
  const [filter, setFilter] = useState<'all' | ItemStatus>('all');

  const filteredHistory = filter === 'all' 
    ? mockHistory 
    : mockHistory.filter(item => item.status === filter);

  const totalEarnings = mockHistory
    .filter(item => item.status === 'sold')
    .reduce((sum, item) => sum + item.price, 0);

  const FilterChip = ({ label, value }: { label: string; value: 'all' | ItemStatus }) => (
    <TouchableOpacity onPress={() => setFilter(value)}>
      <Box 
        className={`px-4 py-2 rounded-full ${
          filter === value ? 'bg-violet-500' : 'bg-slate-700'
        }`}
      >
        <Text className={filter === value ? 'text-white font-semibold' : 'text-slate-300'}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const status = statusConfig[item.status];
    
    return (
      <Box className="bg-slate-800 rounded-2xl p-4 mb-3 border border-slate-700">
        <HStack className="justify-between items-start">
          <HStack space="md" className="items-center flex-1">
            <Box className="w-14 h-14 bg-slate-700 rounded-xl items-center justify-center">
              <Text size="2xl">{item.image}</Text>
            </Box>
            <VStack className="flex-1">
              <Text className="text-slate-50 font-medium" numberOfLines={1}>
                {item.name}
              </Text>
              <Text size="sm" className="text-slate-400">
                {item.date}
              </Text>
              {item.buyer && (
                <Text size="xs" className="text-slate-500">
                  via {item.buyer}
                </Text>
              )}
            </VStack>
          </HStack>
          
          <VStack className="items-end">
            <Text className={`text-lg font-bold ${item.status === 'sold' ? 'text-green-400' : 'text-slate-50'}`}>
              ${item.price}
            </Text>
            <Badge className={`${status.bgColor} rounded-full px-2 mt-1`}>
              <BadgeText className={status.color}>{status.label}</BadgeText>
            </Badge>
          </VStack>
        </HStack>
      </Box>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <Box className="px-6 pt-4 pb-2">
        <Heading size="2xl" className="text-slate-50 mb-4">History</Heading>
        
        <HStack className="justify-between mb-6">
          <Box className="bg-slate-800 rounded-2xl p-4 flex-1 mr-2 border border-slate-700">
            <Text size="sm" className="text-slate-400">Total Items</Text>
            <Heading size="xl" className="text-violet-400">{mockHistory.length}</Heading>
          </Box>
          <Box className="bg-slate-800 rounded-2xl p-4 flex-1 ml-2 border border-slate-700">
            <Text size="sm" className="text-slate-400">Total Earned</Text>
            <Heading size="xl" className="text-green-400">${totalEarnings}</Heading>
          </Box>
        </HStack>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          <FilterChip label="All" value="all" />
          <FilterChip label="Sold" value="sold" />
          <FilterChip label="Pending" value="pending" />
          <FilterChip label="Shipped" value="shipped" />
          <FilterChip label="Cancelled" value="cancelled" />
        </ScrollView>
      </Box>

      {/* History List */}
      <FlatList
        data={filteredHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Center className="py-12">
            <Text size="4xl" className="mb-4">📦</Text>
            <Text className="text-slate-400">No items found</Text>
          </Center>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  listContent: {
    padding: 24,
    paddingTop: 16,
  },
});
