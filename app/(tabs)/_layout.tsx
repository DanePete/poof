import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';

export default function TabLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <Header 
        title="LOOP" 
        onMenuPress={() => setIsDrawerOpen(true)} 
      />

      {/* Tab Navigator */}
      <View style={styles.tabContainer}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#8b5cf6',
            tabBarInactiveTintColor: '#64748b',
            tabBarStyle: {
              backgroundColor: '#0f172a',
              borderTopColor: '#1e293b',
              borderTopWidth: 1,
              paddingTop: 8,
              paddingBottom: 8,
              height: 70,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
            headerShown: false,
            tabBarButton: HapticTab,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ focused }) => (
                <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.7 }}>🏠</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: 'Explore',
              tabBarIcon: ({ focused }) => (
                <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.7 }}>🔍</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: 'History',
              tabBarIcon: ({ focused }) => (
                <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.7 }}>📦</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="account"
            options={{
              title: 'Account',
              tabBarIcon: ({ focused }) => (
                <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.7 }}>👤</Text>
              ),
            }}
          />
        </Tabs>
      </View>

      {/* Drawer Menu Overlay */}
      <DrawerMenu 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  tabContainer: {
    flex: 1,
  },
});
