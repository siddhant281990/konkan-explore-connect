import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SocialSettings {
  id: string;
  instagram_enabled: boolean;
  instagram_username: string | null;
  instagram_user_id: string | null;
  youtube_enabled: boolean;
  youtube_channel_id: string | null;
  instagram_title: string;
  youtube_title: string;
  created_at: string;
  updated_at: string;
}

export const useSocialSettings = () => {
  const [settings, setSettings] = useState<SocialSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('social_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setSettings(data);
      } else {
        // Create default settings if none exist
        await createDefaultSettings();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('social_settings')
        .insert([{
          instagram_enabled: false,
          youtube_enabled: false,
          instagram_title: 'Follow us on Instagram',
          youtube_title: 'Latest on YouTube'
        }])
        .select()
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (err) {
      console.error('Error creating default settings:', err);
    }
  };

  const updateSettings = async (updates: Partial<SocialSettings>) => {
    try {
      if (!settings) return;

      const { data, error } = await supabase
        .from('social_settings')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id)
        .select()
        .single();

      if (error) throw error;
      setSettings(data);
      return data;
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings
  };
};