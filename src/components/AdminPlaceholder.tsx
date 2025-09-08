import { Shield, Database, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminPlaceholder = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your Konkan Darshan platform content and settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <span>Content Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Manage hotel and homestay listings</li>
                <li>• Add/edit local products</li>
                <li>• Create and publish blog posts</li>
                <li>• Update banner images</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-secondary" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• User authentication system</li>
                <li>• Order management</li>
                <li>• Customer support</li>
                <li>• Analytics dashboard</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-8 text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Backend Integration Required</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              To unlock the full admin functionality including product management, blog publishing, 
              user authentication, and eCommerce features, you'll need to integrate with Supabase.
            </p>
            <Button size="lg" className="ocean-gradient text-white">
              Setup Supabase Integration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPlaceholder;