import { supabase } from '@/integrations/supabase/client';

export const createSampleBlogs = async () => {
  const sampleBlogs = [
    {
      title: 'Discovering the Hidden Beaches of Konkan Coast',
      excerpt: 'Explore the pristine, untouched beaches along the Konkan coastline that offer serenity away from crowded tourist spots.',
      content: '<h2>The Untouched Beauty of Konkan</h2><p>The Konkan coast stretches along the western shore of Maharashtra, offering some of the most beautiful and secluded beaches in India. From the golden sands of Tarkarli to the pristine waters of Vengurla, each beach has its own unique charm.</p><h3>Best Hidden Beaches to Visit</h3><p><strong>1. Tarkarli Beach</strong> - Known for its crystal clear waters and water sports activities.</p><p><strong>2. Vengurla Beach</strong> - Perfect for those seeking tranquility and beautiful sunsets.</p><p><strong>3. Devbagh Beach</strong> - A secluded paradise with pristine white sand.</p><p>These beaches offer not just natural beauty but also rich cultural experiences with local fishing communities and authentic Konkani cuisine.</p>',
      author: 'Priya Sharma',
      category: 'Travel',
      tags: ['beaches', 'konkan', 'travel', 'hidden gems'],
      status: 'published' as const,
      image_url: null,
      views: 234
    },
    {
      title: 'Traditional Konkani Cuisine: A Culinary Journey',
      excerpt: 'Dive deep into the rich flavors and traditional cooking methods that make Konkani cuisine one of India\'s most underrated food cultures.',
      content: '<h2>The Rich Heritage of Konkani Food</h2><p>Konkani cuisine is a delightful blend of coastal flavors, coconut, and fresh seafood. The cooking traditions have been passed down through generations, creating a unique culinary identity.</p><h3>Must-Try Dishes</h3><p><strong>Sol Kadhi</strong> - A refreshing drink made with kokum and coconut milk.</p><p><strong>Fish Curry</strong> - The quintessential Konkani dish with fresh catch of the day.</p><p><strong>Modak</strong> - Sweet dumplings especially popular during Ganesh Chaturthi.</p><p>Each dish tells a story of the region\'s history, climate, and cultural influences from Portuguese and Marathi traditions.</p>',
      author: 'Chef Ramesh Naik',
      category: 'Food & Culture',
      tags: ['food', 'konkani', 'cuisine', 'traditional', 'culture'],
      status: 'published' as const,
      image_url: null,
      views: 189
    },
    {
      title: 'Sustainable Tourism in Konkan: Protecting Our Heritage',
      excerpt: 'Learn how responsible tourism practices are helping preserve the natural beauty and cultural heritage of the Konkan region.',
      content: '<h2>Tourism with a Purpose</h2><p>As the Konkan region gains popularity among travelers, it becomes crucial to adopt sustainable tourism practices that protect our environment and support local communities.</p><h3>How You Can Help</h3><p><strong>Choose Eco-Friendly Accommodations</strong> - Stay at places that follow sustainable practices.</p><p><strong>Support Local Artisans</strong> - Buy authentic handicrafts and products from local makers.</p><p><strong>Respect Marine Life</strong> - Follow guidelines when participating in water activities.</p><p>By making conscious choices, we can ensure that future generations can also enjoy the pristine beauty of Konkan.</p>',
      author: 'Dr. Anita Kulkarni',
      category: 'Environment',
      tags: ['sustainability', 'tourism', 'environment', 'conservation'],
      status: 'published' as const,
      image_url: null,
      views: 156
    },
    {
      title: 'Festival Calendar: Celebrating Konkani Culture Year-Round',
      excerpt: 'A comprehensive guide to the vibrant festivals and cultural celebrations that bring the Konkan region to life throughout the year.',
      content: '<h2>Festivals That Define Konkan</h2><p>The Konkan region comes alive with numerous festivals throughout the year, each reflecting the rich cultural tapestry of the area.</p><h3>Major Festivals</h3><p><strong>Ganesh Chaturthi</strong> - The most celebrated festival with elaborate decorations and processions.</p><p><strong>Narali Purnima</strong> - Coconut festival marking the end of monsoon season.</p><p><strong>Gudi Padwa</strong> - Marathi New Year celebrated with traditional fervor.</p><p>These festivals offer visitors a chance to experience authentic Konkani culture and participate in age-old traditions.</p>',
      author: 'Cultural Team',
      category: 'Culture',
      tags: ['festivals', 'culture', 'traditions', 'celebrations'],
      status: 'published' as const,
      image_url: null,
      views: 298
    },
    {
      title: 'Adventure Sports in Konkan: Beyond the Beaches',
      excerpt: 'Discover thrilling adventure activities available in the Konkan region, from water sports to trekking in the Western Ghats.',
      content: '<h2>Adrenaline Rush in Paradise</h2><p>While Konkan is famous for its beaches, the region offers numerous adventure activities for thrill-seekers.</p><h3>Top Adventure Activities</h3><p><strong>Scuba Diving at Malvan</strong> - Explore underwater coral gardens and marine life.</p><p><strong>Parasailing at Tarkarli</strong> - Get a bird\'s eye view of the coastline.</p><p><strong>Trekking in Sahyadri Hills</strong> - Experience the Western Ghats\' biodiversity.</p><p><strong>River Rafting</strong> - Navigate through the rapids of coastal rivers.</p><p>Each activity offers a unique perspective of the region\'s natural beauty and biodiversity.</p>',
      author: 'Adventure Team',
      category: 'Adventure',
      tags: ['adventure', 'sports', 'activities', 'outdoors'],
      status: 'draft' as const,
      image_url: null,
      views: 45
    },
    {
      title: 'Architectural Marvels: Ancient Temples and Forts of Konkan',
      excerpt: 'Explore the rich architectural heritage of Konkan through its ancient temples, Portuguese churches, and Maratha forts.',
      content: '<h2>Living History in Stone</h2><p>The Konkan region boasts a rich architectural heritage that spans several centuries and reflects various cultural influences.</p><h3>Notable Structures</h3><p><strong>Sindhudurg Fort</strong> - A sea fort built by Chhatrapati Shivaji Maharaj.</p><p><strong>Kunkeshwar Temple</strong> - Ancient Shiva temple with stunning architecture.</p><p><strong>Cabo de Rama Fort</strong> - Portuguese fort with panoramic sea views.</p><p>These structures not only showcase architectural brilliance but also tell stories of the region\'s turbulent and glorious past.</p>',
      author: 'Heritage Team',
      category: 'History',
      tags: ['architecture', 'heritage', 'temples', 'forts', 'history'],
      status: 'published' as const,
      image_url: null,
      views: 167
    }
  ];

  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert(sampleBlogs)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating sample blogs:', error);
    throw error;
  }
};

export const createSampleHotels = async () => {
  const sampleHotels = [
    {
      name: 'Seaside Serenity Homestay',
      description: 'Experience authentic Konkani hospitality in our traditional homestay located just 100 meters from the pristine Tarkarli beach. Our family-run accommodation offers comfortable rooms with modern amenities while maintaining the charm of local architecture.',
      location: 'Tarkarli, Sindhudurg',
      price_per_night: 2500,
      rating: 4.7,
      category: 'homestay' as const,
      amenities: ['Free WiFi', 'Home-cooked meals', 'Beach access', 'Fishing trips', 'Cultural programs'],
      status: 'active' as const,
      image_url: null
    },
    {
      name: 'Ocean View Resort & Spa',
      description: 'Luxury resort offering panoramic ocean views, world-class spa services, and fine dining. Perfect for romantic getaways and family vacations with private beach access and water sports facilities.',
      location: 'Malvan, Sindhudurg',
      price_per_night: 5800,
      rating: 4.9,
      category: 'resort' as const,
      amenities: ['Spa services', 'Private beach', 'Water sports', 'Swimming pool', 'Fine dining', 'Room service'],
      status: 'active' as const,
      image_url: null
    },
    {
      name: 'Heritage Villa Konkan',
      description: 'A beautifully restored Portuguese-era villa offering a blend of historical charm and modern comfort. Located in the heart of Old Goa with easy access to beaches and cultural sites.',
      location: 'Panaji, Goa',
      price_per_night: 4200,
      rating: 4.5,
      category: 'villa' as const,
      amenities: ['Historical architecture', 'Garden', 'Free WiFi', 'Breakfast included', 'Tour arrangements'],
      status: 'active' as const,
      image_url: null
    },
    {
      name: 'Backwater Bliss Hotel',
      description: 'Modern hotel situated along the peaceful backwaters with comfortable rooms, multi-cuisine restaurant, and boat ride facilities. Ideal for nature lovers and photography enthusiasts.',
      location: 'Ratnagiri, Maharashtra',
      price_per_night: 3200,
      rating: 4.3,
      category: 'hotel' as const,
      amenities: ['Backwater views', 'Boat rides', 'Restaurant', 'Free parking', 'Conference facilities'],
      status: 'active' as const,
      image_url: null
    },
    {
      name: 'Coastal Cottage Retreat',
      description: 'Charming cottages set amidst coconut groves offering a perfect escape from city life. Each cottage is equipped with modern amenities while maintaining rustic charm.',
      location: 'Vengurla, Maharashtra',
      price_per_night: 2800,
      rating: 4.6,
      category: 'homestay' as const,
      amenities: ['Coconut grove setting', 'Traditional architecture', 'Organic meals', 'Nature walks', 'Yoga sessions'],
      status: 'active' as const,
      image_url: null
    },
    {
      name: 'Royal Konkan Palace',
      description: 'Elegant hotel inspired by Maratha architecture offering luxury accommodations with traditional hospitality. Features include rooftop restaurant, spa, and cultural performances.',
      location: 'Kolhapur, Maharashtra',
      price_per_night: 4500,
      rating: 4.4,
      category: 'hotel' as const,
      amenities: ['Traditional architecture', 'Rooftop dining', 'Cultural shows', 'Spa', 'Valet parking', 'Business center'],
      status: 'active' as const,
      image_url: null
    }
  ];

  try {
    const { data, error } = await supabase
      .from('hotels')
      .insert(sampleHotels)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating sample hotels:', error);
    throw error;
  }
};

export const initializeSampleData = async () => {
  try {
    // Check if data already exists
    const { data: existingBlogs } = await supabase.from('blogs').select('id').limit(1);
    const { data: existingHotels } = await supabase.from('hotels').select('id').limit(1);

    if (!existingBlogs?.length) {
      await createSampleBlogs();
      console.log('Sample blogs created successfully');
    }

    if (!existingHotels?.length) {
      await createSampleHotels();
      console.log('Sample hotels created successfully');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};