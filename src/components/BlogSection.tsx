import { Calendar, User, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import blogImage1 from '@/assets/blog-1.jpg';
import blogImage2 from '@/assets/blog-2.jpg';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Hidden Gems of Konkan Coast',
      excerpt: 'Discover the untouched beaches and secret spots that only locals know about...',
      content: 'The Konkan coast is filled with hidden treasures waiting to be explored...',
      image: blogImage1,
      author: 'Priya Sharma',
      date: '2024-01-15',
      category: 'Travel Guide',
      readTime: '5 min read',
      views: 1250
    },
    {
      id: 2,
      title: 'Authentic Konkan Cuisine Guide',
      excerpt: 'A complete guide to traditional Konkani dishes and where to find them...',
      content: 'From kokum curry to modak, explore the rich culinary heritage of Konkan...',
      image: blogImage2,
      author: 'Rajesh Patil',
      date: '2024-01-10',
      category: 'Food & Culture',
      readTime: '7 min read',
      views: 980
    },
    {
      id: 3,
      title: 'Best Time to Visit Konkan',
      excerpt: 'Planning your Konkan trip? Here\'s everything you need to know about seasons...',
      content: 'The monsoons transform Konkan into a lush paradise, but each season has its charm...',
      image: blogImage1,
      author: 'Anita Desai',
      date: '2024-01-05',
      category: 'Travel Tips',
      readTime: '4 min read',
      views: 1580
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
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
                  {post.excerpt}
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
                  <span>{post.readTime}</span>
                </div>
              </CardContent>
              
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                
                <Button variant="ghost" size="sm" className="group-hover:text-primary transition-smooth">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="tropical-gradient text-white px-8">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;