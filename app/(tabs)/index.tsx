import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Card, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6', '#a855f7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>💎</Text>
            </View>

            <Text style={styles.heroTitle}>Turn Clutter Into</Text>
            <Text style={styles.heroTitle}>Cash Instantly</Text>

            <Text style={styles.heroSubtitle}>
              Snap a photo, get instant value, summon a courier.{'\n'}
              Your lazy consumer dream come true.
            </Text>

            <View style={styles.buttonRow}>
              <Link href="/liquidate" asChild>
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>🚀 Start Liquidating</Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>How it Works</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why LOOP?</Text>

          <View style={styles.featureCards}>
            {/* Feature 1 */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#e0f2fe' }]}>
                <Text style={styles.featureEmoji}>📸</Text>
              </View>
              <Text style={styles.featureTitle}>One Photo = Instant Value</Text>
              <Text style={styles.featureDescription}>
                AI analyzes your item in seconds. No listings, no haggling, no waiting.
              </Text>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#dcfce7' }]}>
                <Text style={styles.featureEmoji}>🚚</Text>
              </View>
              <Text style={styles.featureTitle}>Courier Comes to You</Text>
              <Text style={styles.featureDescription}>
                Professional pickup with prepaid shipping. Just hand over your item.
              </Text>
            </View>

            {/* Feature 3 */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#fef3c7' }]}>
                <Text style={styles.featureEmoji}>💰</Text>
              </View>
              <Text style={styles.featureTitle}>Get Paid Fast</Text>
              <Text style={styles.featureDescription}>
                Money hits your account within 24 hours. Track everything in real-time.
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Trusted by Thousands</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Items Liquidated</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#22c55e' }]}>$2M+</Text>
              <Text style={styles.statLabel}>Paid to Users</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: '#f59e0b' }]}>4.9⭐</Text>
              <Text style={styles.statLabel}>User Rating</Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Declutter?</Text>
            <Text style={styles.ctaDescription}>
              Join thousands who've turned their closets into cash.{'\n'}
              Download LOOP today and start liquidating.
            </Text>

            <Link href="/liquidate" asChild>
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Get Started Now →</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Footer spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 80,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 26,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 24,
    paddingVertical: 48,
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 32,
  },
  featureCards: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#334155',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#475569',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureEmoji: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    color: '#94a3b8',
    lineHeight: 24,
  },
  statsSection: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#8b5cf6',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  ctaCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});