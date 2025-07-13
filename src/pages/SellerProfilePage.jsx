import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, Package, MessageCircle, Truck, Filter, Search } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export function SellerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Add missing state for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Placeholder sellers data (should match SellerListingPage)
  const sellers = [
    {
      id: '1',
      name: 'Royal Foods Wholesale',
      description: 'Leading wholesale supplier of premium quality groceries and staples.',
      rating: 4.8,
      totalOrders: 1500,
      joinedDate: '2022',
      verified: true,
      location: 'Mumbai, Maharashtra',
      categories: ['Staples', 'Pulses', 'Spices', 'Oils'],
      metrics: {
        orderFulfillment: '99%',
        responseTime: '2 hours',
        deliveryTime: '2-3 days',
      },
      products: [
        {
          id: '1',
          name: 'Premium Basmati Rice',
          price: 2500,
          moq: 100,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300',
          category: 'Staples',
        },
        {
          id: '2',
          name: 'Organic Turmeric Powder',
          price: 1200,
          moq: 50,
          image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300',
          category: 'Spices',
        },
        {
          id: '3',
          name: 'Premium Toor Dal',
          price: 1800,
          moq: 75,
          image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=300',
          category: 'Pulses',
        },
        {
          id: '4',
          name: 'Virgin Coconut Oil',
          price: 3500,
          moq: 50,
          image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300',
          category: 'Oils',
        },
      ],
    },
    {
      id: '2',
      name: 'Spice Masters Trading',
      description: 'Specialists in premium spices, dry fruits, and herbs.',
      rating: 4.6,
      totalOrders: 1200,
      joinedDate: '2021',
      verified: false,
      location: 'Delhi',
      categories: ['Spices', 'Dry Fruits', 'Herbs'],
      metrics: {
        orderFulfillment: '97%',
        responseTime: '3 hours',
        deliveryTime: '3-4 days',
      },
      products: [], // Add products as needed
    },
    {
      id: '3',
      name: 'Fresh Produce Hub',
      description: 'Your source for fresh fruits, vegetables, and organic products.',
      rating: 4.7,
      totalOrders: 1800,
      joinedDate: '2020',
      verified: true,
      location: 'Bangalore',
      categories: ['Vegetables', 'Fruits', 'Organic Products'],
      metrics: {
        orderFulfillment: '98%',
        responseTime: '1 hour',
        deliveryTime: '1-2 days',
      },
      products: [], // Add products as needed
    },
  ];

  // Find the seller by id
  const seller = sellers.find(s => s.id === id);
  if (!seller) {
    return <div className="container mx-auto px-4 py-8">Seller not found.</div>;
  }

  const filteredProducts = seller.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seller Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{seller.name}</h1>
              {seller.verified && (
                <ShieldCheck className="h-6 w-6 text-green-600" />
              )}
            </div>
            <p className="text-gray-600 mt-1">{seller.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-1">{seller.rating}</span>
              </div>
              <span className="text-gray-600">{seller.totalOrders}+ orders</span>
              <span className="text-gray-600">Since {seller.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Package className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold">Order Fulfillment</h3>
          <p className="text-2xl font-bold text-green-600">{seller.metrics.orderFulfillment}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold">Response Time</h3>
          <p className="text-2xl font-bold text-green-600">{seller.metrics.responseTime}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Truck className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold">Delivery Time</h3>
          <p className="text-2xl font-bold text-green-600">{seller.metrics.deliveryTime}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {seller.categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Listings */}
      <div>
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
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
                <p className="text-sm text-gray-600 mt-2">MOQ: {product.moq} kg</p>
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}