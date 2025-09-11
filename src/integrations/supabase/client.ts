import { createClient } from '@supabase/supabase-js'

// Using Lovable's native Supabase integration
// These values are automatically provided by Lovable when Supabase is connected
const supabaseUrl = 'https://ckdnogjlzjkmxylrlpma.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrZG5vZ2psempremd5bHJscG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NjU2MTksImV4cCI6MjA1MzA0MTYxOX0.0nkemRXdJC1fPZZPB4Bfkk9DflTZdlbzk3WKf3_1Dv8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)