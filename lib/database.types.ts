// Supabase Database Types
// These match the schema we'll create in Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ItemCondition = 'new' | 'like_new' | 'excellent' | 'good' | 'fair' | 'poor';
export type ItemStatus = 'draft' | 'analyzing' | 'listed' | 'pending_pickup' | 'in_transit' | 'sold' | 'cancelled';
export type CourierStatus = 'requested' | 'assigned' | 'en_route' | 'arrived' | 'picked_up' | 'delivered' | 'failed';
export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          default_address_id: string | null;
          stripe_customer_id: string | null;
          stripe_account_id: string | null;
          total_earnings: number;
          total_items_sold: number;
          average_rating: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          default_address_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_account_id?: string | null;
          total_earnings?: number;
          total_items_sold?: number;
          average_rating?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          default_address_id?: string | null;
          stripe_customer_id?: string | null;
          stripe_account_id?: string | null;
          total_earnings?: number;
          total_items_sold?: number;
          average_rating?: number;
          updated_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string;
          street_address: string;
          apt_suite: string | null;
          city: string;
          state: string;
          zip_code: string;
          country: string;
          latitude: number | null;
          longitude: number | null;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          label: string;
          street_address: string;
          apt_suite?: string | null;
          city: string;
          state: string;
          zip_code: string;
          country?: string;
          latitude?: number | null;
          longitude?: number | null;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          label?: string;
          street_address?: string;
          apt_suite?: string | null;
          city?: string;
          state?: string;
          zip_code?: string;
          country?: string;
          latitude?: number | null;
          longitude?: number | null;
          is_default?: boolean;
        };
      };
      items: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          brand: string | null;
          model: string | null;
          category: string | null;
          condition: ItemCondition;
          status: ItemStatus;
          ai_confidence: number | null;
          estimated_value: number | null;
          floor_price: number | null;
          final_sale_price: number | null;
          photos: string[];
          ai_analysis: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          brand?: string | null;
          model?: string | null;
          category?: string | null;
          condition?: ItemCondition;
          status?: ItemStatus;
          ai_confidence?: number | null;
          estimated_value?: number | null;
          floor_price?: number | null;
          final_sale_price?: number | null;
          photos?: string[];
          ai_analysis?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          brand?: string | null;
          model?: string | null;
          category?: string | null;
          condition?: ItemCondition;
          status?: ItemStatus;
          ai_confidence?: number | null;
          estimated_value?: number | null;
          floor_price?: number | null;
          final_sale_price?: number | null;
          photos?: string[];
          ai_analysis?: Json | null;
          updated_at?: string;
        };
      };
      marketplace_listings: {
        Row: {
          id: string;
          item_id: string;
          marketplace: string;
          external_listing_id: string | null;
          listing_url: string | null;
          listed_price: number;
          current_highest_offer: number | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          item_id: string;
          marketplace: string;
          external_listing_id?: string | null;
          listing_url?: string | null;
          listed_price: number;
          current_highest_offer?: number | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          marketplace?: string;
          external_listing_id?: string | null;
          listing_url?: string | null;
          listed_price?: number;
          current_highest_offer?: number | null;
          status?: string;
          updated_at?: string;
        };
      };
      courier_jobs: {
        Row: {
          id: string;
          item_id: string;
          user_id: string;
          pickup_address_id: string;
          courier_provider: string;
          external_job_id: string | null;
          status: CourierStatus;
          scheduled_pickup_time: string | null;
          actual_pickup_time: string | null;
          courier_name: string | null;
          courier_phone: string | null;
          tracking_url: string | null;
          pickup_photo_url: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          item_id: string;
          user_id: string;
          pickup_address_id: string;
          courier_provider?: string;
          external_job_id?: string | null;
          status?: CourierStatus;
          scheduled_pickup_time?: string | null;
          actual_pickup_time?: string | null;
          courier_name?: string | null;
          courier_phone?: string | null;
          tracking_url?: string | null;
          pickup_photo_url?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          courier_provider?: string;
          external_job_id?: string | null;
          status?: CourierStatus;
          scheduled_pickup_time?: string | null;
          actual_pickup_time?: string | null;
          courier_name?: string | null;
          courier_phone?: string | null;
          tracking_url?: string | null;
          pickup_photo_url?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          type: string;
          amount: number;
          fee_amount: number;
          net_amount: number;
          status: TransactionStatus;
          stripe_payment_id: string | null;
          stripe_transfer_id: string | null;
          description: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_id: string;
          type: string;
          amount: number;
          fee_amount?: number;
          net_amount: number;
          status?: TransactionStatus;
          stripe_payment_id?: string | null;
          stripe_transfer_id?: string | null;
          description?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          type?: string;
          amount?: number;
          fee_amount?: number;
          net_amount?: number;
          status?: TransactionStatus;
          stripe_payment_id?: string | null;
          stripe_transfer_id?: string | null;
          description?: string | null;
          completed_at?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      item_condition: ItemCondition;
      item_status: ItemStatus;
      courier_status: CourierStatus;
      transaction_status: TransactionStatus;
    };
  };
}
