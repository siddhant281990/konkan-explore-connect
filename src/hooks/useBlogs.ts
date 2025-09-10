import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  created_at: string;
  updated_at: string;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch blogs from Supabase.
   * @param includeUnpublished - If true, include drafts (for admin use).
   * @param limit - Number of blogs to fetch per request (null = no limit).
   * @param page - Page number for pagination (default = 1).
   */
  const fetchBlogs = async (
    includeUnpublished: boolean = false,
    limit: number | null = null,
    page: number = 1
  ) => {
    try {
      setLoading(true);
      let query = supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      // Show only published blogs on the public site
      if (!includeUnpublished) {
        query = query.eq('status', 'published');
      }

      // Apply pagination / limit
      if (limit) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
