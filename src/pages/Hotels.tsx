import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Star, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useHotels } from '@/hooks/useHotels';

const Hotels = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hotels, loading } = useHotels();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || 'all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [ratingFilter, setRatingFilter] = useState(searchParams.get('rating') || 'all');

  // Get unique locations and categories for filters
  const locations = Array.from(new Set(hotels.map(hotel => hotel.location)));
  const categories = Array.from(new Set(hotels.map(hotel => hotel.category)));

  // Filter hotels based on selected criteria
  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || hotel.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || hotel.location === locationFilter;
    const matchesPrice = hotel.price_per_night >= priceRange[0] && hotel.price_per_night <= priceRange[1];
    const matchesRating = ratingFilter === 'all' || hotel.rating >= parseFloat(ratingFilter);

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesRating;
  });

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (locationFilter !== 'all') params.set('location', locationFilter);
    if (ratingFilter !== 'all') params.set('rating', ratingFilter);
    setSearchParams(params);
  }, [searchTerm, categoryFilter, locationFilter, ratingFilter, setSearchParams]);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getAmenityIcon = (amenity: string) => {
    // Simple text display for amenities
    return amenity;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hotels & Homestays
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover authentic Konkani hospitality in carefully selected accommodations
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search hotels..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label htmlFor="price">Price Range</Label>
                  <div className="space-y-2">
                    <Slider
                      id="price"
                      min={0}
                      max={10000}
                      step={500}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground text-center">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label htmlFor="rating">Min Rating</Label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.0">4.0+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                      <SelectItem value="3.0">3.0+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hotels List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Loading accommodations...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-muted-foreground">
                    {filteredHotels.length} accommodation{filteredHotels.length !== 1 ? 's' : ''} found
                  </p>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHotels.map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer">
                      <div className="relative overflow-hidden">
                        <img
                          src={hotel.image_url || '/placeholder.svg'}
                          alt={hotel.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 tropical-gradient text-white">
                          {hotel.category.charAt(0).toUpperCase() + hotel.category.slice(1)}
                        </Badge>
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-semibold text-foreground">{hotel.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{hotel.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {hotel.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {getAmenityIcon(amenity)}
                            </Badge>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{hotel.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">{formatPrice(hotel.price_per_night)}</span>
                          <span className="text-muted-foreground text-sm ml-1">per night</span>
                        </div>
                        
                        <Button 
                          className="ocean-gradient text-white hover:shadow-soft transition-smooth"
                          onClick={() => navigate(`/hotel/${hotel.id}`)}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {filteredHotels.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">No accommodations found matching your criteria.</p>
                    <Button onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setLocationFilter('all');
                      setRatingFilter('all');
                      setPriceRange([0, 10000]);
                    }}>
                      Clear Filters
                    </Button>
                  </div>
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

export default Hotels;