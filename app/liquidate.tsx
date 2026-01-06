import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

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

  if (step === 'upload') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerSection}>
            <Text style={styles.headerEmoji}>📸</Text>
            <Text style={styles.headerTitle}>Snap Your Item</Text>
            <Text style={styles.headerSubtitle}>Take 1-3 clear photos and let AI do the rest</Text>
          </View>

          <View style={styles.uploadCard}>
            <View style={styles.uploadPlaceholder}>
              <Text style={styles.uploadEmoji}>📦</Text>
              <Text style={styles.uploadText}>Your item photo will appear here</Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleImageSelect}>
              <Text style={styles.primaryButtonText}>📷 Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              💡 Pro tip: Clean items sell faster. Take photos in good lighting with the item as the main focus.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'analyzing') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <View style={styles.analyzeIcon}>
            <Text style={styles.analyzeEmoji}>🤖</Text>
          </View>

          <Text style={styles.analyzeTitle}>Analyzing Your Item</Text>
          <Text style={styles.analyzeSubtitle}>
            Our AI is identifying your item and calculating its value...
          </Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <ActivityIndicator size="large" color="#8b5cf6" style={{ marginTop: 24 }} />

          <Text style={styles.analyzeNote}>This usually takes 2-3 seconds</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 'results') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.pageTitle}>Your Item's Value</Text>

          {/* AI Results Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>AI Analysis</Text>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Item:</Text>
              <Text style={styles.resultValue}>Nike Air Jordan 1 Retro High</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Condition:</Text>
              <Text style={[styles.resultValue, { color: '#22c55e' }]}>Excellent</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Confidence:</Text>
              <Text style={[styles.resultValue, { color: '#8b5cf6' }]}>94%</Text>
            </View>
          </View>

          {/* Price Card */}
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.priceCard}
          >
            <Text style={styles.priceLabel}>Estimated Value</Text>
            <Text style={styles.priceValue}>$127</Text>
            <Text style={styles.priceRange}>Range: $95 - $165</Text>
          </LinearGradient>

          {/* Floor Price Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Set Your Floor Price</Text>
            <Text style={styles.cardDescription}>
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
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm}>
            <Text style={styles.primaryButtonText}>Continue to Courier →</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'confirm') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerSection}>
            <Text style={styles.headerEmoji}>🚚</Text>
            <Text style={styles.headerTitle}>Ready for Pickup</Text>
          </View>

          {/* Summary Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pickup Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Item Value:</Text>
              <Text style={styles.summaryValue}>$127</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Your Floor Price:</Text>
              <Text style={styles.summaryValue}>${floorPrice}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>LOOP Convenience Fee:</Text>
              <Text style={styles.summaryValue}>$5</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>You'll Receive:</Text>
              <Text style={styles.totalValue}>${(127 - 5).toFixed(0)}</Text>
            </View>
          </View>

          {/* Instructions Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>What Happens Next?</Text>

            <View style={styles.stepRow}>
              <Text style={styles.stepNumber}>1️⃣</Text>
              <Text style={styles.stepText}>Courier arrives within 30 minutes with prepaid shipping box</Text>
            </View>

            <View style={styles.stepRow}>
              <Text style={styles.stepNumber}>2️⃣</Text>
              <Text style={styles.stepText}>Hand over your item (no need to box it yourself)</Text>
            </View>

            <View style={styles.stepRow}>
              <Text style={styles.stepNumber}>3️⃣</Text>
              <Text style={styles.stepText}>Track your item and get paid within 24 hours</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.summonButton} onPress={handleSummonCourier}>
            <Text style={styles.summonButtonText}>🚚 Summon Courier Now</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 24,
  },
  uploadCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  uploadPlaceholder: {
    height: 200,
    backgroundColor: '#334155',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#475569',
    borderStyle: 'dashed',
  },
  uploadEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  uploadText: {
    color: '#64748b',
    fontSize: 16,
  },
  tipCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  tipText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#475569',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  analyzeIcon: {
    width: 100,
    height: 100,
    backgroundColor: '#1e293b',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  analyzeEmoji: {
    fontSize: 48,
  },
  analyzeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 12,
  },
  analyzeSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
  analyzeNote: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  resultLabel: {
    fontSize: 16,
    color: '#94a3b8',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
    flex: 1,
    textAlign: 'right',
  },
  priceCard: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 56,
    fontWeight: '800',
    color: '#ffffff',
  },
  priceRange: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#334155',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#94a3b8',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
  },
  divider: {
    height: 1,
    backgroundColor: '#475569',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#22c55e',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    fontSize: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#94a3b8',
    lineHeight: 24,
  },
  summonButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  summonButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  disclaimer: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
});