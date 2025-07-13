import React, { useState, createContext, useContext } from 'react';
import { ShoppingCart, Menu, X, Star, Plus, Minus, Search, User, Heart, Globe, DollarSign, ChevronDown } from 'lucide-react';

// Context for Cart Management
const CartContext = createContext();

// Currency and Language Data
const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

// Sample product data - Electronics & Parts with old money aesthetic pricing
const products = [
  {
    id: 1,
    name: "iPhone 12 Pro - Heritage Screen Damage",
    price: 299,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    category: "Smartphones",
    condition: "Defective",
    description: "Exquisite iPhone 12 Pro with distinguished screen damage. Impeccable internals maintain their pristine functionality. A gentleman's choice for restoration projects.",
    rating: 4.2,
    reviews: 87,
    defects: "Cracked screen, minor patina"
  },
  {
    id: 2,
    name: "MacBook Pro Logic Board - Vintage 2019",
    price: 450,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
    category: "Computer Parts",
    condition: "Working",
    description: "Pristine logic board from a distinguished MacBook Pro 2019. Thoroughly tested by our artisans. Includes all premium components.",
    rating: 4.8,
    reviews: 23,
    defects: "None - Pristine condition"
  },
  {
    id: 3,
    name: "Galaxy S21 - Aquatic Heritage Damage",
    price: 175,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop",
    category: "Smartphones",
    condition: "Defective",
    description: "Distinguished Samsung Galaxy S21 with aquatic heritage. Screen and optics remain impeccable. Perfect for the discerning restorer.",
    rating: 3.9,
    reviews: 56,
    defects: "Water heritage, charging port character"
  },
  {
    id: 4,
    name: "Dell XPS 13 - Classic Keyboard Character",
    price: 520,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop",
    category: "Laptops",
    condition: "Defective",
    description: "Refined Dell XPS 13 with keyboard character. Display and motherboard in distinguished condition. Ideal for external keyboard connoisseurs.",
    rating: 4.1,
    reviews: 34,
    defects: "Keyboard character, trackpad distinction"
  },
  {
    id: 5,
    name: "Nintendo Switch OLED - Artisan Display",
    price: 89,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
    category: "Gaming Parts",
    condition: "Working",
    description: "Pristine Nintendo Switch OLED replacement display. Crafted to perfection, never used. A collector's choice for restoration.",
    rating: 4.9,
    reviews: 145,
    defects: "None - Mint condition"
  },
  {
    id: 6,
    name: "iPad Air 4 - Architectural Frame Design",
    price: 380,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    category: "Tablets",
    condition: "Defective",
    description: "Distinguished iPad Air 4 with architectural frame design. Internals maintain their excellence. Perfect for creative restoration projects.",
    rating: 4.0,
    reviews: 78,
    defects: "Sculptural frame, gentle screen lift"
  },
  {
    id: 7,
    name: "PlayStation 5 - Whisper Cooling System",
    price: 45,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop",
    category: "Gaming Parts",
    condition: "Working",
    description: "Premium PlayStation 5 cooling assembly. Extracted from working console. Operates with distinguished quietude.",
    rating: 4.7,
    reviews: 92,
    defects: "None - Pristine operation"
  },
  {
    id: 8,
    name: "AirPods Pro - Charging Sanctuary",
    price: 35,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop",
    category: "Audio Parts",
    condition: "Working",
    description: "Elegant AirPods Pro charging sanctuary. Maintains full charging capabilities. Perfect replacement for the discerning audiophile.",
    rating: 4.5,
    reviews: 67,
    defects: "Gentle exterior patina"
  }
];

// Currency/Language Dropdown Component
const CurrencyLanguageDropdown = ({ currencies, languages, currentCurrency, currentLanguage, onCurrencyChange, onLanguageChange }) => {
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  
  return (
    <div className="flex items-center space-x-4">
      {/* Currency Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setShowCurrency(!showCurrency)}
          className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors bg-stone-50 px-3 py-2 rounded-lg border border-stone-200"
        >
          <DollarSign className="w-4 h-4" />
          <span className="text-sm font-medium">{currentCurrency.code}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showCurrency && (
          <div className="absolute top-full mt-1 right-0 bg-white border border-stone-200 rounded-lg shadow-lg z-50 w-48">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onCurrencyChange(currency);
                  setShowCurrency(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-stone-50 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="font-medium">{currency.symbol} {currency.code}</span>
                <span className="text-stone-600 ml-2">{currency.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Language Dropdown */}
      <div className="relative">
        <button 
          onClick={() => setShowLanguage(!showLanguage)}
          className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors bg-stone-50 px-3 py-2 rounded-lg border border-stone-200"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLanguage.flag}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {showLanguage && (
          <div className="absolute top-full mt-1 right-0 bg-white border border-stone-200 rounded-lg shadow-lg z-50 w-48">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onLanguageChange(language);
                  setShowLanguage(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-stone-50 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="mr-2">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ currentPage, setCurrentPage, cartItems, currentCurrency, currentLanguage, onCurrencyChange, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="bg-stone-50 border-b border-stone-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-stone-800 p-3 rounded-lg mr-3">
              <span className="text-stone-100 text-xl font-bold">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-stone-800">COMMODRE</h1>
              
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-stone-700 hover:text-stone-900 transition-colors font-medium ${currentPage === 'home' ? 'text-stone-900 border-b-2 border-stone-800 pb-1' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('products')}
              className={`text-stone-700 hover:text-stone-900 transition-colors font-medium ${currentPage === 'products' ? 'text-stone-900 border-b-2 border-stone-800 pb-1' : ''}`}
            >
              Collection
            </button>
            <button className="text-stone-700 hover:text-stone-900 transition-colors font-medium">Heritage</button>
            <button className="text-stone-700 hover:text-stone-900 transition-colors font-medium">Contact</button>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <CurrencyLanguageDropdown 
              currencies={currencies}
              languages={languages}
              currentCurrency={currentCurrency}
              currentLanguage={currentLanguage}
              onCurrencyChange={onCurrencyChange}
              onLanguageChange={onLanguageChange}
            />
            <Search className="w-5 h-5 cursor-pointer text-stone-600 hover:text-stone-800 transition-colors" />
            <User className="w-5 h-5 cursor-pointer text-stone-600 hover:text-stone-800 transition-colors" />
            <Heart className="w-5 h-5 cursor-pointer text-stone-600 hover:text-stone-800 transition-colors" />
            <div className="relative">
              <ShoppingCart 
                className="w-5 h-5 cursor-pointer text-stone-600 hover:text-stone-800 transition-colors"
                onClick={() => setCurrentPage('cart')}
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-800 text-stone-100 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-700 hover:text-stone-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-stone-100 border-t border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:text-stone-900 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('products'); setIsMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:text-stone-900 transition-colors"
            >
              Collection
            </button>
            <button 
              onClick={() => { setCurrentPage('cart'); setIsMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:text-stone-900 transition-colors"
            >
              Cart ({cartItemCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Product Card Component
const ProductCard = ({ product, onAddToCart, onClick, currentCurrency }) => {
  const conditionColor = product.condition === 'Working' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200';
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md hover:border-stone-300 transition-all duration-300 cursor-pointer">
      <div onClick={onClick} className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white bg-opacity-95 p-2 rounded-full shadow-sm">
          <Heart className="w-4 h-4 text-stone-600 hover:text-rose-600 transition-colors" />
        </div>
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${conditionColor}`}>
          {product.condition}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-stone-600 font-medium tracking-wide">{product.category.toUpperCase()}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="text-sm text-stone-600 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-stone-800 mb-3 leading-tight">{product.name}</h3>
        <p className="text-stone-600 text-sm mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
        <p className="text-xs text-stone-500 mb-4 font-medium border-l-2 border-stone-200 pl-2">Condition: {product.defects}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-stone-900">{currentCurrency.symbol}{product.price.toLocaleString()}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="bg-stone-800 text-stone-100 px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-stone-800 p-3 rounded-lg mr-3">
                <span className="text-stone-100 text-xl font-bold">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800">COMMODRE</h3>
              </div>
            </div>
            <p className="text-stone-600 leading-relaxed">Curating distinguished electronics since 2018. Preserving heritage through restoration and sustainable technology practices.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-stone-800">Collections</h4>
            <ul className="space-y-2 text-stone-600">
              <li><a href="#" className="hover:text-stone-800 transition-colors">Heritage Smartphones</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Classic Computer Parts</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Vintage Gaming</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Audio Heritage</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-stone-800">Services</h4>
            <ul className="space-y-2 text-stone-600">
              <li><a href="#" className="hover:text-stone-800 transition-colors">Concierge Service</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Restoration Guide</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">White Glove Delivery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-stone-800">Connect</h4>
            <ul className="space-y-2 text-stone-600">
              <li><a href="#" className="hover:text-stone-800 transition-colors">Private Newsletter</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-stone-800 transition-colors">Heritage Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-200 mt-12 pt-8 text-center text-stone-500">
          <p>&copy;Commodre Electronics. All rights reserved. Sustainable technology heritage.</p>
        </div>
      </div>
    </footer>
  );
};

// Homepage Component
const Homepage = ({ onAddToCart, onProductClick, currentCurrency }) => {
  const featuredProducts = products.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 flex items-center justify-center">
        <div className="absolute inset-0 bg-white bg-opacity-30"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-wide text-stone-800 leading-tight">
            Refined Electronics
            <br />
            <span className="font-bold">Heritage</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-stone-600 leading-relaxed max-w-3xl mx-auto font-light">
            Discover meticulously curated vintage electronics and distinguished components. Every piece tells a story of craftsmanship and potential restoration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-stone-800 text-stone-100 px-8 py-4 rounded-lg font-medium hover:bg-stone-700 transition-colors text-lg">
              Explore Collection
            </button>
            <button className="border-2 border-stone-800 text-stone-800 px-8 py-4 rounded-lg font-medium hover:bg-stone-800 hover:text-stone-100 transition-colors text-lg">
              Heritage Guide
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-stone-800 mb-6">Curated Selection</h2>
            <p className="text-stone-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Handpicked electronics and components for the discerning collector. Each piece has been carefully evaluated by our restoration specialists.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
                onClick={() => onProductClick(product)}
                currentCurrency={currentCurrency}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-light text-stone-800 mb-8">Heritage & Sustainability</h2>
              <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                Since 2018, Commodre has been the discerning collector's destination for vintage electronics and distinguished components. We believe in preserving technological heritage through careful restoration and sustainable practices.
              </p>
              <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                Each device undergoes meticulous inspection by our certified artisans. We maintain complete transparency about provenance and condition, ensuring our clients receive only the finest pieces for their collections or restoration projects.
              </p>
              <p className="text-stone-600 mb-8 text-lg leading-relaxed">
                Join our community of collectors, restorers, and heritage enthusiasts. Together, we're building a sustainable future through the preservation of technological craftsmanship.
              </p>
              <button className="bg-stone-800 text-stone-100 px-8 py-4 rounded-lg font-medium hover:bg-stone-700 transition-colors">
                Our Heritage Story
              </button>
            </div>
            <div className="bg-stone-200 h-96 rounded-lg flex items-center justify-center shadow-inner">
              <div className="text-center">
                <div className="text-8xl mb-6 text-stone-600">⚡</div>
                <span className="text-stone-600 text-xl font-light">Restoration & Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-5xl font-light text-stone-800 mb-4">5,000+</div>
              <div className="text-stone-600 text-lg">Devices Restored</div>
            </div>
            <div className="p-8">
              <div className="text-5xl font-light text-stone-800 mb-4">98%</div>
              <div className="text-stone-600 text-lg">Client Satisfaction</div>
            </div>
            <div className="p-8">
              <div className="text-5xl font-light text-stone-800 mb-4">15</div>
              <div className="text-stone-600 text-lg">Countries Served</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Products Page Component
const ProductsPage = ({ onAddToCart, onProductClick, currentCurrency }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Smartphones', 'Computer Parts', 'Laptops', 'Tablets', 'Gaming Parts', 'Audio Parts'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-light text-stone-800 mb-6">Heritage Collection</h1>
          <p className="text-stone-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Browse our complete inventory of distinguished electronics and components, each piece professionally assessed and thoughtfully categorized.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-stone-800 text-stone-100 shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onClick={() => onProductClick(product)}
              currentCurrency={currentCurrency}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Product Detail Page Component
const ProductDetailPage = ({ product, onAddToCart, onBack, currentCurrency }) => {
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };
  
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-stone-600 hover:text-stone-800 transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Collection
        </button>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-stone-600 font-medium tracking-wide">{product.category.toUpperCase()}</span>
              <h1 className="text-3xl font-bold text-stone-800 mt-2">{product.name}</h1>
              <div className="flex items-center mt-3">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="text-stone-600 ml-1">{product.rating}</span>
                  <span className="text-stone-500 ml-2">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="text-4xl font-bold text-stone-900">
              {currentCurrency.symbol}{product.price.toLocaleString()}
            </div>
            
            <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
              product.condition === 'Working' 
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                : 'text-amber-700 bg-amber-50 border border-amber-200'
            }`}>
              {product.condition}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-800">Description</h3>
              <p className="text-stone-600 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-800">Condition Notes</h3>
              <p className="text-stone-600 border-l-2 border-stone-200 pl-4">{product.defects}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-stone-200 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-4 h-4 text-stone-600" />
                </button>
                <span className="px-4 py-2 border-x border-stone-200 bg-stone-50 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-4 h-4 text-stone-600" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="bg-stone-800 text-stone-100 px-8 py-3 rounded-lg hover:bg-stone-700 transition-colors flex items-center space-x-2 font-medium flex-1"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Page Component
const CartPage = ({ cartItems, onUpdateQuantity, onRemoveFromCart, currentCurrency }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-12">
            <ShoppingCart className="w-24 h-24 text-stone-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Your Cart is Empty</h2>
            <p className="text-stone-600 mb-8">Discover our heritage collection of distinguished electronics.</p>
            <button className="bg-stone-800 text-stone-100 px-8 py-3 rounded-lg hover:bg-stone-700 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light text-stone-800 mb-8 text-center">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-800">{item.name}</h3>
                    <p className="text-stone-600 text-sm">{item.category}</p>
                    <p className="text-stone-500 text-xs mt-1">{item.defects}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-stone-200 rounded-lg">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-stone-100 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-stone-600" />
                      </button>
                      <span className="px-3 py-2 border-x border-stone-200 bg-stone-50 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-stone-100 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-stone-800">{currentCurrency.symbol}{(item.price * item.quantity).toLocaleString()}</div>
                      <div className="text-stone-500 text-sm">{currentCurrency.symbol}{item.price} each</div>
                    </div>
                    <button 
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-stone-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-medium text-stone-800">{currentCurrency.symbol}{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span className="font-medium text-stone-800">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Tax</span>
                  <span className="font-medium text-stone-800">Calculated at checkout</span>
                </div>
                <div className="border-t border-stone-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-stone-800">Total</span>
                    <span className="text-lg font-bold text-stone-900">{currentCurrency.symbol}{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-stone-800 text-stone-100 py-3 rounded-lg hover:bg-stone-700 transition-colors font-medium mb-4">
                Proceed to Checkout
              </button>
              
              <p className="text-stone-500 text-sm text-center">
                Secure checkout with SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };
  
  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentPage('products');
  };
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      <div className="min-h-screen bg-stone-50">
        <Navbar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          cartItems={cartItems}
          currentCurrency={currentCurrency}
          currentLanguage={currentLanguage}
          onCurrencyChange={setCurrentCurrency}
          onLanguageChange={setCurrentLanguage}
        />
        
        {currentPage === 'home' && (
          <Homepage 
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
            currentCurrency={currentCurrency}
          />
        )}
        
        {currentPage === 'products' && (
          <ProductsPage 
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
            currentCurrency={currentCurrency}
          />
        )}
        
        {currentPage === 'product' && selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={handleBackToProducts}
            currentCurrency={currentCurrency}
          />
        )}
        
        {currentPage === 'cart' && (
          <CartPage 
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            currentCurrency={currentCurrency}
          />
        )}
        
        <Footer />
      </div>
    </CartContext.Provider>
  );
};

export default App;