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

-- Storage policies
CREATE POLICY "Public read access for images" ON storage.objects 
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images" ON storage.objects 
  FOR DELETE USING (bucket_id = 'images');