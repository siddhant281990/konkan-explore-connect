import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Hotel {
  id: string;
  name: string;
  description: string | null;
  location: string;
  price_per_night: number;
  rating: number;
  category: 'hotel' | 'homestay' | 'villa' | 'resort';
  amenities: string[];
  image_url: string | null;
  affiliate_link: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch hotels from Supabase.
   * @param includeInactive - If true, include inactive hotels (for admin use).
   * @param limit - Number of hotels to fetch per request (null = no limit).
   * @param page - Page number for pagination (default = 1).
   */
  const fetchHotels = async (
    includeInactive: boolean = false,
    limit: number | null = null,
    page: number = 1
  ) => {
    try {
      setLoading(true);
      let query = supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      // Show only active hotels on the public site
      if (!includeInactive) {
        query = query.eq('status', 'active');
      }

      // Apply pagination / limit
      if (limit) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);
      }

      const { data, error } = await query;

      if (error) throw error;
      setHotels(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getHotelById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching hotel:', err);
      return null;
    }
  };

  const createHotel = async (hotelData: Omit<Hotel, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating hotel with data:', hotelData);
      
      const { data, error } = await supabase
        .from('hotels')
        .insert([{
          ...hotelData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      console.log('Hotel created successfully:', data);
      return data;
    } catch (err) {
      console.error('Error creating hotel:', err);
      throw err;
    }
  };

  const updateHotel = async (id: string, hotelData: Partial<Hotel>) => {
    try {
      console.log('Updating hotel with data:', hotelData);
      
      const { data, error } = await supabase
        .from('hotels')
        .update({
          ...hotelData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      console.log('Hotel updated successfully:', data);
      return data;
    } catch (err) {
      console.error('Error updating hotel:', err);
      throw err;
    }
  };

  const deleteHotel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting hotel:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return {
    hotels,
    loading,
    error,
    fetchHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
  };
};