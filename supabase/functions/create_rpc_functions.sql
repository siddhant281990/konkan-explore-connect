-- Create a function to increment blog views
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE blogs 
  SET views = views + 1 
  WHERE id = blog_id;
$$;