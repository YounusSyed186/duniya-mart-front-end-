import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Package, Store, Filter } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchInput(query);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  // Placeholder data - in production, this would be fetched from the backend
  const products = [
    {
      id: '1',
      name: 'Premium Basmati Rice',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300',
      category: 'Staples',
      seller: 'Royal Foods Wholesale',
    },
    {
      id: '2',
      name: 'Organic Toor Dal',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
      category: 'Pulses',
      seller: 'Green Fields Trading',
    },
    {
      id: '3',
      name: 'Premium Turmeric Powder',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
      category: 'Spices',
      seller: 'Spice Masters Trading',
    },
    {
      id: '4',
      name: 'Organic Virgin Coconut Oil',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
      category: 'Oils',
      seller: 'Coconut King',
    },
  ];

  const sellers = [
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
      name: 'Green Fields Trading',
      rating: 4.7,
      totalOrders: 900,
      location: 'Bangalore, Karnataka',
      verified: true,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
      category: 'Pulses',
    },
    {
      id: '4',
      name: 'Coconut King',
      rating: 4.9,
      totalOrders: 800,
      location: 'Kerala',
      verified: true,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
      category: 'Oils',
    },
  ];

  const categories = [
    'All Categories',
    'Staples',
    'Pulses',
    'Spices',
    'Oils',
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchInput.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                         seller.category.toLowerCase().includes(searchInput.toLowerCase()) ||
                         seller.location.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || seller.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{searchInput}"</h1>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or sellers..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Results Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'products'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span>Products ({filteredProducts.length})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('sellers')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'sellers'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            <span>Sellers ({filteredSellers.length})</span>
          </div>
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeTab === 'products' ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
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
          ))
        ) : (
          filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={seller.image}
                alt={seller.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{seller.name}</h3>
                  {seller.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{seller.category}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{seller.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{seller.totalOrders}+ orders</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{seller.location}</p>
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/seller/${seller.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-200"
                  >
                    View Seller
                  </Link>
                  <Link
                    to={`/chat/${seller.id}`}
                    className="flex-1 bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* No Results Message */}
      {((activeTab === 'products' && filteredProducts.length === 0) ||
        (activeTab === 'sellers' && filteredSellers.length === 0)) && (
        <div className="text-center py-12">
          <p className="text-gray-500">No {activeTab} found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
} 