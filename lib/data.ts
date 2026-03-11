import { Product } from "./store";

export const products: Product[] = [
  {
    id: 1,
    name: "Signature Garam Masala",
    price: 12.99,
    originalPrice: 17.99,
    rating: 4.8,
    reviewCount: 324,
    image: "/images/product-spice-mix.jpg",
    category: "Spice Mixes",
    badge: "Best Seller",
    description:
      "A perfectly balanced blend of aromatic whole spices, slow-roasted and ground fresh to deliver deep, complex flavors to any dish.",
    ingredients: "Coriander, Cumin, Cardamom, Black Pepper, Cloves, Cinnamon, Bay Leaves",
    weight: "100g",
  },
  {
    id: 2,
    name: "Biryani Magic Mix",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.9,
    reviewCount: 512,
    image: "/images/product-ready-mix.jpg",
    category: "Ready Mix",
    badge: "New",
    description:
      "Everything you need for a fragrant, restaurant-quality biryani at home. Just add your protein and rice.",
    ingredients: "Biryani spice blend, fried onion, saffron, rose water, mint",
    weight: "200g",
  },
  {
    id: 3,
    name: "Festive Spice Combo",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 189,
    image: "/images/product-combo.jpg",
    category: "Combo Packs",
    badge: "Save 30%",
    description:
      "A curated gift box of our five most-loved spice blends. Perfect for gifting or stocking your pantry.",
    ingredients: "Garam Masala, Turmeric, Chaat Masala, Tandoori Mix, Chole Masala",
    weight: "500g (5×100g)",
  },
  {
    id: 4,
    name: "Tandoori Bliss",
    price: 11.49,
    originalPrice: 14.99,
    rating: 4.6,
    reviewCount: 278,
    image: "/images/category-spices.jpg",
    category: "Spice Mixes",
    badge: "Popular",
    description:
      "Authentic tandoori spice blend with the perfect balance of heat and smokiness.",
    ingredients: "Paprika, Cumin, Coriander, Garam Masala, Fenugreek, Turmeric",
    weight: "100g",
  },
  {
    id: 5,
    name: "Butter Chicken Ready Mix",
    price: 13.49,
    originalPrice: 16.99,
    rating: 4.8,
    reviewCount: 401,
    image: "/images/category-ready.jpg",
    category: "Ready Mix",
    badge: "Fan Favorite",
    description:
      "Silky, creamy butter chicken sauce with our signature spice blend — ready in 20 minutes.",
    ingredients: "Tomato powder, Cashew, Cream powder, Garam Masala, Fenugreek",
    weight: "150g",
  },
  {
    id: 6,
    name: "Starter Pack Trio",
    price: 24.99,
    originalPrice: 35.99,
    rating: 4.9,
    reviewCount: 94,
    image: "/images/category-combo.jpg",
    category: "Combo Packs",
    badge: "New",
    description:
      "Three essential spice mixes to get you started on authentic Indian cooking. Great for beginners.",
    ingredients: "Garam Masala, Turmeric, Red Chili Powder",
    weight: "300g (3×100g)",
  },
  {
    id: 7,
    name: "Smoky BBQ Masala",
    price: 10.99,
    rating: 4.5,
    reviewCount: 167,
    image: "/images/category-bestsellers.jpg",
    category: "Spice Mixes",
    description:
      "A bold smoky rub that transforms grilled meats and vegetables into crowd-pleasing favorites.",
    ingredients: "Smoked paprika, Cumin, Garlic, Coriander, Chili, Brown sugar",
    weight: "100g",
  },
  {
    id: 8,
    name: "Dal Tadka Mix",
    price: 9.99,
    originalPrice: 12.99,
    rating: 4.7,
    reviewCount: 233,
    image: "/images/product-spice-mix.jpg",
    category: "Ready Mix",
    badge: "Trending",
    description:
      "Authentic Dal Tadka flavors in a convenient mix. Rich, earthy, and comforting.",
    ingredients: "Cumin, Mustard seeds, Turmeric, Dried mango, Asafoetida",
    weight: "150g",
  },
];

export const categories = [
  {
    id: 1,
    name: "Spice Mixes",
    description: "Handcrafted blends",
    image: "/images/category-spices.jpg",
    count: 24,
  },
  {
    id: 2,
    name: "Ready Mix",
    description: "Meal-ready packets",
    image: "/images/category-ready.jpg",
    count: 18,
  },
  {
    id: 3,
    name: "Combo Packs",
    description: "Curated gift sets",
    image: "/images/category-combo.jpg",
    count: 12,
  },
  {
    id: 4,
    name: "Best Sellers",
    description: "Most loved picks",
    image: "/images/category-bestsellers.jpg",
    count: 10,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "London, UK",
    rating: 5,
    review:
      "The Garam Masala is absolutely incredible. My family thinks I've been taking cooking classes — the secret is Masala & Co.!",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Marcus Reid",
    location: "Toronto, Canada",
    rating: 5,
    review:
      "I've tried dozens of spice brands and nothing comes close. The quality and freshness are unmatched. My go-to for everything.",
    avatar: "MR",
  },
  {
    id: 3,
    name: "Fatima Al-Rashid",
    location: "Dubai, UAE",
    rating: 5,
    review:
      "The Festive Combo Pack made for the perfect Eid gift. Every single blend was beautiful and the packaging is gift-ready.",
    avatar: "FA",
  },
  {
    id: 4,
    name: "James Chen",
    location: "Sydney, Australia",
    rating: 4,
    review:
      "The Butter Chicken Ready Mix is a weeknight lifesaver. Restaurant-quality at home in less than 30 minutes. Highly recommend!",
    avatar: "JC",
  },
];
