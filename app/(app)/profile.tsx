import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';

// gluestack-ui components
import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Camera, MapPin, Star } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { profile, loading, updateProfile, refetch } = useProfile();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile(formData);
    setSaving(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    }
  };

  if (!user) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.centerContent}>
        <Box className="items-center p-8">
          <Heading size="xl" className="text-white mb-4">Not Signed In</Heading>
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

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Spinner size="large" />
        <Text className="text-slate-400 mt-4">Loading profile...</Text>
      </View>
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
        <Box className="relative mb-4">
          <Avatar size="2xl" className="bg-violet-500">
            {profile?.avatar_url ? (
              <AvatarImage source={{ uri: profile.avatar_url }} alt="Profile" />
            ) : (
              <AvatarFallbackText className="text-white text-3xl">{initials}</AvatarFallbackText>
            )}
          </Avatar>
          <TouchableOpacity style={styles.cameraButton}>
            <Icon as={Camera} size="sm" className="text-white" />
          </TouchableOpacity>
        </Box>

        {/* Rating */}
        <HStack space="xs" className="items-center mb-2">
          <Icon as={Star} size="sm" className="text-yellow-400" />
          <Text className="text-white font-semibold">
            {profile?.average_rating?.toFixed(1) || '5.0'}
          </Text>
          <Text className="text-slate-400">rating</Text>
        </HStack>
      </Box>

      {/* Stats Row */}
      <HStack space="md" className="mb-8">
        <Box className="flex-1 bg-slate-800 p-4 rounded-2xl border border-slate-700 items-center">
          <Heading size="xl" className="text-white">
            {profile?.total_items_sold || 0}
          </Heading>
          <Text className="text-slate-400">Items Sold</Text>
        </Box>
        <Box className="flex-1 bg-slate-800 p-4 rounded-2xl border border-slate-700 items-center">
          <Heading size="xl" className="text-emerald-400">
            ${(profile?.total_earnings || 0).toLocaleString()}
          </Heading>
          <Text className="text-slate-400">Earnings</Text>
        </Box>
      </HStack>

      <Divider className="bg-slate-800 mb-6" />

      {/* Profile Form */}
      <Box className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <HStack className="justify-between items-center mb-4">
          <Heading size="lg" className="text-white">Profile Info</Heading>
          {!editing && (
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Text className="text-violet-400 font-semibold">Edit</Text>
            </TouchableOpacity>
          )}
        </HStack>

        <VStack space="md">
          <TextInput
            mode="outlined"
            label="Full Name"
            value={formData.full_name}
            onChangeText={(text) => setFormData({ ...formData, full_name: text })}
            style={styles.input}
            outlineColor="#475569"
            activeOutlineColor="#8b5cf6"
            textColor="#f8fafc"
            theme={{ colors: { onSurfaceVariant: '#94a3b8' } }}
            editable={editing}
            disabled={!editing}
          />

          <TextInput
            mode="outlined"
            label="Email"
            value={user.email || ''}
            style={styles.input}
            outlineColor="#475569"
            textColor="#94a3b8"
            theme={{ colors: { onSurfaceVariant: '#94a3b8' } }}
            editable={false}
            disabled
          />

          <TextInput
            mode="outlined"
            label="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            style={styles.input}
            outlineColor="#475569"
            activeOutlineColor="#8b5cf6"
            textColor="#f8fafc"
            theme={{ colors: { onSurfaceVariant: '#94a3b8' } }}
            editable={editing}
            disabled={!editing}
          />

          {editing && (
            <HStack space="md" className="mt-4">
              <Button 
                variant="outline"
                className="flex-1 border-slate-600"
                onPress={() => {
                  setEditing(false);
                  setFormData({
                    full_name: profile?.full_name || '',
                    phone: profile?.phone || '',
                  });
                }}
              >
                <ButtonText className="text-slate-300">Cancel</ButtonText>
              </Button>
              <Button 
                className="flex-1 bg-violet-500"
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Spinner color="white" size="small" />
                ) : (
                  <ButtonText className="text-white font-bold">Save</ButtonText>
                )}
              </Button>
            </HStack>
          )}
        </VStack>
      </Box>

      {/* Addresses Section */}
      <Box className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <HStack className="justify-between items-center mb-4">
          <Heading size="lg" className="text-white">Pickup Addresses</Heading>
          <TouchableOpacity>
            <Text className="text-violet-400 font-semibold">+ Add</Text>
          </TouchableOpacity>
        </HStack>

        <Box className="bg-slate-700/50 p-4 rounded-xl border border-dashed border-slate-600">
          <HStack space="md" className="items-center">
            <Box className="w-10 h-10 bg-slate-600 rounded-lg items-center justify-center">
              <Icon as={MapPin} size="sm" className="text-slate-400" />
            </Box>
            <Text className="text-slate-400 flex-1">
              No addresses saved yet.{'\n'}Add one for faster pickups.
            </Text>
          </HStack>
        </Box>
      </Box>

      {/* Member Since */}
      <Text className="text-slate-500 text-center mb-8">
        Member since {profile?.created_at 
          ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          : 'Unknown'}
      </Text>
    </ScrollView>
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
  centerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8b5cf6',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#0f172a',
  },
  input: {
    backgroundColor: '#334155',
  },
  signInButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
