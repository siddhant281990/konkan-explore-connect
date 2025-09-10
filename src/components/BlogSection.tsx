import { Calendar, User, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useBlogs } from '@/hooks/useBlogs';
import blogImage1 from '@/assets/blog-1.jpg';
import blogImage2 from '@/assets/blog-2.jpg';

const BlogSection = () => {
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();
  
  // Show only latest 6 published blogs
  const latestBlogs = blogs.slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blogs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
            Travel Stories & Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into the rich culture, cuisine, and hidden gems of Konkan through our curated stories
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image_url || blogImage1}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 ocean-gradient text-white">
                    {post.category}
                  </Badge>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-white text-xs">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <h3 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-smooth">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <span>5 min read</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="group-hover:text-primary transition-smooth">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="tropical-gradient text-white px-8"
            onClick={() => navigate('/blogs')}
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;