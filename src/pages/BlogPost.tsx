import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, User, Eye, Clock, Tag, Share2, Heart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogs, Blog } from '@/hooks/useBlogs';
import blogImage1 from '@/assets/blog-1.jpg';
import blogImage2 from '@/assets/blog-2.jpg';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById, incrementViews, blogs } = useBlogs();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const blogPost = await getBlogById(id);
        if (blogPost) {
          setPost(blogPost);
          // Increment views when post is loaded
          await incrementViews(id);
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, getBlogById, incrementViews]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-muted-foreground">Loading blog post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  const relatedPosts = blogs.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={post.image_url || blogImage1}
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
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
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

                  {/* Affiliate Link Button */}
                  {post.affiliate_link && (
                    <div className="mt-8 pt-8 border-t border-border">
                      <Button 
                        className="w-full ocean-gradient text-white hover:shadow-soft transition-smooth"
                        onClick={() => window.open(post.affiliate_link!, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Link / Book Now
                      </Button>
                    </div>
                  )}

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
                                src={relatedPost.image_url || blogImage1}
                                alt={relatedPost.title}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium line-clamp-2">{relatedPost.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(relatedPost.created_at)}
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