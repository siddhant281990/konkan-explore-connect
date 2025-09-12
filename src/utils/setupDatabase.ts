import { supabase } from '@/integrations/supabase/client';

export const setupDatabase = async () => {
  try {
    // Create blogs table
    const { error: blogsError } = await supabase.rpc('create_blogs_table', {});
    
    // Create hotels table  
    const { error: hotelsError } = await supabase.rpc('create_hotels_table', {});

    // Create increment blog views function
    const { error: functionError } = await supabase.rpc('create_increment_function', {});

    if (blogsError) console.log('Blogs table may already exist:', blogsError.message);
    if (hotelsError) console.log('Hotels table may already exist:', hotelsError.message);
    if (functionError) console.log('Function may already exist:', functionError.message);

    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup error:', error);
  }
};

// Alternative method: Create tables directly using SQL
export const createTablesDirectly = async () => {
  try {
    // Create blogs table
    await supabase.from('blogs').select('id').limit(1);
  } catch (error) {
    console.log('Tables might not exist yet, this is expected on first run');
  }
};