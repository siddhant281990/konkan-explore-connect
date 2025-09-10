import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, User, ArrowRight, Eye, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogs } from '@/hooks/useBlogs';
import blogImage1 from '@/assets/blog-1.jpg';
import blogImage2 from '@/assets/blog-2.jpg';

const Blogs = () => {
  const navigate = useNavigate();
  const { blogs, loading } = useBlogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = ['all', 'Travel Guide', 'Food & Culture', 'Travel Tips', 'Adventure'];
  const allTags = ['all', 'beaches', 'hidden gems', 'coastal', 'food', 'culture', 'traditional', 'planning', 'weather', 'seasons', 'adventure', 'sports', 'activities', 'festivals', 'celebrations', 'sustainable', 'eco-friendly', 'responsible travel'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredPosts = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || post.tags.some(tag => tag.includes(selectedTag));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
              Travel Stories & Guides
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the rich culture, hidden gems, and authentic experiences of Konkan through our curated stories and comprehensive guides.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTag} onValueChange={setSelectedTag}>
                  <SelectTrigger className="w-[180px]">
                    <Tag className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    {allTags.map(tag => (
                      <SelectItem key={tag} value={tag}>
                        {tag === 'all' ? 'All Tags' : tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">Loading blogs...</p>
              </div>
            ) : paginatedPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No blogs found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {paginatedPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
                      onClick={() => handlePostClick(post.id)}
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
                        <h3 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-smooth line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt}
                        </p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;