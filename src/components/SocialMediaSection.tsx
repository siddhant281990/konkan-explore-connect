import { Instagram, Youtube, Heart, MessageCircle, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSocialSettings } from '@/hooks/useSocialSettings';
import { useSocialFeeds } from '@/hooks/useSocialFeeds';
import { useEffect } from 'react';

const SocialMediaSection = () => {
  const { settings, loading: settingsLoading } = useSocialSettings();
  const { instagramPosts, youtubeVideos, fetchInstagramFeed, fetchYoutubeFeed } = useSocialFeeds();

  useEffect(() => {
    if (settings?.instagram_enabled) {
      fetchInstagramFeed();
    }
    if (settings?.youtube_enabled) {
      fetchYoutubeFeed();
    }
  }, [settings, fetchInstagramFeed, fetchYoutubeFeed]);

  // Don't render if both social media are disabled or settings are loading
  if (settingsLoading || (!settings?.instagram_enabled && !settings?.youtube_enabled)) {
    return null;
  }

  return (
    <section id="social" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-highlight to-secondary bg-clip-text text-transparent">
            Follow Our Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected with us on social media for daily updates and travel inspiration
          </p>
        </div>

        <div className={`grid grid-cols-1 ${settings?.instagram_enabled && settings?.youtube_enabled ? 'lg:grid-cols-2' : ''} gap-12`}>
          {/* Instagram Section */}
          {settings?.instagram_enabled && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <Instagram className="w-8 h-8 text-pink-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{settings.instagram_title}</h3>
                    {settings.instagram_username && (
                      <p className="text-muted-foreground">@{settings.instagram_username}</p>
                    )}
                  </div>
                </div>
                <Button 
                  className="sunset-gradient text-white"
                  onClick={() => settings.instagram_username && window.open(`https://instagram.com/${settings.instagram_username}`, '_blank', 'noopener,noreferrer')}
                >
                  Follow Us
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {instagramPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                    <div 
                      className="relative"
                      onClick={() => window.open(post.permalink, '_blank', 'noopener,noreferrer')}
                    >
                      <img
                        src={post.media_url}
                        alt="Instagram post"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center space-x-4 text-white">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-5 h-5" />
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.caption}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Section */}
          {settings?.youtube_enabled && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <Youtube className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{settings.youtube_title}</h3>
                    <p className="text-muted-foreground">Konkan Darshan</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => settings.youtube_channel_id && window.open(`https://youtube.com/channel/${settings.youtube_channel_id}`, '_blank', 'noopener,noreferrer')}
                >
                  Subscribe
                </Button>
              </div>

              <div className="space-y-6">
                {youtubeVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                    <div 
                      className="flex"
                      onClick={() => window.open(video.video_url, '_blank', 'noopener,noreferrer')}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail_url}
                          alt={video.title}
                          className="w-32 h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                            {video.duration}
                          </div>
                        )}
                      </div>
                      <CardContent className="flex-1 p-4">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2 mb-2">
                          {video.title}
                        </h4>
                        {video.view_count && (
                          <p className="text-sm text-muted-foreground">{video.view_count}</p>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTAs */}
        {(settings?.instagram_enabled || settings?.youtube_enabled) && (
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {settings?.instagram_enabled && (
                <Button 
                  size="lg" 
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  onClick={() => settings.instagram_username && window.open(`https://instagram.com/${settings.instagram_username}`, '_blank', 'noopener,noreferrer')}
                >
                  <Instagram className="w-5 h-5" />
                  <span>Follow on Instagram</span>
                </Button>
              )}
              {settings?.youtube_enabled && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => settings.youtube_channel_id && window.open(`https://youtube.com/channel/${settings.youtube_channel_id}`, '_blank', 'noopener,noreferrer')}
                >
                  <Youtube className="w-5 h-5 text-red-500" />
                  <span>Subscribe to YouTube</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialMediaSection;