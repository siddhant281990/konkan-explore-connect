import { useState } from 'react';
import { Shield, Database, Settings, Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import blogImage1 from '@/assets/blog-1.jpg';
import blogImage2 from '@/assets/blog-2.jpg';

const Admin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  // Mock data - in real app, this would be from Supabase
  const blogPosts = [
    {
      id: 1,
      title: 'Hidden Gems of Konkan Coast',
      excerpt: 'Discover the untouched beaches and secret spots...',
      image: blogImage1,
      author: 'Priya Sharma',
      date: '2024-01-15',
      category: 'Travel Guide',
      tags: ['beaches', 'hidden gems', 'coastal'],
      status: 'published',
      views: 1250
    },
    {
      id: 2,
      title: 'Authentic Konkan Cuisine Guide',
      excerpt: 'A complete guide to traditional Konkani dishes...',
      image: blogImage2,
      author: 'Rajesh Patil',
      date: '2024-01-10',
      category: 'Food & Culture',
      tags: ['food', 'culture', 'traditional'],
      status: 'published',
      views: 980
    },
    {
      id: 3,
      title: 'Best Time to Visit Konkan',
      excerpt: 'Planning your Konkan trip? Here\'s everything...',
      image: blogImage1,
      author: 'Anita Desai',
      date: '2024-01-05',
      category: 'Travel Tips',
      tags: ['planning', 'weather', 'seasons'],
      status: 'draft',
      views: 0
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Konkan Special Kokum Syrup',
      price: '₹250',
      stock: 45,
      category: 'Beverages',
      status: 'active'
    },
    {
      id: 2,
      name: 'Handwoven Konkan Saree',
      price: '₹3,500',
      stock: 12,
      category: 'Textiles',
      status: 'active'
    },
    {
      id: 3,
      name: 'Dried Fish Variety Pack',
      price: '₹450',
      stock: 0,
      category: 'Food',
      status: 'out_of_stock'
    }
  ];

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground">
                  Manage your Konkan Darshan platform content and settings
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="blogs" className="w-full">
              <TabsList className="grid w-full lg:w-[400px] grid-cols-4">
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Blog Management */}
              <TabsContent value="blogs" className="mt-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Database className="w-5 h-5 text-primary" />
                        <span>Blog Management</span>
                      </CardTitle>
                      <Button onClick={handleNewPost}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Blog Post
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium max-w-xs">
                              <div className="line-clamp-1">{post.title}</div>
                            </TableCell>
                            <TableCell>{post.author}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{post.category}</Badge>
                            </TableCell>
                            <TableCell>{formatDate(post.date)}</TableCell>
                            <TableCell>
                              <Badge variant={post.status === 'published' ? 'default' : 'outline'}>
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{post.views}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Product Management */}
              <TabsContent value="products" className="mt-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Database className="w-5 h-5 text-secondary" />
                        <span>Product Management</span>
                      </CardTitle>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product Name</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{product.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={product.status === 'active' ? 'default' : 'destructive'}>
                                {product.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics */}
              <TabsContent value="analytics" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                          <p className="text-2xl font-bold">12,453</p>
                        </div>
                        <Eye className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
                          <p className="text-2xl font-bold">{blogPosts.length}</p>
                        </div>
                        <Database className="w-8 h-8 text-secondary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Products</p>
                          <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                        <Users className="w-8 h-8 text-highlight" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Categories</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                        <Settings className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-primary" />
                      <span>Platform Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="site-title">Site Title</Label>
                        <Input id="site-title" defaultValue="Konkan Darshan" />
                      </div>
                      <div>
                        <Label htmlFor="site-description">Site Description</Label>
                        <Input id="site-description" defaultValue="Explore the beauty of Konkan" />
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="info@konkandarshan.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 9876543210" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="about">About Section</Label>
                      <Textarea 
                        id="about" 
                        defaultValue="Konkan Darshan is your gateway to exploring the pristine beauty of the Konkan coast..."
                        rows={4}
                      />
                    </div>
                    <Button>Save Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      {/* Blog Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                defaultValue={editingPost?.title || ''} 
                placeholder="Enter blog post title"
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Short Summary</Label>
              <Textarea 
                id="excerpt" 
                defaultValue={editingPost?.excerpt || ''} 
                placeholder="Brief description of the blog post"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  defaultValue={editingPost?.author || ''} 
                  placeholder="Author name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={editingPost?.category || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Travel Guide">Travel Guide</SelectItem>
                    <SelectItem value="Food & Culture">Food & Culture</SelectItem>
                    <SelectItem value="Travel Tips">Travel Tips</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input 
                id="tags" 
                defaultValue={editingPost?.tags?.join(', ') || ''} 
                placeholder="beaches, hidden gems, coastal"
              />
            </div>
            <div>
              <Label htmlFor="content">Full Content</Label>
              <Textarea 
                id="content" 
                placeholder="Write your blog post content here..."
                rows={8}
              />
            </div>
            <div className="flex space-x-4">
              <Button>Save as Draft</Button>
              <Button variant="default">Publish</Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Admin;