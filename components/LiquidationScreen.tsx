import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import from our existing components
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

// Types (matching our database schema)
interface AIAnalysis {
  category: string;
  brand?: string;
  model?: string;
  condition: string;
  confidence: number;
  seoTitle?: string;
  description?: string;
  tags: string[];
  estimatedValue: {
    low: number;
    mid: number;
    high: number;
    currency: string;
  };
}

interface Item {
  id: string;
  photos: string[];
  aiAnalysis: AIAnalysis;
  status: string;
  floorPrice?: number;
}

interface LiquidationScreenProps {
  item: Item;
  onSummonCourier: (itemId: string) => Promise<void>;
  onSetFloorPrice: (itemId: string, price: number) => Promise<void>;
  onCancel: () => void;
}

export function LiquidationScreen({
  item,
  onSummonCourier,
  onSetFloorPrice,
  onCancel,
}: LiquidationScreenProps) {
  const [isSummoning, setIsSummoning] = useState(false);
  const [floorPrice, setFloorPrice] = useState(item.floorPrice?.toString() || '');
  const [showPriceInput, setShowPriceInput] = useState(false);

  const analysis = item.aiAnalysis;
  const mainPhoto = item.photos[0];

  const handleSummonCourier = async () => {
    // Confirm with user
    Alert.alert(
      'Summon Courier?',
      `A courier will arrive to pick up your ${analysis.brand || ''} ${analysis.model || 'item'} for liquidation. Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Summon',
          onPress: async () => {
            setIsSummoning(true);
            try {
              await onSummonCourier(item.id);
              Alert.alert('Success!', 'Courier has been dispatched and will arrive shortly.');
            } catch (error) {
              Alert.alert('Error', 'Failed to summon courier. Please try again.');
            } finally {
              setIsSummoning(false);
            }
          },
        },
      ]
    );
  };

  const handleSetFloorPrice = async () => {
    const price = parseFloat(floorPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid minimum price.');
      return;
    }

    try {
      await onSetFloorPrice(item.id, price);
      setShowPriceInput(false);
      Alert.alert('Success', `Floor price set to $${price.toFixed(2)}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update floor price.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Ready to Liquidate</Text>
        </View>

        {/* Main Photo */}
        <View style={styles.photoContainer}>
          <Image source={{ uri: mainPhoto }} style={styles.mainPhoto} />
          <View style={styles.photoCount}>
            <Text style={styles.photoCountText}>{item.photos.length}</Text>
          </View>
        </View>

        {/* AI Analysis Results */}
        <ThemedView style={styles.analysisCard}>
          <Text style={styles.sectionTitle}>AI Analysis</Text>

          <View style={styles.analysisRow}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>{analysis.category}</Text>
          </View>

          {(analysis.brand || analysis.model) && (
            <View style={styles.analysisRow}>
              <Text style={styles.label}>Item:</Text>
              <Text style={styles.value}>
                {analysis.brand || 'Unknown Brand'} {analysis.model || ''}
              </Text>
            </View>
          )}

          <View style={styles.analysisRow}>
            <Text style={styles.label}>Condition:</Text>
            <Text style={styles.value}>{analysis.condition.replace('_', ' ')}</Text>
          </View>

          <View style={styles.analysisRow}>
            <Text style={styles.label}>Confidence:</Text>
            <Text style={styles.value}>{Math.round(analysis.confidence * 100)}%</Text>
          </View>
        </ThemedView>

        {/* Value Estimate */}
        <ThemedView style={styles.valueCard}>
          <Text style={styles.sectionTitle}>Estimated Value</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.mainPrice}>${analysis.estimatedValue.mid.toFixed(2)}</Text>
            <Text style={styles.currency}>USD</Text>
          </View>

          <Text style={styles.priceRange}>
            Range: ${analysis.estimatedValue.low.toFixed(2)} - ${analysis.estimatedValue.high.toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.floorPriceButton}
            onPress={() => setShowPriceInput(!showPriceInput)}
          >
            <Text style={styles.floorPriceButtonText}>
              {item.floorPrice ? `Floor Price: $${item.floorPrice}` : 'Set Minimum Price'}
            </Text>
          </TouchableOpacity>

          {showPriceInput && (
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceInput}
                value={floorPrice}
                onChangeText={setFloorPrice}
                placeholder="Enter minimum price"
                keyboardType="decimal-pad"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSetFloorPrice}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </ThemedView>

        {/* SEO Title & Description */}
        {analysis.seoTitle && (
          <ThemedView style={styles.listingCard}>
            <Text style={styles.sectionTitle}>Listing Preview</Text>
            <Text style={styles.seoTitle}>{analysis.seoTitle}</Text>
            {analysis.description && (
              <Text style={styles.description}>{analysis.description}</Text>
            )}
          </ThemedView>
        )}

        {/* Tags */}
        {analysis.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {analysis.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.summonButton, isSummoning && styles.summonButtonDisabled]}
          onPress={handleSummonCourier}
          disabled={isSummoning}
        >
          {isSummoning ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.summonButtonText}>🚚 Summon Courier</Text>
              <Text style={styles.summonSubtext}>
                Courier arrives with box • $5 convenience fee
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  photoContainer: {
    position: 'relative',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainPhoto: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  photoCount: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  photoCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  analysisCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  valueCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  listingCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginVertical: 16,
  },
  mainPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  currency: {
    fontSize: 18,
    color: '#666',
    marginLeft: 4,
  },
  priceRange: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
  },
  floorPriceButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  floorPriceButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  priceInputContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  seoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
    marginTop: 0,
    gap: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summonButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summonButtonDisabled: {
    backgroundColor: '#ccc',
  },
  summonButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summonSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
    marginTop: 4,
  },
});