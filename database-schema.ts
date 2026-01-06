/**
 * LOOP - Instant Asset Liquidator Database Schema
 *
 * Designed for Firebase Firestore / Supabase PostgreSQL
 * Supports real-time updates and cross-platform data sync
 */

export interface DatabaseSchema {
  // Core Collections/Tables
  users: User;
  items: Item;
  item_listings: ItemListing;
  price_history: PriceHistory;
  negotiations: Negotiation;
  courier_jobs: CourierJob;
  transactions: Transaction;
}

// ============================================================================
// USER MANAGEMENT
// ============================================================================

export interface User {
  id: string; // Firebase UID or UUID

  // Profile
  email: string;
  displayName: string;
  phoneNumber?: string;
  avatarUrl?: string;

  // Addresses for pickup/delivery
  addresses: Address[];

  // Payment & Payout
  stripeCustomerId?: string; // For receiving payments
  defaultAddressId?: string;

  // App preferences
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };

  // Analytics
  totalItemsLiquidated: number;
  totalEarnings: number;
  averageSaleTime: number; // in hours

  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  instructions?: string; // "Ring doorbell twice"
}

// ============================================================================
// ITEM MANAGEMENT
// ============================================================================

export interface Item {
  id: string;

  // Ownership
  userId: string;
  userAddressId: string; // Where to pick up from

  // AI Identification Results
  aiAnalysis: AIAnalysis;

  // Photos (Firebase Storage references)
  photos: string[]; // Array of storage URLs

  // Status Flow: identified -> listed -> sold -> picked_up -> delivered
  status: ItemStatus;
  statusUpdatedAt: Date;

  // User-set preferences
  floorPrice?: number; // Minimum acceptable price
  notes?: string; // User notes about the item

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface AIAnalysis {
  category: string; // "Men's Sneakers", "Electronics", etc.
  brand?: string;
  model?: string;
  condition: ItemCondition;
  confidence: number; // 0-1, how confident AI is

  // AI-generated content for listings
  seoTitle?: string;
  description?: string;
  tags: string[];

  // Initial price estimate
  estimatedValue: {
    low: number;
    mid: number;
    high: number;
    currency: string;
    source: 'ai' | 'market_data';
  };
}

export type ItemStatus =
  | 'identified'      // AI has analyzed photos
  | 'listed'          // Posted to marketplaces
  | 'sold'            // Sale confirmed
  | 'pickup_scheduled' // Courier en route
  | 'picked_up'       // Item collected
  | 'shipped'         // Sent to buyer
  | 'delivered'       // Completed transaction
  | 'cancelled';

export type ItemCondition =
  | 'new_with_tags'
  | 'new_without_tags'
  | 'excellent'
  | 'good'
  | 'fair'
  | 'poor';

// ============================================================================
// MARKETPLACE INTEGRATION
// ============================================================================

export interface ItemListing {
  id: string;

  // Relationships
  itemId: string;
  userId: string;

  // Marketplace details
  marketplace: MarketplaceType;
  externalListingId: string; // eBay item ID, Facebook post ID, etc.
  externalUrl: string;

  // Pricing & Negotiation
  askingPrice: number;
  floorPrice: number; // From item.floorPrice
  currency: string;

  // Status
  status: ListingStatus; // active, sold, ended, paused
  listedAt: Date;
  endsAt?: Date; // For auctions

  // Analytics
  views: number;
  favorites: number;
  messages: number;

  createdAt: Date;
  updatedAt: Date;
}

export type MarketplaceType =
  | 'ebay'
  | 'facebook_marketplace'
  | 'mercari'
  | 'poshmark'
  | 'depop'
  | 'craigslist';

export type ListingStatus =
  | 'draft'      // Created but not posted
  | 'posting'    // Being posted to marketplace
  | 'active'     // Live on marketplace
  | 'sold'       // Sale confirmed
  | 'ended'      // Listing ended without sale
  | 'paused'     // Temporarily paused
  | 'removed';   // Taken down

// ============================================================================
// PRICE TRACKING
// ============================================================================

export interface PriceHistory {
  id: string;

  // What this price is for
  itemId: string;
  listingId?: string; // If from a specific listing

  // Price data
  price: number;
  currency: string;

  // Source information
  source: PriceSource;
  marketplace?: MarketplaceType;
  externalItemId?: string; // Reference to similar items

  // Context
  condition?: ItemCondition;
  location?: string; // Geographic context
  saleType: 'auction' | 'fixed' | 'estimate';

  // Metadata
  timestamp: Date;
  confidence?: number; // How reliable this data point is
}

export type PriceSource =
  | 'ai_estimate'
  | 'marketplace_sold'
  | 'marketplace_active'
  | 'comparable_sale'
  | 'user_input';

// ============================================================================
// AI NEGOTIATION SYSTEM
// ============================================================================

export interface Negotiation {
  id: string;

  // Relationships
  listingId: string;
  itemId: string;
  userId: string;

  // Conversation
  messages: Message[];
  participantCount: number;

  // AI Settings
  aiEnabled: boolean;
  floorPrice: number;
  maxDiscount: number; // Maximum AI can negotiate down

  // Status
  status: NegotiationStatus;
  lastActivity: Date;

  // Outcomes
  finalPrice?: number;
  acceptedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string; // User ID or 'ai' or external buyer identifier
  senderType: 'user' | 'ai' | 'buyer';
  content: string;
  timestamp: Date;

  // AI metadata
  aiResponse?: boolean;
  aiConfidence?: number;
  requiresUserAttention?: boolean;
}

export type NegotiationStatus =
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled';

// ============================================================================
// LOGISTICS & COURIER MANAGEMENT
// ============================================================================

export interface CourierJob {
  id: string;

  // Relationships
  itemId: string;
  userId: string;
  transactionId?: string;

  // Job details
  type: 'pickup' | 'delivery';
  service: CourierService;

  // Addresses
  pickupAddress: Address;
  deliveryAddress?: Address; // For delivery jobs

  // Status & tracking
  status: CourierStatus;
  externalJobId?: string; // Uber job ID, etc.
  trackingUrl?: string;
  eta?: Date;

  // Courier details
  courierName?: string;
  courierPhone?: string;
  vehicleType?: string;

  // Cost breakdown
  baseFare: number;
  tip?: number;
  convenienceFee: number; // LOOP's $5 fee
  totalCost: number;

  // Timeline
  scheduledAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type CourierService =
  | 'uber_direct'
  | 'doordash'
  | 'shipt'
  | 'loop_courier' // Future in-house service
  | 'usps'
  | 'fedex';

export type CourierStatus =
  | 'scheduled'
  | 'en_route'
  | 'arrived'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'failed';

// ============================================================================
// PAYMENT & TRANSACTION MANAGEMENT
// ============================================================================

export interface Transaction {
  id: string;

  // Relationships
  itemId: string;
  userId: string;
  listingId?: string;
  courierJobId?: string;

  // Financial details
  saleAmount: number;
  platformCommission: number; // 5-10% of sale
  courierCost: number;
  convenienceFee: number; // $5 LOOP fee
  totalFees: number;

  // Net to user
  payoutAmount: number; // saleAmount - totalFees

  // Payment processing
  stripePaymentIntentId?: string;
  paymentStatus: PaymentStatus;

  // Payout to seller
  payoutStatus: PayoutStatus;
  payoutDate?: Date;

  // Timeline
  saleConfirmedAt?: Date;
  paidAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type PayoutStatus =
  | 'pending'
  | 'processing'
  | 'paid'
  | 'failed';

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface PaginationOptions {
  limit: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface SearchFilters {
  status?: ItemStatus[];
  category?: string[];
  condition?: ItemCondition[];
  minPrice?: number;
  maxPrice?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// ============================================================================
// REAL-TIME SUBSCRIPTION TYPES (Firebase/Supabase specific)
// ============================================================================

export interface RealtimeSubscription {
  collection: keyof DatabaseSchema;
  filters?: Record<string, any>;
  onUpdate: (data: any) => void;
  onError?: (error: any) => void;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface BatchOperationResult {
  successful: string[]; // IDs of successful operations
  failed: {
    id: string;
    error: string;
  }[];
}

// ============================================================================
// ANALYTICS & METRICS
// ============================================================================

export interface AppMetrics {
  totalUsers: number;
  totalItems: number;
  totalValueLiquidated: number;
  averageSaleTime: number; // hours
  conversionRate: number; // listings to sales
  aiAccuracy: number; // identification success rate
}

export interface UserMetrics {
  itemsListed: number;
  itemsSold: number;
  totalEarnings: number;
  averageItemValue: number;
  fastestSale: number; // hours
  slowestSale: number; // hours
}