import { useState } from 'react';
import { Menu, X, Waves, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut, loading } = useAuth();
  const { toast } = useToast();

  const navItems = [
    { name: 'Home', href: '/', type: 'route' },
    { name: 'Hotels & Homestays', href: '/hotels', type: 'route' },
    { name: 'Products', href: '#products', type: 'anchor' },
    { name: 'Blogs', href: '/blogs', type: 'route' },
    { name: 'Social Media', href: '#social', type: 'anchor' },
    { name: 'Contact', href: '#contact', type: 'anchor' },
  ];

  const handleNavClick = (item: { name: string; href: string; type: string }) => {
    if (item.type === 'route') {
      navigate(item.href);
    } else if (item.type === 'anchor') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(item.href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(item.href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Success',
        description: 'Signed out successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <Waves className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Konkan Darshan
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                {item.name}
              </button>
            ))}
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-4">
              {loading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-primary"></div>
              ) : user ? (
                <div className="flex items-center space-x-2">
                  {isAdmin() && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/admin')}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setAuthModalOpen(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-smooth"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="px-4 pt-2 border-t border-border mt-2">
              {loading ? (
                <div className="flex justify-center py-2">
                  <div className="w-6 h-6 animate-spin rounded-full border-b-2 border-primary"></div>
                </div>
              ) : user ? (
                <div className="space-y-2">
                  {isAdmin() && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        navigate('/admin');
                        setIsOpen(false);
                      }}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setIsOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;