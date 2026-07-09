export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Hardware' | 'Filament' | 'Decor' | 'Accessories';
  image: string;
  description: string;
  mood?: 'Calm' | 'Playful' | 'Cozy' | 'Curious';
  colorPalette?: string;
  isReadyToShip?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  accentText: string;
}

export interface RealSpaceItem {
  id: string;
  image: string;
  title: string;
  productName: string;
}

const RAW_PRODUCTS: Product[] = [
  {
    "id": "moomin-inspired-organizer",
    "name": "Moomin-Inspired Organizer",
    "price": 24,
    "category": "Hardware",
    "image": "https://3dvinci.space/wp-content/uploads/2026/07/moomin.png",
    "description": "Designed with both aesthetics and functionality in mind, this organizer is more than simple storage—it&#8217;s a decorative piece that encourages organization while celebrating a beloved childhood classic."
  },
  {
    "id": "ballet-shoe-keychain",
    "name": "Ballet Shoe Keychain",
    "price": 29,
    "category": "Accessories",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/ballet-shoe.png",
    "description": "A delicate and charming ballet shoe keychain inspired by the elegance of dance. Stylish and beautifully detailed, it adds a graceful touch to keys or bags—perfect for ballet lovers of all ages."
  },
  {
    "id": "coloring-panels-set-3-pieces",
    "name": "Coloring Panels Set (3 pieces)",
    "price": 34,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/coloring-set.png",
    "description": "Mandala-pattern coloring panels designed for creative play, relaxation, and skill development. Perfect for children and adults, these panels can be colored with acrylic markers or paint."
  },
  {
    "id": "rain-boot-organizer",
    "name": "Rain Boot Organizer",
    "price": 39,
    "category": "Accessories",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/croc-boot-4.png",
    "description": "A playful multi-purpose organizer designed in the shape of a rain boot. Perfect for everyday essentials, it adds cheerful character while keeping your space beautifully organized."
  },
  {
    "id": "multi-purpose-organizer-basket",
    "name": "Multi-Purpose Organizer Basket",
    "price": 44,
    "category": "Hardware",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/croc-bag-1.png",
    "description": "A stylish and versatile organizer designed to keep everyday essentials neatly in place. Perfect for pens and stationery, makeup tools, kitchen utensils, craft supplies, and more."
  },
  {
    "id": "the-playful-shapes-full-set",
    "name": "The Playful Shapes (Full Set)",
    "price": 49,
    "category": "Filament",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/modular-geometric-lamp.png",
    "description": "A lamp designed to evolve with your imagination. Fully modular geometric lighting system that allows you to rearrange, personalize, and redesign it whenever inspiration strikes."
  },
  {
    "id": "lipstick-holder-keychain",
    "name": "Lipstick Holder Keychain",
    "price": 54,
    "category": "Accessories",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/lipstick-holder-01.png",
    "description": "A stylish and practical lipstick holder keychain designed to keep your favorite lip balm or lipstick close at hand. The perfect blend of functionality and elegance for busy days on the go."
  },
  {
    "id": "hexa-fidget-keychain",
    "name": "Hexa Fidget Keychain",
    "price": 59,
    "category": "Accessories",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/hexa-diget-01.png",
    "description": "A sleek geometric keychain offers a soothing tactile experience that promotes focus, relaxation, and emotional regulation for both children and adults—while doubling as a stylish everyday accessory."
  },
  {
    "id": "the-moodies-lamp-dreamy",
    "name": "The Moodies Lamp &#8211; Dreamy",
    "price": 64,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/moody-04.png",
    "description": "Soft, thoughtful, and full of imagination – Dreamy brings warmth and personality into your home through playful design and ambient lighting."
  },
  {
    "id": "the-moodies-lamp-angry",
    "name": "The Moodies Lamp &#8211; Angry",
    "price": 69,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/moody-03.png",
    "description": "Bold, expressive, and full of character – this unique lamp brings personality into your space through playful design and warm ambient lighting."
  },
  {
    "id": "the-moodies-lamp-shy",
    "name": "The Moodies Lamp &#8211; Shy",
    "price": 74,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/moody-01.png",
    "description": "A gentle glow with a quiet personality. Part of the whimsical Moody Lamp Collection, designed to bring warmth, comfort, and character into any space."
  },
  {
    "id": "the-moodies-lamp-chill",
    "name": "The Moodies Lamp &#8211; Chill",
    "price": 79,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/moody-02.png",
    "description": "Part of the Moody Lamp Collection with easy customization. It has a playful design that looks great on desks, shelves, gaming setups, bedrooms, and creative workspaces"
  },
  {
    "id": "the-moodies-lamp-collection",
    "name": "The Moodies Lamp Collection",
    "price": 84,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/moody-lamps-collection.png",
    "description": "A collection of character-inspired lamps designed to bring emotion, warmth, and personality into your home. Crafted from premium-quality PLA and customizable in a variety of colours."
  },
  {
    "id": "the-people-lamps",
    "name": "The People Lamps",
    "price": 89,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/lampies-product-pics.005-scaled.png",
    "description": "A customizable character lamp featuring interchangeable hats and accessories, with a decorative design, making it ideal for desks, shelves, bedrooms, studios, and creative workspaces."
  },
  {
    "id": "pirosmani-inspired-bookmark-set",
    "name": "Pirosmani-Inspired Bookmark Set",
    "price": 94,
    "category": "Accessories",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/bookmarks-set.png",
    "description": "A unique set of bookmarks inspired by the timeless artistry of Niko Pirosmani. These bookmarks transform everyday reading into an artistic experience."
  },
  {
    "id": "ballerina",
    "name": "Ballerina",
    "price": 99,
    "category": "Accessories",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/ballerina.png",
    "description": "A graceful bookmark inspired by the poetic figures of Niko Pirosmani, crafted from premium materials in vibrant colours."
  },
  {
    "id": "giraffe",
    "name": "Giraffe",
    "price": 104,
    "category": "Hardware",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/giraffe-01.png",
    "description": "An elegant bookmark inspired by Niko Pirosmani&#8217;s famous giraffe painting, brought to life through premium 3D printing and vibrant colour."
  },
  {
    "id": "girl-with-balloon",
    "name": "Girl with Balloon",
    "price": 109,
    "category": "Filament",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/girl-with-balloon-01.png",
    "description": "A charming bookmark inspired by the whimsical spirit of Niko Pirosmani&#8217;s paintings, crafted from premium materials with vibrant colours and artistic detail."
  },
  {
    "id": "lumina-tealight-collection",
    "name": "Lumina Tealight Collection",
    "price": 114,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/lumina-collection.png",
    "description": "Create warm, cozy vibes for summer evenings, relaxing nights, and unforgettable parties with our modern tealight lamp collection."
  },
  {
    "id": "twist-lamp",
    "name": "Aurora Twist Lamp",
    "price": 119,
    "category": "Decor",
    "image": "https://3dvinci.space/wp-content/uploads/2026/06/lamp-01.png",
    "description": "The Lamp features a sculptural spiral silhouette, luxurious light diffusion, and a durable wood-infused base, creating an elegant atmosphere in any interior."
  }
];

export function proxyImageUrl(url: string): string {
  if (url && url.startsWith('https://')) {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export const PRODUCTS: Product[] = RAW_PRODUCTS.map(p => ({
  ...p,
  image: proxyImageUrl(p.image)
}));

export const COLLECTIONS: Collection[] = [
  {
    id: 'hardware',
    name: '3D Printers',
    description: 'Professional grade additive manufacturing hardware, tested by our lab.',
    accentText: 'Industrial Precision',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'filament',
    name: 'Performance Filaments',
    description: 'Our top picks for reliable, high-speed materials that deliver consistent dimensional accuracy.',
    accentText: 'Material Science',
    image: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?auto=format&fit=crop&w=800&q=80'
  }
];

export const REAL_SPACES: RealSpaceItem[] = [
  {
    id: 'rs-1',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    title: 'A Sunny Morning Bedside',
    productName: 'Self-Watering Planters'
  },
  {
    id: 'rs-2',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    title: 'Minimal Dining Credenza',
    productName: 'Tetris Balance Challenge'
  }
];
