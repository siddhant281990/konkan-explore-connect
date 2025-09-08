import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Eye, Clock, Tag, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import blogImage1 from '@/assets/blog-1.jpg';
import blogImage2 from '@/assets/blog-2.jpg';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in real app, this would be fetched from Supabase
  const blogPosts = {
    '1': {
      id: 1,
      title: 'Hidden Gems of Konkan Coast',
      excerpt: 'Discover the untouched beaches and secret spots that only locals know about in the beautiful Konkan region.',
      content: `
        <h2>Introduction to Konkan's Hidden Treasures</h2>
        <p>The Konkan coast stretches along the western shores of India, offering some of the most pristine and untouched beaches in the country. While popular destinations like Goa attract millions of tourists, the real treasures of Konkan lie in its hidden gems - secluded beaches, ancient forts, and charming fishing villages that remain largely unexplored by mainstream tourism.</p>
        
        <h2>Secluded Beaches Worth Discovering</h2>
        <p>Beyond the crowded shores lie beaches that offer solitude and natural beauty in abundance. Kashid Beach, with its white sand and crystal-clear waters, provides a perfect escape from the hustle and bustle of city life. The beach is relatively less crowded, making it ideal for peaceful walks during sunrise and sunset.</p>
        
        <p>Another hidden gem is Diveagar Beach, known for its pristine coastline and the famous Suvarnaganesha Temple nearby. The beach offers excellent opportunities for water sports and dolphin watching during the right season.</p>
        
        <h2>Ancient Forts and Historical Sites</h2>
        <p>The Konkan region is dotted with ancient forts that tell tales of maritime history and colonial rule. Murud-Janjira Fort, built on an island, is one of the few sea forts in India that remained unconquered. The fort offers spectacular views of the Arabian Sea and houses several palaces, mosques, and freshwater lakes within its walls.</p>
        
        <h2>Local Culture and Traditions</h2>
        <p>What makes these hidden gems truly special is the warmth of the local communities. The fishing villages along the coast have preserved their traditional way of life for centuries. Visitors can witness the early morning fish auctions, traditional fishing techniques, and enjoy authentic Konkani cuisine prepared with locally sourced ingredients.</p>
        
        <h2>Best Time to Visit</h2>
        <p>The ideal time to explore these hidden gems is during the post-monsoon period from October to March. The weather is pleasant, the landscape is lush green from recent rains, and the sea is relatively calm for water activities.</p>
        
        <h2>Tips for Responsible Tourism</h2>
        <p>When visiting these pristine locations, it's important to practice responsible tourism. Carry your waste back, respect local customs, support local businesses, and avoid activities that might harm the marine ecosystem. By being mindful travelers, we can help preserve these hidden gems for future generations.</p>
      `,
      image: blogImage1,
      author: 'Priya Sharma',
      date: '2024-01-15',
      category: 'Travel Guide',
      tags: ['beaches', 'hidden gems', 'coastal', 'forts'],
      readTime: '5 min read',
      views: 1250
    },
    '2': {
      id: 2,
      title: 'Authentic Konkan Cuisine Guide',
      excerpt: 'A complete guide to traditional Konkani dishes and where to find the best authentic food experiences.',
      content: `
        <h2>The Culinary Heritage of Konkan</h2>
        <p>Konkani cuisine is a delightful blend of coastal flavors, featuring fresh seafood, coconut, and aromatic spices. The cuisine varies slightly across different regions of Konkan, but certain elements remain constant - the liberal use of coconut, kokum, and fresh herbs that give Konkani food its distinctive taste.</p>
        
        <h2>Must-Try Konkani Dishes</h2>
        <p><strong>Fish Curry (Koliwada):</strong> The quintessential Konkani dish, made with fresh catch of the day, coconut milk, and a special blend of spices. Each family has their own secret recipe passed down through generations.</p>
        
        <p><strong>Sol Kadhi:</strong> A refreshing drink made with kokum and coconut milk, perfect for cooling down after a spicy meal. It's not just a drink but also aids digestion.</p>
        
        <p><strong>Modak:</strong> Sweet dumplings filled with jaggery and coconut, especially popular during Ganesh Chaturthi celebrations.</p>
        
        <p><strong>Bombil Fry:</strong> Also known as Bombay Duck, this fish is unique to the Konkan coast and is prepared in various ways - fried, curry, or dried.</p>
        
        <h2>Where to Find Authentic Flavors</h2>
        <p>The best Konkani food is often found in small, family-run restaurants and local homes. Many fishing villages offer authentic dining experiences where visitors can enjoy meals prepared by local families using traditional recipes and cooking methods.</p>
        
        <p>Weekly markets are also great places to discover local ingredients and snacks. Don't miss the opportunity to try fresh kokum, locally grown spices, and seasonal fruits.</p>
        
        <h2>Cooking Classes and Food Tours</h2>
        <p>Several local organizations now offer cooking classes where visitors can learn to prepare traditional Konkani dishes. These hands-on experiences provide insight into the cultural significance of various ingredients and cooking techniques.</p>
        
        <h2>Seasonal Specialties</h2>
        <p>Konkani cuisine changes with the seasons and fishing cycles. During monsoon months, when fishing is limited, locals prepare more vegetarian dishes using seasonal vegetables and preserved fish. Post-monsoon brings the best variety of fresh seafood.</p>
      `,
      image: blogImage2,
      author: 'Rajesh Patil',
      date: '2024-01-10',
      category: 'Food & Culture',
      tags: ['food', 'culture', 'traditional', 'seafood'],
      readTime: '7 min read',
      views: 980
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
            <Button onClick={() => navigate('/blogs')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const relatedPosts = Object.values(blogPosts).filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/blogs')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
              
              <Badge className="ocean-gradient text-white mb-4">
                {post.category}
              </Badge>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="blog-content text-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Share & Like */}
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        Like this post
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                  <div className="sticky top-24 space-y-8">
                    {/* Author Info */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">About the Author</h3>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{post.author}</p>
                            <p className="text-sm text-muted-foreground">Travel Writer</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Passionate about exploring hidden gems and sharing authentic travel experiences.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Related Posts */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4">Related Posts</h3>
                        <div className="space-y-4">
                          {relatedPosts.map(relatedPost => (
                            <div
                              key={relatedPost.id}
                              className="flex space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => navigate(`/blog/${relatedPost.id}`)}
                            >
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium line-clamp-2">{relatedPost.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(relatedPost.date)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;