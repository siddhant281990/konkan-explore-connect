import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HotelsSection from '@/components/HotelsSection';
import ProductsSection from '@/components/ProductsSection';
import BlogSection from '@/components/BlogSection';
import SocialMediaSection from '@/components/SocialMediaSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HotelsSection />
      <ProductsSection />
      <BlogSection />
      <SocialMediaSection />
      <Footer />
    </div>
  );
};

export default Index;
