import { createClient } from '@supabase/supabase-js'

// Supabase project URL and anon public key
const supabaseUrl = 'https://yiajhaobbnnuryekduqx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpYWpoYW9iYm5udXJ5ZWtkdXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NzYzOTEsImV4cCI6MjA3MzI1MjM5MX0.VOipKHVfx3iJi_YRL4KvBssNC6ADeNFPxB0FcwtRpts'

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
