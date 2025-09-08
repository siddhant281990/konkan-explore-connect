import { Instagram, Youtube, Heart, MessageCircle, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SocialMediaSection = () => {
  // Mock Instagram posts
  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
      likes: 324,
      comments: 12,
      caption: 'Sunset at Tarkarli Beach 🌅 #KonkanDarshan'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop',
      likes: 267,
      comments: 8,
      caption: 'Traditional Konkani thali 🍛 #KonkanFood'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1562113530-57ba4cea4e3d?w=400&h=400&fit=crop',
      likes: 445,
      comments: 23,
      caption: 'Sindhudurg Fort majesty 🏰 #KonkanHeritage'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=400&fit=crop',
      likes: 189,
      comments: 5,
      caption: 'Fresh coconuts from local farms 🥥 #KonkanProducts'
    }
  ];

  // Mock YouTube videos
  const youtubeVideos = [
    {
      id: 1,
      title: 'Complete Konkan Coast Road Trip Guide',
      thumbnail: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=480&h=270&fit=crop',
      views: '25K views',
      duration: '12:45'
    },
    {
      id: 2,
      title: 'Top 10 Hidden Beaches in Konkan',
      thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=480&h=270&fit=crop',
      views: '18K views',
      duration: '8:32'
    },
    {
      id: 3,
      title: 'Authentic Konkan Cooking with Local Families',
      thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=480&h=270&fit=crop',
      views: '12K views',
      duration: '15:20'
    }
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Instagram Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Instagram className="w-8 h-8 text-pink-500" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Instagram</h3>
                  <p className="text-muted-foreground">@konkandardshan</p>
                </div>
              </div>
              <Button className="sunset-gradient text-white">
                Follow Us
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {instagramPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt="Instagram post"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center space-x-4 text-white">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
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

          {/* YouTube Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Youtube className="w-8 h-8 text-red-500" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">YouTube</h3>
                  <p className="text-muted-foreground">Konkan Darshan</p>
                </div>
              </div>
              <Button variant="outline">
                Subscribe
              </Button>
            </div>

            <div className="space-y-6">
              {youtubeVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                  <div className="flex">
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-32 h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="flex-1 p-4">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2 mb-2">
                        {video.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{video.views}</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <Instagram className="w-5 h-5" />
              <span>Follow on Instagram</span>
            </Button>
            <Button size="lg" variant="outline" className="flex items-center space-x-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <span>Subscribe to YouTube</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;