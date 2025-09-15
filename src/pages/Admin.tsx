import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import { 
  Card, CardHeader, CardTitle, CardContent, 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell, 
  Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent, 
  Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Label 
} from '@/components/ui';
import { 
  Shield, Database, Eye, Edit, Trash2, Plus, Save, Package, Users, Settings 
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import RichTextEditor from '@/components/RichTextEditor';
import SocialSettingsCard from '@/components/SocialSettingsCard';
import { createBlog, updateBlog, fetchBlogs } from '@/integrations/blog';
import { createHotel, updateHotel, fetchHotels } from '@/integrations/hotel';
import { createProduct, updateProduct, fetchProducts } from '@/integrations/product';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [blogs, setBlogs] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const [isHotelDialogOpen, setIsHotelDialogOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<any>(null);
  const [hotelFormData, setHotelFormData] = useState<any>({});
  const [savingHotel, setSavingHotel] = useState(false);

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productFormData, setProductFormData] = useState<any>({});
  const [savingProduct, setSavingProduct] = useState(false);

  // Fetch user
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
      setIsLoading(false);
    };
    getUser();
  }, []);

  // Fetch initial data
  useEffect(() => {
    if (user) {
      fetchBlogs().then(setBlogs);
      fetchHotels().then(setHotels);
      fetchProducts().then(setProducts);
    }
  }, [user]);

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      setSaving(true);
      const blogData = { ...formData, status };
      if (editingPost) {
        await updateBlog(editingPost.id, blogData);
      } else {
        await createBlog(blogData);
      }
      const updatedBlogs = await fetchBlogs();
      setBlogs(updatedBlogs);
      setIsDialogOpen(false);
      toast({ title: 'Success', description: `Blog ${editingPost ? 'updated' : 'created'} successfully!` });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to save blog.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHotel = async () => {
    try {
      setSavingHotel(true);
      const hotelData = {
        ...hotelFormData,
        price_per_night: Number(hotelFormData.price_per_night),
        rating: Number(hotelFormData.rating) || 0,
        amenities: hotelFormData.amenities.split(',').map((a: string) => a.trim()).filter(Boolean)
      };
      if (editingHotel) {
        await updateHotel(editingHotel.id, hotelData);
      } else {
        await createHotel(hotelData);
      }
      const updatedHotels = await fetchHotels();
      setHotels(updatedHotels);
      setIsHotelDialogOpen(false);
      toast({ title: 'Success', description: `Hotel ${editingHotel ? 'updated' : 'created'} successfully!` });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to save hotel.', variant: 'destructive' });
    } finally {
      setSavingHotel(false);
    }
  };

  const handleSaveProduct = async () => {
    try {
      setSavingProduct(true);
      const productData = { ...productFormData };
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
      setIsProductDialogOpen(false);
      toast({ title: 'Success', description: `Product ${editingProduct ? 'updated' : 'created'} successfully!` });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to save product.', variant: 'destructive' });
    } finally {
      setSavingProduct(false);
    }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-IN');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || !user.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

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
              <TabsList className="grid w-full lg:w-[500px] grid-cols-5">
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Blog Management */}
              <TabsContent value="blogs" className="mt-8">
                {/* ... Your existing Blog Table code here ... */}
              </TabsContent>

              {/* Hotels & Homestays Management */}
              <TabsContent value="hotels" className="mt-8">
                {/* ... Your existing Hotel Table code here ... */}
              </TabsContent>

              {/* Products Management */}
              <TabsContent value="products" className="mt-8">
                {/* ... Your existing Product Table code here ... */}
              </TabsContent>

              {/* Analytics */}
              <TabsContent value="analytics" className="mt-8">
                {/* ... Your existing Analytics Cards code here ... */}
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="mt-8">
                {/* ... Your existing Settings Cards code here ... */}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Blog Dialog */}
        {/* ... Your existing Blog Dialog code here ... */}

        {/* Hotel Dialog */}
        {/* ... Your existing Hotel Dialog code here ... */}

        {/* Product Dialog */}
        {/* ... Your existing Product Dialog code here ... */}

      </main>

      <Footer />
    </div>
  );
};

export default Admin;
