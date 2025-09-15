import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get Instagram settings and credentials
    const { data: settings } = await supabase
      .from('social_settings')
      .select('instagram_enabled, instagram_user_id')
      .single()

    if (!settings?.instagram_enabled || !settings.instagram_user_id) {
      return new Response(
        JSON.stringify({ error: 'Instagram not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get Instagram Access Token from Supabase Secrets
    const instagramToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')
    if (!instagramToken) {
      console.error('Instagram access token not found in secrets')
      return new Response(
        JSON.stringify({ error: 'Instagram access token not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const { limit = 4 } = await req.json()

    // Fetch Instagram posts using Basic Display API
    const instagramUrl = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type,timestamp&limit=${limit}&access_token=${instagramToken}`
    
    const response = await fetch(instagramUrl)
    const data = await response.json()

    if (!response.ok) {
      console.error('Instagram API error:', data)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Instagram posts' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ posts: data.data || [] }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})