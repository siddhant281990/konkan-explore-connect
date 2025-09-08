import { MapPin, Phone, Mail, Waves, Instagram, Youtube, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Waves className="w-8 h-8 text-highlight" />
              <span className="text-2xl font-bold">Konkan Darshan</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Your gateway to experiencing the authentic beauty, culture, and flavors of the Konkan coast. 
              Discover hidden gems, taste local delicacies, and create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Home
                </a>
              </li>
              <li>
                <a href="#hotels" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Hotels & Homestays
                </a>
              </li>
              <li>
                <a href="#products" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Local Products
                </a>
              </li>
              <li>
                <a href="#blogs" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Travel Blogs
                </a>
              </li>
              <li>
                <a href="#social" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Social Media
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80">
                    Konkan Coast, Maharashtra
                  </p>
                  <p className="text-primary-foreground/80">
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-highlight" />
                <span className="text-primary-foreground/80">+91 98765 43210</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-highlight" />
                <span className="text-primary-foreground/80">info@konkandardshan.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Konkan Darshan. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-smooth">
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;