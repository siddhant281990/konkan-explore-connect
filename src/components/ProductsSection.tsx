import { ShoppingCart, Star, Package, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import productsHero from '@/assets/products-hero.jpg';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Konkan Coconut Oil',
      category: 'Oil & Spices',
      price: 450,
      originalPrice: 500,
      rating: 4.9,
      image: productsHero,
      description: 'Pure cold-pressed coconut oil from Konkan farms',
      organic: true,
      inStock: true
    },
    {
      id: 2,
      name: 'Kokum Syrup',
      category: 'Beverages',
      price: 320,
      originalPrice: 380,
      rating: 4.8,
      image: productsHero,
      description: 'Refreshing traditional kokum drink concentrate',
      organic: true,
      inStock: true
    },
    {
      id: 3,
      name: 'Alphonso Mangoes',
      category: 'Fresh Fruits',
      price: 800,
      originalPrice: 900,
      rating: 5.0,
      image: productsHero,
      description: 'King of mangoes from Ratnagiri',
      organic: true,
      inStock: false
    },
    {
      id: 4,
      name: 'Cashew Nuts Premium',
      category: 'Dry Fruits',
      price: 650,
      originalPrice: 750,
      rating: 4.7,
      image: productsHero,
      description: 'Premium quality cashews from Konkan coast',
      organic: false,
      inStock: true
    },
    {
      id: 5,
      name: 'Fish Curry Masala',
      category: 'Spices',
      price: 180,
      originalPrice: 220,
      rating: 4.8,
      image: productsHero,
      description: 'Authentic Konkani fish curry spice blend',
      organic: true,
      inStock: true
    },
    {
      id: 6,
      name: 'Handmade Pottery Set',
      category: 'Handicrafts',
      price: 1200,
      originalPrice: 1400,
      rating: 4.6,
      image: productsHero,
      description: 'Traditional Konkan clay pottery set',
      organic: false,
      inStock: true
    }
  ];

  const addToCart = (productId: number) => {
    // This will need backend functionality
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-highlight bg-clip-text text-transparent">
            Konkan Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic local products straight from the heart of Konkan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.organic && (
                    <Badge className="tropical-gradient text-white">
                      <Leaf className="w-3 h-3 mr-1" />
                      Organic
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-4 right-4 sunset-gradient text-white">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button
                  className="flex-1 ocean-gradient text-white hover:shadow-soft transition-smooth"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button variant="outline" size="sm">
                  <Package className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;