import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  published_at: string;
  view_count?: string;
  duration?: string;
}

export const useSocialFeeds = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstagramFeed = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('get-instagram-feed', {
        body: { limit: 4 }
      });

      if (error) throw error;
      setInstagramPosts(data?.posts || []);
    } catch (err) {
      console.error('Error fetching Instagram feed:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch Instagram feed');
      // Fallback to mock data for demo
      setInstagramPosts([
        {
          id: '1',
          media_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
          permalink: '#',
          caption: 'Sunset at Tarkarli Beach 🌅 #KonkanDarshan',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          media_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
          permalink: '#',
          caption: 'Traditional Konkani thali 🍛 #KonkanFood',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          media_url: 'https://images.unsplash.com/photo-1562113530-57ba4cea4e3d?w=400&h=400&fit=crop',
          permalink: '#',
          caption: 'Sindhudurg Fort majesty 🏰 #KonkanHeritage',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString()
        },
        {
          id: '4',
          media_url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=400&fit=crop',
          permalink: '#',
          caption: 'Fresh coconuts from local farms 🥥 #KonkanProducts',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchYoutubeFeed = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('get-youtube-feed', {
        body: { limit: 3 }
      });

      if (error) throw error;
      setYoutubeVideos(data?.videos || []);
    } catch (err) {
      console.error('Error fetching YouTube feed:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch YouTube feed');
      // Fallback to mock data for demo
      setYoutubeVideos([
        {
          id: '1',
          title: 'Complete Konkan Coast Road Trip Guide',
          description: 'A comprehensive guide to exploring the Konkan coast',
          thumbnail_url: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=480&h=270&fit=crop',
          video_url: '#',
          published_at: new Date().toISOString(),
          view_count: '25K views',
          duration: '12:45'
        },
        {
          id: '2',
          title: 'Top 10 Hidden Beaches in Konkan',
          description: 'Discover the most beautiful hidden beaches',
          thumbnail_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=480&h=270&fit=crop',
          video_url: '#',
          published_at: new Date().toISOString(),
          view_count: '18K views',
          duration: '8:32'
        },
        {
          id: '3',
          title: 'Authentic Konkan Cooking with Local Families',
          description: 'Learn traditional Konkan recipes',
          thumbnail_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=480&h=270&fit=crop',
          video_url: '#',
          published_at: new Date().toISOString(),
          view_count: '12K views',
          duration: '15:20'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    instagramPosts,
    youtubeVideos,
    loading,
    error,
    fetchInstagramFeed,
    fetchYoutubeFeed
  };
};