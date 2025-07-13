import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, ShieldCheck, Truck, Star, Flame, Clock, Tag, ShoppingCart, ChevronDown } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const categories = [
    { name: 'Staples', image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?auto=format&fit=crop&q=80&w=400' },
    { name: 'Pulses', image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=400' },
    { name: 'Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Oils', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400' },
  ];

  const features = [
    { icon: ShieldCheck, title: 'Verified Suppliers', description: 'All suppliers are thoroughly vetted for quality and reliability' },
    { icon: Truck, title: 'Pan India Delivery', description: 'Fast and reliable delivery across all major cities in India' },
    { icon: TrendingUp, title: 'Market Insights', description: 'Make informed decisions with real-time market trends and analysis' },
  ];

  const featuredProducts = {
    trending: [
      {
        id: '1',
        name: 'Premium Basmati Rice',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300',
        brand: 'Royal Foods',
        category: 'Staples',
      },
      {
        id: '2',
        name: 'Organic Turmeric Powder',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
        brand: 'Spice Masters',
        category: 'Spices',
      },
    ],
    deals: [
      {
        id: '3',
        name: 'Organic Toor Dal',
        price: 1800,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=300',
        brand: 'Green Fields',
        category: 'Pulses',
      },
      {
        id: '4',
        name: 'Virgin Coconut Oil',
        price: 3500,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300',
        brand: 'Coconut King',
        category: 'Oils',
      },
    ],
    newArrivals: [
      {
        id: '5',
        name: 'Premium Red Chilli',
        price: 900,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
        brand: 'Spice Masters',
        category: 'Spices',
      },
      {
        id: '6',
        name: 'Organic Moong Dal',
        price: 1600,
        image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=300',
        brand: 'Green Fields',
        category: 'Pulses',
      },
    ],
  };

  const topSellers = [
    {
      id: '1',
      name: 'Royal Foods Wholesale',
      rating: 4.8,
      totalOrders: 1500,
      location: 'Mumbai, Maharashtra',
      verified: true,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300',
      category: 'Staples',
    },
    {
      id: '2',
      name: 'Spice Masters Trading',
      rating: 4.6,
      totalOrders: 1200,
      location: 'Delhi, NCR',
      verified: true,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
      category: 'Spices',
    },
    {
      id: '3',
      name: 'Fresh Produce Hub',
      rating: 4.7,
      totalOrders: 800,
      location: 'Bangalore, Karnataka',
      verified: true,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300',
      category: 'Vegetables',
    },
  ];

  const faqs = [
    {
      question: "Is Duniya Mart free to use?",
      answer: "Yes, Duniya Mart is completely free for buyers. Sellers pay a small commission on successful transactions."
    },
    {
      question: "How do I register as a seller?",
      answer: "To register as a seller, click on 'Register as Wholesaler' and complete the verification process. Our team will review your application within 24-48 hours."
    },
    {
      question: "Can small retailers place orders?",
      answer: "Yes, we welcome retailers of all sizes. Our platform offers flexible order quantities to accommodate different business needs."
    },
    {
      question: "How is delivery arranged?",
      answer: "Delivery is handled by our trusted logistics partners. Sellers can choose to handle their own delivery or use our logistics network."
    },
    {
      question: "What support does Duniya Mart offer?",
      answer: "We offer 24/7 customer support, dispute resolution, and business advisory services to help you grow your business."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const renderFeaturedProducts = () => {
    switch (activeTab) {
      case 'trending':
        return (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-semibold">Trending Now</h3>
              </div>
              <Link to="/products?sort=trending" className="text-green-600 hover:text-green-700 font-semibold">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.trending.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <p className="text-green-600 font-semibold">{formatPrice(product.price)}/kg</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      case 'deals':
        return (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Tag className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold">Best Deals</h3>
              </div>
              <Link to="/products?sort=deals" className="text-green-600 hover:text-green-700 font-semibold">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.deals.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-green-600 font-semibold">{formatPrice(product.price * (1 - product.discount/100))}/kg</p>
                      <p className="text-sm text-gray-500 line-through">{formatPrice(product.price)}/kg</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      case 'new':
        return (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-semibold">New Arrivals</h3>
              </div>
              <Link to="/products?sort=new" className="text-green-600 hover:text-green-700 font-semibold">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.newArrivals.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <p className="text-green-600 font-semibold">{formatPrice(product.price)}/kg</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
            alt="Wholesale Market"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            India's Leading B2B Grocery Marketplace
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with verified suppliers, get bulk pricing, and grow your business
          </p>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold whitespace-nowrap">
              Search Now
            </button>
          </form>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
              <p className="text-gray-600">
                Explore our extensive catalog of wholesale products from verified suppliers across India
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact Sellers & Place Orders</h3>
              <p className="text-gray-600">
                Connect with sellers, negotiate prices, and place bulk orders with ease
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Delivery</h3>
              <p className="text-gray-600">
                Get your orders delivered safely to your doorstep with our reliable logistics network
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          
          {/* Featured Products Navigation */}
          <div className="flex justify-center mb-12">
            <nav className="inline-flex rounded-lg bg-gray-100 p-1 gap-1">
              <button 
                onClick={() => setActiveTab('trending')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'trending' 
                    ? 'bg-white shadow text-green-600 font-semibold' 
                    : 'text-gray-600 hover:bg-white hover:text-green-600'
                }`}
              >
                Trending Now
              </button>
              <button 
                onClick={() => setActiveTab('deals')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'deals' 
                    ? 'bg-white shadow text-green-600 font-semibold' 
                    : 'text-gray-600 hover:bg-white hover:text-green-600'
                }`}
              >
                Best Deals
              </button>
              <button 
                onClick={() => setActiveTab('new')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'new' 
                    ? 'bg-white shadow text-green-600 font-semibold' 
                    : 'text-gray-600 hover:bg-white hover:text-green-600'
                }`}
              >
                New Arrivals
              </button>
            </nav>
          </div>
          
          {/* Featured Products Content */}
          {renderFeaturedProducts()}
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Top Sellers</h2>
            <Link
              to="/sellers"
              className="inline-block border border-green-600 text-green-600 font-semibold px-5 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              View All Sellers
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topSellers.map((seller) => (
              <Link
                key={seller.id}
                to={`/seller/${seller.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{seller.name}</h3>
                    {seller.verified && (
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1">{seller.rating}</span>
                    </div>
                    <span className="text-gray-600">{seller.totalOrders}+ orders</span>
                  </div>
                  <p className="text-gray-600">{seller.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Market Insights</h2>
            <Link
              to="/blog"
              className="inline-block border border-green-600 text-green-600 font-semibold px-5 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              View All Articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500"
                alt="5 Tips for First-Time Wholesale Buyers"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">5 Tips for First-Time Wholesale Buyers</h3>
                <p className="text-gray-600 mb-4">
                  Learn essential strategies for making your first wholesale purchase a success.
                </p>
                <Link to="/blog/1" className="text-green-600 hover:text-green-700 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500"
                alt="Understanding Wholesale Pricing"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Understanding Wholesale Pricing</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to wholesale pricing structures and how to get the best deals.
                </p>
                <Link to="/blog/2" className="text-green-600 hover:text-green-700 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=500"
                alt="Building Supplier Relationships"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Building Supplier Relationships</h3>
                <p className="text-gray-600 mb-4">
                  Discover how to build and maintain strong relationships with your suppliers.
                </p>
                <Link to="/blog/3" className="text-green-600 hover:text-green-700 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GrocerTrade?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6 rounded-lg bg-white shadow-lg">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=200"
                  alt="Shyam Traders Shop"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Shyam Traders</h3>
                  <p className="text-sm text-gray-600">Jaipur, Rajasthan</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Duniya Mart has transformed our wholesale business. The platform is easy to use, and we've found reliable suppliers for all our needs."
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=200"
                  alt="Priya Foods Shop"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Priya Foods</h3>
                  <p className="text-sm text-gray-600">Mumbai, Maharashtra</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a small retailer, Duniya Mart has helped us compete with larger stores by providing access to wholesale prices and quality products."
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&q=80&w=200"
                  alt="Amit Grocery Shop"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Amit Grocery</h3>
                  <p className="text-sm text-gray-600">Delhi, NCR</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The customer support is excellent, and the delivery is always on time. We've been able to expand our product range significantly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openFaqIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                <div 
                  className={`transition-all duration-200 ${
                    openFaqIndex === index ? 'block' : 'hidden'
                  }`}
                >
                  <div className="p-6 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of retailers and wholesalers who trust GrocerTrade for their business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?type=retailer"
              className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Register as Retailer
            </Link>
            <Link
              to="/register?type=wholesaler"
              className="px-8 py-3 bg-green-800 text-white rounded-lg font-semibold hover:bg-green-900 transition-colors"
            >
              Register as Wholesaler
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}