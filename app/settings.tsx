import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Switch as RNSwitch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { Switch } from '@/components/ui/switch';

export default function SettingsScreen() {
  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [courierTracking, setCourierTracking] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const SettingRow = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onToggle 
  }: { 
    icon: string; 
    title: string; 
    subtitle?: string; 
    value: boolean; 
    onToggle: (val: boolean) => void;
  }) => (
    <HStack className="justify-between items-center py-4">
      <HStack space="md" className="items-center flex-1">
        <Box className="w-10 h-10 bg-slate-700 rounded-xl items-center justify-center">
          <Text>{icon}</Text>
        </Box>
        <VStack className="flex-1">
          <Text className="text-slate-50">{title}</Text>
          {subtitle && <Text size="sm" className="text-slate-400">{subtitle}</Text>}
        </VStack>
      </HStack>
      <RNSwitch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#475569', true: '#8b5cf6' }}
        thumbColor={value ? '#ffffff' : '#94a3b8'}
      />
    </HStack>
  );

  const NavigationRow = ({ 
    icon, 
    title, 
    subtitle,
    onPress 
  }: { 
    icon: string; 
    title: string; 
    subtitle?: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress}>
      <HStack className="justify-between items-center py-4">
        <HStack space="md" className="items-center flex-1">
          <Box className="w-10 h-10 bg-slate-700 rounded-xl items-center justify-center">
            <Text>{icon}</Text>
          </Box>
          <VStack className="flex-1">
            <Text className="text-slate-50">{title}</Text>
            {subtitle && <Text size="sm" className="text-slate-400">{subtitle}</Text>}
          </VStack>
        </HStack>
        <Text className="text-slate-500">→</Text>
      </HStack>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Notifications Section */}
        <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
          <Heading size="lg" className="text-slate-50 mb-2">Notifications</Heading>
          <Text size="sm" className="text-slate-400 mb-4">
            Control how LOOP communicates with you
          </Text>

          <VStack>
            <SettingRow 
              icon="🔔" 
              title="Push Notifications" 
              subtitle="Alerts for offers and updates"
              value={notifications} 
              onToggle={setNotifications} 
            />
            <Divider className="bg-slate-700" />
            
            <SettingRow 
              icon="📧" 
              title="Email Updates" 
              subtitle="Weekly summaries and tips"
              value={emailUpdates} 
              onToggle={setEmailUpdates} 
            />
            <Divider className="bg-slate-700" />
            
            <SettingRow 
              icon="💰" 
              title="Price Alerts" 
              subtitle="When your items get offers"
              value={priceAlerts} 
              onToggle={setPriceAlerts} 
            />
            <Divider className="bg-slate-700" />
            
            <SettingRow 
              icon="🚚" 
              title="Courier Tracking" 
              subtitle="Real-time pickup updates"
              value={courierTracking} 
              onToggle={setCourierTracking} 
            />
          </VStack>
        </Box>

        {/* Security Section */}
        <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
          <Heading size="lg" className="text-slate-50 mb-2">Security</Heading>
          <Text size="sm" className="text-slate-400 mb-4">
            Keep your account safe
          </Text>

          <VStack>
            <SettingRow 
              icon="🔐" 
              title="Biometric Authentication" 
              subtitle="Face ID or fingerprint"
              value={biometricAuth} 
              onToggle={setBiometricAuth} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="🔑" 
              title="Change Password" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="📱" 
              title="Two-Factor Authentication" 
              subtitle="Add extra security"
              onPress={() => {}} 
            />
          </VStack>
        </Box>

        {/* Appearance Section */}
        <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
          <Heading size="lg" className="text-slate-50 mb-2">Appearance</Heading>
          <Text size="sm" className="text-slate-400 mb-4">
            Customize your experience
          </Text>

          <VStack>
            <SettingRow 
              icon="🌙" 
              title="Dark Mode" 
              subtitle="Easier on the eyes"
              value={darkMode} 
              onToggle={setDarkMode} 
            />
          </VStack>
        </Box>

        {/* Account Section */}
        <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
          <Heading size="lg" className="text-slate-50 mb-2">Account</Heading>
          <Text size="sm" className="text-slate-400 mb-4">
            Manage your account details
          </Text>

          <VStack>
            <NavigationRow 
              icon="👤" 
              title="Edit Profile" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="💳" 
              title="Payment Methods" 
              subtitle="Manage your payout options"
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="📍" 
              title="Pickup Addresses" 
              subtitle="Where couriers pick up items"
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="📊" 
              title="Export Data" 
              subtitle="Download your history"
              onPress={() => {}} 
            />
          </VStack>
        </Box>

        {/* Support Section */}
        <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
          <Heading size="lg" className="text-slate-50 mb-2">Support</Heading>
          
          <VStack>
            <NavigationRow 
              icon="❓" 
              title="Help Center" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="💬" 
              title="Contact Support" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="📜" 
              title="Terms of Service" 
              onPress={() => {}} 
            />
            <Divider className="bg-slate-700" />
            
            <NavigationRow 
              icon="🔒" 
              title="Privacy Policy" 
              onPress={() => {}} 
            />
          </VStack>
        </Box>

        {/* App Info */}
        <Center className="mb-8">
          <Text size="sm" className="text-slate-500">LOOP v1.0.0</Text>
          <Text size="xs" className="text-slate-600 mt-1">Made with 💜 for lazy liquidators</Text>
        </Center>

        {/* Danger Zone */}
        <Box className="bg-red-500/10 rounded-3xl p-6 border border-red-500/30 mb-8">
          <Heading size="md" className="text-red-400 mb-4">Danger Zone</Heading>
          
          <Button 
            size="md"
            variant="outline"
            className="border-red-500/50 rounded-xl"
            onPress={() => {}}
          >
            <ButtonText className="text-red-400">Delete Account</ButtonText>
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
  scrollContent: {
    padding: 24,
  },
});
