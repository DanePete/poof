import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Database, ItemStatus } from '@/lib/database.types';

type Item = Database['public']['Tables']['items']['Row'];
type ItemInsert = Database['public']['Tables']['items']['Insert'];
type ItemUpdate = Database['public']['Tables']['items']['Update'];

interface UseItemsOptions {
  status?: ItemStatus | ItemStatus[];
  limit?: number;
}

export function useItems(options: UseItemsOptions = {}) {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchItems = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      let query = supabase
        .from('items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (options.status) {
        if (Array.isArray(options.status)) {
          query = query.in('status', options.status);
        } else {
          query = query.eq('status', options.status);
        }
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [user, options.status, options.limit]);

  useEffect(() => {
    if (user) {
      fetchItems();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user, fetchItems]);

  const createItem = async (item: Omit<ItemInsert, 'user_id'>) => {
    if (!user) return { data: null, error: new Error('Not authenticated') };

    try {
      const { data, error } = await supabase
        .from('items')
        .insert({ ...item, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      
      // Refresh items list
      await fetchItems();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const updateItem = async (id: string, updates: ItemUpdate) => {
    try {
      const { error } = await supabase
        .from('items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      await fetchItems();
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchItems();
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  // Calculate stats
  const stats = {
    total: items.length,
    sold: items.filter(i => i.status === 'sold').length,
    pending: items.filter(i => ['listed', 'pending_pickup', 'in_transit'].includes(i.status)).length,
    totalEarnings: items
      .filter(i => i.status === 'sold')
      .reduce((sum, i) => sum + (i.final_sale_price || 0), 0),
  };

  return {
    items,
    loading,
    error,
    stats,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchItems,
  };
}

// Hook for single item
export function useItem(id: string | null) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id) {
      fetchItem();
    } else {
      setItem(null);
      setLoading(false);
    }
  }, [id]);

  const fetchItem = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setItem(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { item, loading, error, refetch: fetchItem };
}
