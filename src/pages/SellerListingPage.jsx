import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, Package, MessageCircle, Truck, Search, Filter, MapPin, TrendingUp } from 'lucide-react';

export function SellerListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Placeholder data
  const sellers = [
    {
      id: 1,
      name: 'Royal Foods Wholesale',
      location: 'Mumbai',
      rating: 4.8,
      totalSales: 15000,
      productsCount: 250,
      specialties: ['Rice', 'Pulses', 'Spices'],
      image: '/seller1.jpg',
      deliveryAreas: ['Mumbai', 'Thane', 'Navi Mumbai']
    },
    {
      id: 2,
      name: 'Spice Masters Trading',
      location: 'Delhi',
      rating: 4.6,
      totalSales: 12000,
      productsCount: 180,
      specialties: ['Spices', 'Dry Fruits', 'Herbs'],
      image: '/seller2.jpg',
      deliveryAreas: ['Delhi', 'Noida', 'Gurgaon']
    },
    {
      id: 3,
      name: 'Fresh Produce Hub',
      location: 'Bangalore',
      rating: 4.7,
      totalSales: 18000,
      productsCount: 300,
      specialties: ['Vegetables', 'Fruits', 'Organic Products'],
      image: '/seller3.jpg',
      deliveryAreas: ['Bangalore', 'Mysore']
    }
  ];

  // Available locations
  const locations = ['All Locations', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = searchQuery === '' || 
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = selectedLocation === '' || selectedLocation === 'All Locations' ||
      seller.location === selectedLocation ||
      seller.deliveryAreas.includes(selectedLocation);

    return matchesSearch && matchesLocation;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'sales':
        return b.totalSales - a.totalSales;
      case 'products':
        return b.productsCount - a.productsCount;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Sellers</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            <option value="">All Locations</option>
            {locations.slice(1).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            <option value="rating">Sort by Rating</option>
            <option value="sales">Sort by Sales</option>
            <option value="products">Sort by Products</option>
          </select>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSellers.map((seller) => (
          <div key={seller.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{seller.name}</h2>
                <div className="flex items-center mt-1 text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{seller.location}</span>
                </div>
              </div>
              <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                <Star className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-800">{seller.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="font-medium">{seller.totalSales.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Package className="w-4 h-4 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Products</p>
                  <p className="font-medium">{seller.productsCount}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Specialties:</p>
              <div className="flex flex-wrap gap-2">
                {seller.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">Delivery Areas:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {seller.deliveryAreas.map((area, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

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
                  className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label={`View profile of ${seller.name}`}
                >
                  View Seller
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSellers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No sellers found matching your criteria</p>
        </div>
      )}
    </div>
  );
} 