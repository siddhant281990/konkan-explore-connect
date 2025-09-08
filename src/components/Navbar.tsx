import { useState } from 'react';
import { Menu, X, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', type: 'route' },
    { name: 'Hotels & Homestays', href: '#hotels', type: 'anchor' },
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
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4"
              onClick={() => navigate('/admin')}
            >
              Admin
            </Button>
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
            <div className="px-4 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  navigate('/admin');
                  setIsOpen(false);
                }}
              >
                Admin
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;