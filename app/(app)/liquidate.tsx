import React, { useState } from 'react';
import { TouchableOpacity, Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TextInput } from 'react-native-paper';
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

export default function LiquidateScreen() {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'results' | 'confirm'>('upload');
  const [selectedImage, setSelectedImage] = useState(null);
  const [floorPrice, setFloorPrice] = useState('');

  const handleImageSelect = () => {
    setSelectedImage('mock-image');
    setStep('analyzing');
    setTimeout(() => {
      setStep('results');
    }, 2000);
  };

  const handleConfirm = () => {
    if (!floorPrice.trim()) {
      Alert.alert('Floor Price Required', 'Please set a minimum price you\'re willing to accept.');
      return;
    }
    setStep('confirm');
  };

  const handleSummonCourier = () => {
    Alert.alert(
      'Courier Summoned! 🚚',
      'A LOOP courier will arrive within 30 minutes with your prepaid shipping box. Just hand over the item!',
      [{ text: 'Got it!', onPress: () => router.back() }]
    );
  };

  // Upload Step
  if (step === 'upload') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Center className="mb-8">
            <Text size="5xl" className="mb-4">📸</Text>
            <Heading size="2xl" className="text-slate-50 text-center">
              Snap Your Item
            </Heading>
            <Text className="text-slate-400 text-center mt-2">
              Take 1-3 clear photos and let AI do the rest
            </Text>
          </Center>

          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
            <Box className="h-52 bg-slate-700 rounded-2xl items-center justify-center mb-6 border-2 border-dashed border-slate-500">
              <Text size="4xl" className="mb-3">📦</Text>
              <Text className="text-slate-500">Your item photo will appear here</Text>
            </Box>

            <Button 
              size="lg"
              className="bg-violet-500 rounded-2xl mb-3 shadow-lg"
              onPress={handleImageSelect}
            >
              <ButtonText className="text-white font-bold text-lg">📷 Take Photo</ButtonText>
            </Button>

            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-slate-600 rounded-2xl"
            >
              <ButtonText className="text-slate-400">Choose from Gallery</ButtonText>
            </Button>
          </Box>

          <Box className="bg-slate-800 rounded-2xl p-5 border-l-4 border-l-violet-500">
            <Text className="text-slate-400 leading-6">
              💡 Pro tip: Clean items sell faster. Take photos in good lighting with the item as the main focus.
            </Text>
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Analyzing Step
  if (step === 'analyzing') {
    return (
      <SafeAreaView style={styles.container}>
        <Center style={styles.centerContent}>
          <Box className="w-24 h-24 bg-slate-800 rounded-full items-center justify-center mb-6 border-2 border-violet-500">
            <Text size="4xl">🤖</Text>
          </Box>

          <Heading size="xl" className="text-slate-50 text-center mb-3">
            Analyzing Your Item
          </Heading>
          <Text className="text-slate-400 text-center mb-8">
            Our AI is identifying your item and calculating its value...
          </Text>

          <Box className="w-4/5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <Box className="w-3/4 h-full bg-violet-500 rounded-full" />
          </Box>

          <ActivityIndicator size="large" color="#8b5cf6" style={{ marginTop: 24 }} />

          <Text size="sm" className="text-slate-500 mt-6">
            This usually takes 2-3 seconds
          </Text>
        </Center>
      </SafeAreaView>
    );
  }

  // Results Step
  if (step === 'results') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Heading size="2xl" className="text-slate-50 text-center mb-6">
            Your Item's Value
          </Heading>

          {/* AI Results Card */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-4">
            <HStack className="items-center justify-between mb-4">
              <Heading size="lg" className="text-slate-50">AI Analysis</Heading>
              <Badge className="bg-green-500/20 rounded-full px-3">
                <BadgeText className="text-green-400">94% Confidence</BadgeText>
              </Badge>
            </HStack>

            <VStack space="sm" className="divide-y divide-slate-700">
              <HStack className="justify-between py-3">
                <Text className="text-slate-400">Item:</Text>
                <Text className="text-slate-50 font-semibold">Nike Air Jordan 1 Retro High</Text>
              </HStack>

              <HStack className="justify-between py-3">
                <Text className="text-slate-400">Condition:</Text>
                <Text className="text-green-400 font-semibold">Excellent</Text>
              </HStack>

              <HStack className="justify-between py-3">
                <Text className="text-slate-400">Category:</Text>
                <Text className="text-slate-50 font-semibold">Sneakers</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Price Card */}
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.priceCard}
          >
            <Text className="text-white/80 mb-2">Estimated Value</Text>
            <Heading size="5xl" className="text-white">$127</Heading>
            <Text className="text-white/70 mt-2">Range: $95 - $165</Text>
          </LinearGradient>

          {/* Floor Price Card */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-4">
            <Heading size="lg" className="text-slate-50 mb-2">Set Your Floor Price</Heading>
            <Text className="text-slate-400 mb-4">
              What's the minimum amount you're willing to accept?
            </Text>

            <TextInput
              mode="outlined"
              label="Minimum Price"
              placeholder="e.g., $80"
              value={floorPrice}
              onChangeText={setFloorPrice}
              keyboardType="decimal-pad"
              style={styles.input}
              outlineColor="#475569"
              activeOutlineColor="#8b5cf6"
              textColor="#f8fafc"
              theme={{ colors: { onSurfaceVariant: '#94a3b8' } }}
            />
          </Box>

          <Button 
            size="lg"
            className="bg-violet-500 rounded-2xl shadow-lg"
            onPress={handleConfirm}
          >
            <ButtonText className="text-white font-bold text-lg">Continue to Courier →</ButtonText>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Confirm Step
  if (step === 'confirm') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Center className="mb-8">
            <Text size="5xl" className="mb-4">🚚</Text>
            <Heading size="2xl" className="text-slate-50 text-center">
              Ready for Pickup
            </Heading>
          </Center>

          {/* Summary Card */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-4">
            <Heading size="lg" className="text-slate-50 mb-4">Pickup Summary</Heading>

            <VStack space="sm">
              <HStack className="justify-between py-2">
                <Text className="text-slate-400">Item Value:</Text>
                <Text className="text-slate-50 font-semibold">$127</Text>
              </HStack>

              <HStack className="justify-between py-2">
                <Text className="text-slate-400">Your Floor Price:</Text>
                <Text className="text-slate-50 font-semibold">${floorPrice}</Text>
              </HStack>

              <HStack className="justify-between py-2">
                <Text className="text-slate-400">LOOP Convenience Fee:</Text>
                <Text className="text-slate-50 font-semibold">$5</Text>
              </HStack>

              <Divider className="bg-slate-600 my-3" />

              <HStack className="justify-between py-2">
                <Text className="text-slate-50 font-bold text-lg">You'll Receive:</Text>
                <Text className="text-green-400 font-bold text-2xl">${(127 - 5).toFixed(0)}</Text>
              </HStack>
            </VStack>
          </Box>

          {/* Instructions Card */}
          <Box className="bg-slate-800 rounded-3xl p-6 border border-slate-700 mb-6">
            <Heading size="lg" className="text-slate-50 mb-4">What Happens Next?</Heading>

            <VStack space="md">
              <HStack space="md" className="items-start">
                <Text size="xl">1️⃣</Text>
                <Text className="text-slate-400 flex-1 leading-6">
                  Courier arrives within 30 minutes with prepaid shipping box
                </Text>
              </HStack>

              <HStack space="md" className="items-start">
                <Text size="xl">2️⃣</Text>
                <Text className="text-slate-400 flex-1 leading-6">
                  Hand over your item (no need to box it yourself)
                </Text>
              </HStack>

              <HStack space="md" className="items-start">
                <Text size="xl">3️⃣</Text>
                <Text className="text-slate-400 flex-1 leading-6">
                  Track your item and get paid within 24 hours
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Button 
            size="xl"
            className="bg-green-500 rounded-2xl shadow-lg mb-4"
            onPress={handleSummonCourier}
          >
            <ButtonText className="text-white font-bold text-xl">🚚 Summon Courier Now</ButtonText>
          </Button>

          <Text size="sm" className="text-slate-500 text-center leading-6">
            By summoning a courier, you agree to LOOP's terms of service.{'\n'}
            Payment will be processed after successful delivery.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  centerContent: {
    flex: 1,
    padding: 24,
  },
  priceCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#334155',
  },
});
