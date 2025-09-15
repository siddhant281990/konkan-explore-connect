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

    // Get YouTube settings
    const { data: settings } = await supabase
      .from('social_settings')
      .select('youtube_enabled, youtube_channel_id')
      .single()

    if (!settings?.youtube_enabled || !settings.youtube_channel_id) {
      return new Response(
        JSON.stringify({ error: 'YouTube not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get YouTube API Key from Supabase Secrets
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY')
    if (!youtubeApiKey) {
      console.error('YouTube API key not found in secrets')
      return new Response(
        JSON.stringify({ error: 'YouTube API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const { limit = 3 } = await req.json()

    // Fetch YouTube videos using Data API v3
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${settings.youtube_channel_id}&part=snippet&order=date&maxResults=${limit}&type=video`
    
    const response = await fetch(youtubeUrl)
    const data = await response.json()

    if (!response.ok) {
      console.error('YouTube API error:', data)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch YouTube videos' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Transform YouTube API response to match our interface
    const videos = data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail_url: item.snippet.thumbnails.medium.url,
      video_url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      published_at: item.snippet.publishedAt
    })) || []

    return new Response(
      JSON.stringify({ videos }),
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