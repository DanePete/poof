import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { router } from 'expo-router';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { Divider } from '@/components/ui/divider';
import { Icon } from '@/components/ui/icon';

import { useAuth } from '@/contexts/AuthContext';
import { 
  Bell, 
  Moon, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  FileText,
  ChevronRight,
  Mail,
  Trash2,
  LogOut,
  Smartphone,
  Globe,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  
  // Settings state (would be stored in user preferences in production)
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: signOut
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Would call Supabase to delete account
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            signOut();
          }
        },
      ]
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Notifications Section */}
      <Box className="mb-6">
        <Text className="text-slate-500 uppercase text-xs mb-3 px-2">Notifications</Text>
        <Box className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <SettingRow
            icon={Bell}
            label="Push Notifications"
            description="Get alerts for offers and updates"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#475569', true: '#8b5cf6' }}
              />
            }
          />
          <Divider className="bg-slate-700" />
          <SettingRow
            icon={Mail}
            label="Email Notifications"
            description="Weekly summaries and offers"
            rightElement={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#475569', true: '#8b5cf6' }}
              />
            }
          />
        </Box>
      </Box>

      {/* Appearance Section */}
      <Box className="mb-6">
        <Text className="text-slate-500 uppercase text-xs mb-3 px-2">Appearance</Text>
        <Box className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <SettingRow
            icon={Moon}
            label="Dark Mode"
            description="Always use dark theme"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#475569', true: '#8b5cf6' }}
              />
            }
          />
        </Box>
      </Box>

      {/* Security Section */}
      <Box className="mb-6">
        <Text className="text-slate-500 uppercase text-xs mb-3 px-2">Security</Text>
        <Box className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <SettingRow
            icon={Smartphone}
            label="Biometric Login"
            description="Use Face ID or Touch ID"
            rightElement={
              <Switch
                value={biometrics}
                onValueChange={setBiometrics}
                trackColor={{ false: '#475569', true: '#8b5cf6' }}
              />
            }
          />
          <Divider className="bg-slate-700" />
          <TouchableOpacity>
            <SettingRow
              icon={Shield}
              label="Change Password"
              showChevron
            />
          </TouchableOpacity>
        </Box>
      </Box>

      {/* Payments Section */}
      <Box className="mb-6">
        <Text className="text-slate-500 uppercase text-xs mb-3 px-2">Payments</Text>
        <Box className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <TouchableOpacity>
            <SettingRow
              icon={CreditCard}
              label="Payment Methods"
              description="Add or remove payment options"
              showChevron
            />
          </TouchableOpacity>
          <Divider className="bg-slate-700" />
          <TouchableOpacity>
            <SettingRow
              icon={CreditCard}
              label="Payout Account"
              description="Where you receive earnings"
              showChevron
            />
          </TouchableOpacity>
        </Box>
      </Box>

      {/* Support Section */}
      <Box className="mb-6">
        <Text className="text-slate-500 uppercase text-xs mb-3 px-2">Support</Text>
        <Box className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <TouchableOpacity onPress={() => Linking.openURL('https://loop.app/help')}>
            <SettingRow
              icon={HelpCircle}
              label="Help Center"
              showChevron
            />
          </TouchableOpacity>
          <Divider className="bg-slate-700" />
          <TouchableOpacity onPress={() => Linking.openURL('https://loop.app/terms')}>
            <SettingRow
              icon={FileText}
              label="Terms of Service"
              showChevron
            />
          </TouchableOpacity>
          <Divider className="bg-slate-700" />
          <TouchableOpacity onPress={() => Linking.openURL('https://loop.app/privacy')}>
            <SettingRow
              icon={Globe}
              label="Privacy Policy"
              showChevron
            />
          </TouchableOpacity>
        </Box>
      </Box>

      {/* Account Actions */}
      {user && (
        <Box className="mb-6">
          <Text className="text-slate-500 uppercase text-xs mb-3 px-2">Account</Text>
          <Box className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <TouchableOpacity onPress={handleSignOut}>
              <SettingRow
                icon={LogOut}
                label="Sign Out"
                labelColor="#f87171"
                iconColor="#f87171"
              />
            </TouchableOpacity>
            <Divider className="bg-slate-700" />
            <TouchableOpacity onPress={handleDeleteAccount}>
              <SettingRow
                icon={Trash2}
                label="Delete Account"
                labelColor="#ef4444"
                iconColor="#ef4444"
              />
            </TouchableOpacity>
          </Box>
        </Box>
      )}

      {/* App Info */}
      <Box className="items-center py-8">
        <Box className="w-16 h-16 bg-violet-500/20 rounded-2xl items-center justify-center mb-4">
          <Text size="3xl">💎</Text>
        </Box>
        <Heading size="lg" className="text-white">LOOP</Heading>
        <Text className="text-slate-500">Version 1.0.0 (Build 1)</Text>
        <Text className="text-slate-600 text-xs mt-2">
          © 2024 LOOP Inc. All rights reserved.
        </Text>
      </Box>
    </ScrollView>
  );
}

interface SettingRowProps {
  icon: any;
  label: string;
  description?: string;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  labelColor?: string;
  iconColor?: string;
}

function SettingRow({ 
  icon: ItemIcon, 
  label, 
  description, 
  rightElement, 
  showChevron,
  labelColor = '#f8fafc',
  iconColor = '#8b5cf6',
}: SettingRowProps) {
  return (
    <Box className="p-4">
      <HStack className="items-center justify-between">
        <HStack space="md" className="items-center flex-1">
          <Box className="w-10 h-10 bg-slate-700 rounded-xl items-center justify-center">
            <Icon as={ItemIcon} size="sm" color={iconColor} />
          </Box>
          <VStack className="flex-1">
            <Text style={{ color: labelColor }} className="font-medium">{label}</Text>
            {description && (
              <Text className="text-slate-400 text-sm">{description}</Text>
            )}
          </VStack>
        </HStack>
        {rightElement}
        {showChevron && (
          <Icon as={ChevronRight} size="sm" className="text-slate-500" />
        )}
      </HStack>
    </Box>
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
});
