import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  product_name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  sale_price: number | null;
  sku: string | null;
  stock_quantity: number;
  availability_status: 'in_stock' | 'out_of_stock' | 'pre_order';
  product_type: 'simple' | 'variable' | 'digital' | 'service';
  featured_image_url: string | null;
  gallery_images: string[];
  category: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (includeAll: boolean = false) => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!includeAll) {
        query = query.eq('availability_status', 'in_stock');
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const createProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'slug'>) => {
    try {
      console.log('Creating product with data:', productData);
      
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...productData,
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

      console.log('Product created successfully:', data);
      return data;
    } catch (err) {
      console.error('Error creating product:', err);
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      console.log('Updating product with data:', productData);
      
      const { data, error } = await supabase
        .from('products')
        .update({
          ...productData,
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

      console.log('Product updated successfully:', data);
      return data;
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };
};