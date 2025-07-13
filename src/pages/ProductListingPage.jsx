import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowDown, ArrowUp, X } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export function ProductListingPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('relevance');
  
  // Placeholder data - in production, this would come from an API
  const products = [
    {
      id: '1',
      name: 'Premium Basmati Rice',
      description: 'High-quality aged basmati rice',
      category: 'Staples',
      brand: 'India Gate',
      seller: 'Royal Foods',
      price: 2500,
      bulkPricing: [
        { quantity: 100, price: 2400 },
        { quantity: 500, price: 2300 },
      ],
      stock: 1000,
      sellerId: 'seller1',
      rating: 4.8,
      sales: 1500,
      images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300'],
      location: 'Punjab'
    },
    {
      id: '2',
      name: 'Organic Toor Dal',
      description: 'Premium quality organic toor dal',
      category: 'Pulses',
      brand: 'Own Product',
      seller: 'Green Fields',
      price: 1800,
      bulkPricing: [
        { quantity: 100, price: 1750 },
        { quantity: 500, price: 1700 },
      ],
      stock: 800,
      sellerId: 'seller2',
      rating: 4.6,
      sales: 1200,
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300'],
      location: 'Maharashtra'
    },
    {
      id: '3',
      name: 'Premium Turmeric Powder',
      description: 'Pure ground turmeric powder',
      category: 'Spices',
      brand: 'MDH',
      seller: 'Spice Masters',
      price: 1200,
      bulkPricing: [
        { quantity: 50, price: 1150 },
        { quantity: 200, price: 1100 },
      ],
      stock: 500,
      sellerId: 'seller2',
      rating: 4.7,
      sales: 900,
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300'],
      location: 'Maharashtra'
    },
    {
      id: '4',
      name: 'Organic Virgin Coconut Oil',
      description: 'Cold-pressed virgin coconut oil',
      category: 'Oils',
      brand: 'Organic India',
      seller: 'Coconut King',
      price: 3500,
      bulkPricing: [
        { quantity: 50, price: 3400 },
        { quantity: 200, price: 3300 },
      ],
      stock: 300,
      sellerId: 'seller3',
      rating: 4.9,
      sales: 600,
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300'],
      location: 'Tamil Nadu'
    },
    {
      id: '5',
      name: 'Premium Red Chilli Powder',
      description: 'Pure red chilli powder',
      category: 'Spices',
      brand: 'Everest',
      seller: 'Spice Masters',
      price: 900,
      bulkPricing: [
        { quantity: 50, price: 850 },
        { quantity: 200, price: 800 },
      ],
      stock: 600,
      sellerId: 'seller2',
      rating: 4.5,
      sales: 1100,
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300'],
      location: 'Maharashtra'
    },
    {
      id: '6',
      name: 'Organic Moong Dal',
      description: 'Premium organic moong dal',
      category: 'Pulses',
      brand: 'Tata Sampann',
      seller: 'Green Fields',
      price: 1600,
      bulkPricing: [
        { quantity: 100, price: 1550 },
        { quantity: 500, price: 1500 },
      ],
      stock: 700,
      sellerId: 'seller2',
      rating: 4.7,
      sales: 800,
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=fit&fit=crop&q=80&w=300'],
      location: 'Maharashtra'
    },
    {
      id: '7',
      name: 'Premium Sona Masoori Rice',
      description: 'High-quality sona masoori rice',
      category: 'Staples',
      brand: 'Daawat',
      seller: 'Royal Foods',
      price: 2200,
      bulkPricing: [
        { quantity: 100, price: 2100 },
        { quantity: 500, price: 2000 },
      ],
      stock: 900,
      sellerId: 'seller1',
      rating: 4.6,
      sales: 1300,
      images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=fit&fit=crop&q=80&w=300'],
      location: 'Punjab'
    },
    {
      id: '8',
      name: 'Organic Groundnut Oil',
      description: 'Cold-pressed groundnut oil',
      category: 'Oils',
      brand: 'Own Product',
      seller: 'Coconut King',
      price: 2800,
      bulkPricing: [
        { quantity: 50, price: 2700 },
        { quantity: 200, price: 2600 },
      ],
      stock: 400,
      sellerId: 'seller3',
      rating: 4.8,
      sales: 700,
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=fit&fit=crop&q=80&w=300'],
      location: 'Tamil Nadu'
    }
  ];

  const locations = ['All Locations', 'Punjab', 'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu'];
  const categories = ['All Categories', 'Staples', 'Pulses', 'Spices', 'Oils', 'Grains'];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === '' || selectedCategory === 'All Categories' || 
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesLocation = 
        selectedLocation === '' || selectedLocation === 'All Locations' || 
        product.location.toLowerCase() === selectedLocation.toLowerCase();

      const matchesPriceRange = 
        (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max));

      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Products</h1>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 ${
              showFilters ? 'bg-green-50 text-green-600 border-green-500' : ''
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {showFilters ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`bg-white rounded-lg shadow mb-8 transition-all duration-300 ${
        showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              className="w-full border rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              className="w-full border rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full border rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full border rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              className="w-full border rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="px-6 pb-4 flex flex-wrap gap-2">
          {selectedCategory && selectedCategory !== 'All Categories' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              {selectedCategory}
              <button
                className="ml-2 hover:text-green-900"
                onClick={() => setSelectedCategory('')}
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
          {selectedLocation && selectedLocation !== 'All Locations' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              {selectedLocation}
              <button
                className="ml-2 hover:text-green-900"
                onClick={() => setSelectedLocation('')}
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
          {(priceRange.min || priceRange.max) && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Price: {priceRange.min || '0'} - {priceRange.max || '∞'}
              <button
                className="ml-2 hover:text-green-900"
                onClick={() => setPriceRange({ min: '', max: '' })}
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-w-3 aspect-h-2">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="text-green-600 font-semibold">{formatPrice(product.price)}/kg</p>
              <p className="text-sm text-gray-600 mt-2">Seller: {product.seller}</p>
              <Link
                to={`/product/${product.id}`}
                className="mt-4 block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
}