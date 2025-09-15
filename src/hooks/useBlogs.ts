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
  affiliate_link: string | null;
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

  const getBlogById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching blog:', err);
      return null;
    }
  };

  const createBlog = async (blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at' | 'views'>) => {
    try {
      console.log('Creating blog with data:', blogData);
      
      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          ...blogData,
          views: 0,
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

      console.log('Blog created successfully:', data);
      return data;
    } catch (err) {
      console.error('Error creating blog:', err);
      throw err;
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      console.log('Updating blog with data:', blogData);
      
      const { data, error } = await supabase
        .from('blogs')
        .update({
          ...blogData,
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

      console.log('Blog updated successfully:', data);
      return data;
    } catch (err) {
      console.error('Error updating blog:', err);
      throw err;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting blog:', err);
      throw err;
    }
  };

  const incrementViews = async (id: string) => {
    try {
      const { error } = await supabase.rpc('increment_blog_views', { blog_id: id });
      if (error) throw error;
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    incrementViews
  };
};
