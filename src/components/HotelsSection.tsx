import { MapPin, Star, Wifi, Car, Utensils, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHotels } from '@/hooks/useHotels';
import homestayHero from '@/assets/homestay-hero.jpg';

const HotelsSection = () => {
  const { hotels, loading } = useHotels();
  
  // Show only first 3 active hotels for the homepage
  const featuredHotels = hotels.slice(0, 3);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi':
        return <Wifi className="w-4 h-4" />;
      case 'Parking':
        return <Car className="w-4 h-4" />;
      case 'Restaurant':
      case 'Home Cooked Meals':
        return <Utensils className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <section id="hotels" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Hotels & Homestays
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience authentic Konkani hospitality in carefully selected accommodations
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Loading accommodations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((place) => (
              <Card key={place.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={place.image_url || homestayHero}
                    alt={place.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 tropical-gradient text-white">
                    {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold text-foreground">{place.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{place.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.amenities.slice(0, 3).map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-1 bg-accent px-2 py-1 rounded-md">
                        {getAmenityIcon(amenity)}
                        <span className="text-xs font-medium">{amenity}</span>
                      </div>
                    ))}
                    {place.amenities.length > 3 && (
                      <div className="bg-accent px-2 py-1 rounded-md">
                        <span className="text-xs font-medium">+{place.amenities.length - 3} more</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">₹{place.price_per_night.toLocaleString('en-IN')}</span>
                    <span className="text-muted-foreground text-sm ml-1">per night</span>
                  </div>
                  
                  <Button 
                    className="ocean-gradient text-white hover:shadow-soft transition-smooth"
                    disabled={!place.affiliate_link}
                    onClick={() => place.affiliate_link && window.open(place.affiliate_link, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelsSection;