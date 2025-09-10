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

  const fetchBlogs = async (includeUnpublished = false) => {
    try {
      setLoading(true);
      let query = supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!includeUnpublished) {
        query = query.eq('status', 'published');
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
      const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error creating blog:', err);
      throw err;
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
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