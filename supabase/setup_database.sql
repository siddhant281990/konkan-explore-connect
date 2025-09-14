-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  gallery_images JSONB DEFAULT '[]',
  author TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  location TEXT NOT NULL,
  price_per_night NUMERIC NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  category TEXT NOT NULL DEFAULT 'hotel' CHECK (category IN ('hotel', 'homestay', 'villa', 'resort')),
  amenities TEXT[] DEFAULT '{}',
  featured_image TEXT,
  gallery_images JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs (status);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON blogs USING gin (tags);

CREATE INDEX IF NOT EXISTS idx_hotels_status ON hotels (status);
CREATE INDEX IF NOT EXISTS idx_hotels_created_at ON hotels (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hotels_category ON hotels (category);
CREATE INDEX IF NOT EXISTS idx_hotels_location ON hotels (location);

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug for hotels
CREATE OR REPLACE FUNCTION trigger_generate_hotel_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_hotels_slug
  BEFORE INSERT OR UPDATE ON hotels
  FOR EACH ROW EXECUTE FUNCTION trigger_generate_hotel_slug();

-- Function to increment blog views
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blogs SET views = views + 1 WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blogs
CREATE POLICY "Enable read access for published blogs" ON blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Enable all operations for authenticated users" ON blogs
  FOR ALL USING (true);

-- RLS Policies for hotels  
CREATE POLICY "Enable read access for active hotels" ON hotels
  FOR SELECT USING (status = 'active');

CREATE POLICY "Enable all operations for authenticated users" ON hotels
  FOR ALL USING (true);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  short_description TEXT,
  price NUMERIC NOT NULL CHECK (price >= 0),
  sale_price NUMERIC CHECK (sale_price >= 0),
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  availability_status TEXT NOT NULL DEFAULT 'in_stock' CHECK (availability_status IN ('in_stock', 'out_of_stock', 'pre_order')),
  product_type TEXT NOT NULL DEFAULT 'simple' CHECK (product_type IN ('simple', 'variable', 'digital', 'service')),
  featured_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for products
CREATE INDEX IF NOT EXISTS idx_products_availability ON products (availability_status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_type ON products (product_type);
CREATE INDEX IF NOT EXISTS idx_products_price ON products (price);
CREATE INDEX IF NOT EXISTS idx_products_tags ON products USING gin (tags);

-- Trigger to auto-generate slug for products
CREATE OR REPLACE FUNCTION trigger_generate_product_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.product_name);
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_products_slug
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION trigger_generate_product_slug();

-- Enable RLS for new tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for products
CREATE POLICY "Enable read access for all products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable all operations for authenticated users" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage policies
CREATE POLICY "Public read access for images" ON storage.objects 
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images" ON storage.objects 
  FOR DELETE USING (bucket_id = 'images');

-- Insert sample data
INSERT INTO products (product_name, description, short_description, price, sale_price, stock_quantity, availability_status, product_type, featured_image_url, category, tags) VALUES
('Konkan Special Kokum Syrup', 'Authentic Konkan kokum syrup made from fresh kokum fruits. Perfect for making refreshing drinks during hot summer days.', 'Authentic Konkan kokum syrup', 250.00, 200.00, 50, 'in_stock', 'simple', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', 'Beverages', ARRAY['kokum', 'syrup', 'konkan', 'traditional']),
('Handwoven Konkan Saree', 'Beautiful handwoven saree from Konkan region featuring traditional patterns and vibrant colors. Perfect for special occasions.', 'Traditional handwoven Konkan saree', 3500.00, NULL, 15, 'in_stock', 'simple', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', 'Textiles', ARRAY['saree', 'handwoven', 'traditional', 'konkan']),
('Dried Fish Variety Pack', 'Premium selection of dried fish varieties from the Konkan coast. Includes bombil, koliwada, and other local favorites.', 'Premium dried fish variety pack', 450.00, NULL, 25, 'in_stock', 'simple', 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400', 'Food', ARRAY['fish', 'dried', 'seafood', 'konkan']),
('Konkan Cashew Nuts', 'Fresh cashew nuts directly from Konkan plantations. Rich in flavor and nutrients.', 'Fresh Konkan cashew nuts', 800.00, 750.00, 30, 'in_stock', 'simple', 'https://images.unsplash.com/photo-1553005770-cb95d2e8c9dd?w=400', 'Nuts', ARRAY['cashew', 'nuts', 'healthy', 'konkan']),
('Traditional Konkan Spice Mix', 'Authentic spice blend used in traditional Konkan cuisine. Made from locally sourced spices.', 'Traditional Konkan spice blend', 180.00, NULL, 40, 'in_stock', 'simple', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', 'Spices', ARRAY['spices', 'traditional', 'cooking', 'konkan']),
('Konkan Handicraft Pottery', 'Beautiful handmade pottery from local Konkan artisans. Each piece is unique and tells a story.', 'Handmade Konkan pottery', 650.00, NULL, 8, 'in_stock', 'simple', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 'Handicrafts', ARRAY['pottery', 'handicraft', 'art', 'konkan']);