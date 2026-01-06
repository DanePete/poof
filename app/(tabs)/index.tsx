import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// gluestack-ui components
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Center } from '@/components/ui/center';
import { Button, ButtonText } from '@/components/ui/button';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <Center>
            <Box className="w-20 h-20 bg-white/20 rounded-2xl items-center justify-center mb-6">
              <Text size="4xl">💎</Text>
            </Box>

            <Heading size="4xl" className="text-white text-center">
              Turn Clutter Into
            </Heading>
            <Heading size="4xl" className="text-white text-center">
              Cash Instantly
            </Heading>

            <Text size="lg" className="text-white/90 text-center mt-4 leading-7">
              Snap a photo, get instant value, summon a courier.{'\n'}
              Your lazy consumer dream come true.
            </Text>

            <HStack space="md" className="mt-8">
              <Link href="/liquidate" asChild>
                <Button size="lg" className="bg-white rounded-xl px-6 shadow-lg">
                  <ButtonText className="text-indigo-500 font-bold">🚀 Start Liquidating</ButtonText>
                </Button>
              </Link>

              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 bg-white/15 rounded-xl px-6"
              >
                <ButtonText className="text-white">How it Works</ButtonText>
              </Button>
            </HStack>
          </Center>
        </LinearGradient>

        {/* Features Section */}
        <Box className="bg-slate-800 px-6 py-12 -mt-10 rounded-t-3xl">
          <Heading size="2xl" className="text-slate-50 text-center mb-8">
            Why LOOP?
          </Heading>

          <VStack space="md">
            {/* Feature 1 */}
            <Box className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
              <Box className="w-14 h-14 rounded-2xl bg-sky-100 items-center justify-center mb-4">
                <Text size="2xl">📸</Text>
              </Box>
              <Heading size="lg" className="text-slate-50 mb-2">
                One Photo = Instant Value
              </Heading>
              <Text className="text-slate-400 leading-6">
                AI analyzes your item in seconds. No listings, no haggling, no waiting.
              </Text>
            </Box>

            {/* Feature 2 */}
            <Box className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
              <Box className="w-14 h-14 rounded-2xl bg-green-100 items-center justify-center mb-4">
                <Text size="2xl">🚚</Text>
              </Box>
              <Heading size="lg" className="text-slate-50 mb-2">
                Courier Comes to You
              </Heading>
              <Text className="text-slate-400 leading-6">
                Professional pickup with prepaid shipping. Just hand over your item.
              </Text>
            </Box>

            {/* Feature 3 */}
            <Box className="bg-slate-700 rounded-2xl p-6 border border-slate-600">
              <Box className="w-14 h-14 rounded-2xl bg-amber-100 items-center justify-center mb-4">
                <Text size="2xl">💰</Text>
              </Box>
              <Heading size="lg" className="text-slate-50 mb-2">
                Get Paid Fast
              </Heading>
              <Text className="text-slate-400 leading-6">
                Money hits your account within 24 hours. Track everything in real-time.
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Stats Section */}
        <Box className="bg-slate-900 px-6 py-12">
          <Heading size="xl" className="text-slate-50 text-center mb-8">
            Trusted by Thousands
          </Heading>

          <HStack className="justify-around flex-wrap gap-6">
            <VStack className="items-center">
              <Heading size="3xl" className="text-violet-500">50K+</Heading>
              <Text size="sm" className="text-slate-500 mt-1">Items Liquidated</Text>
            </VStack>

            <VStack className="items-center">
              <Heading size="3xl" className="text-green-500">$2M+</Heading>
              <Text size="sm" className="text-slate-500 mt-1">Paid to Users</Text>
            </VStack>

            <VStack className="items-center">
              <Heading size="3xl" className="text-amber-500">4.9⭐</Heading>
              <Text size="sm" className="text-slate-500 mt-1">User Rating</Text>
            </VStack>
          </HStack>
        </Box>

        {/* CTA Section */}
        <Box className="px-6 py-6">
          <Box className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
            <Center>
              <Heading size="2xl" className="text-slate-50 text-center mb-3">
                Ready to Declutter?
              </Heading>
              <Text className="text-slate-400 text-center leading-6 mb-6">
                Join thousands who have turned their closets into cash.{'\n'}
                Download LOOP today and start liquidating.
              </Text>

              <Link href="/liquidate" asChild>
                <Button 
                  size="lg" 
                  className="bg-violet-500 rounded-xl px-8 shadow-lg"
                >
                  <ButtonText className="text-white font-bold text-lg">
                    Get Started Now →
                  </ButtonText>
                </Button>
              </Link>
            </Center>
          </Box>
        </Box>

        {/* Footer spacing */}
        <Box className="h-10" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 80,
  },
});
