import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, Package, Truck, Info, MessageCircle, Filter, Search } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(100);

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

  // Placeholder products array
  const products = [
    {
      id: '1',
      name: 'Premium Basmati Rice',
      description: 'High-quality aged basmati rice with long grains and aromatic flavor. Perfect for restaurants and bulk buyers.',
      price: 2500,
      moq: 100,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
      category: 'Staples',
      seller: {
        id: 1,
        name: 'Royal Foods Wholesale',
        rating: 4.8,
        verified: true,
        totalOrders: 1500,
      },
      specifications: {
        brand: 'Royal Foods',
        packaging: 'HDPE Bags',
        shelfLife: '24 months',
        origin: 'Punjab, India',
        certification: 'FSSAI, ISO 22000',
      },
      bulkPricing: [
        { minQuantity: 100, price: 2500 },
        { minQuantity: 500, price: 2300 },
        { minQuantity: 1000, price: 2100 },
        { minQuantity: 5000, price: 1900 },
      ],
      shipping: {
        estimatedDays: '2-3',
        freeAbove: 5000,
        locations: 'Pan India',
      }
    },
    {
      id: '2',
      name: 'Organic Turmeric Powder',
      description: 'Pure, organic turmeric powder for culinary and medicinal use.',
      price: 1200,
      moq: 50,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      category: 'Spices',
      seller: {
        id: 2,
        name: 'Spice Masters Trading',
        rating: 4.6,
        verified: false,
        totalOrders: 1200,
      },
      specifications: {
        brand: 'Spice Masters',
        packaging: 'Pouches',
        shelfLife: '18 months',
        origin: 'Kerala, India',
        certification: 'FSSAI',
      },
      bulkPricing: [
        { minQuantity: 50, price: 1200 },
        { minQuantity: 200, price: 1100 },
        { minQuantity: 500, price: 1000 },
      ],
      shipping: {
        estimatedDays: '3-5',
        freeAbove: 3000,
        locations: 'Pan India',
      }
    },
    {
      id: '3',
      name: 'Premium Toor Dal',
      description: 'High-quality toor dal, rich in protein and taste.',
      price: 1800,
      moq: 75,
      image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=800',
      category: 'Pulses',
      seller: {
        id: 1,
        name: 'Royal Foods Wholesale',
        rating: 4.8,
        verified: true,
        totalOrders: 1500,
      },
      specifications: {
        brand: 'Royal Foods',
        packaging: 'HDPE Bags',
        shelfLife: '12 months',
        origin: 'Maharashtra, India',
        certification: 'FSSAI',
      },
      bulkPricing: [
        { minQuantity: 75, price: 1800 },
        { minQuantity: 300, price: 1700 },
        { minQuantity: 1000, price: 1600 },
      ],
      shipping: {
        estimatedDays: '2-4',
        freeAbove: 4000,
        locations: 'Pan India',
      }
    },
    {
      id: '4',
      name: 'Virgin Coconut Oil',
      description: 'Cold-pressed virgin coconut oil, perfect for cooking and skincare.',
      price: 3500,
      moq: 50,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800',
      category: 'Oils',
      seller: {
        id: 3,
        name: 'Fresh Produce Hub',
        rating: 4.7,
        verified: true,
        totalOrders: 1800,
      },
      specifications: {
        brand: 'Fresh Produce',
        packaging: 'Glass Bottles',
        shelfLife: '24 months',
        origin: 'Kerala, India',
        certification: 'FSSAI',
      },
      bulkPricing: [
        { minQuantity: 50, price: 3500 },
        { minQuantity: 200, price: 3300 },
        { minQuantity: 500, price: 3100 },
      ],
      shipping: {
        estimatedDays: '3-6',
        freeAbove: 6000,
        locations: 'Pan India',
      }
    },
  ];

  // Find the product by id
  const product = products.find(p => p.id === id);
  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found.</div>;
  }

  const getCurrentPrice = () => {
    const applicableTier = product.bulkPricing
      .slice()
      .reverse()
      .find(tier => quantity >= tier.minQuantity);
    return applicableTier ? applicableTier.price : product.price;
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= product.moq) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    // Add to cart logic here (placeholder)
    alert('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="border-t border-b py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-green-600">
                {formatPrice(getCurrentPrice())}/kg
              </div>
              <div className="text-sm text-gray-600">
                MOQ: {product.moq} kg
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  min={product.moq}
                  step={10}
                  value={quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty value for editing
                    if (value === '') {
                      setQuantity('');
                      return;
                    }
                    // Convert to number and validate
                    const numValue = parseInt(value);
                    if (!isNaN(numValue)) {
                      setQuantity(numValue);
                    }
                  }}
                  onBlur={(e) => {
                    // Ensure a valid value is set when input loses focus
                    const value = e.target.value;
                    if (value === '') {
                      setQuantity(product.moq);
                    } else {
                      const numValue = parseInt(value);
                      if (numValue < product.moq) {
                        setQuantity(product.moq);
                      }
                    }
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <Link 
            to={`/seller/${product.seller.id}`}
            className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{product.seller.name}</h3>
                  {product.seller.verified && (
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {product.seller.rating}
                  </div>
                  <span>{product.seller.totalOrders}+ orders</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bulk Pricing */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Bulk Pricing</h2>
          <div className="space-y-3">
            {product.bulkPricing.map((tier, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-2 rounded ${
                  quantity >= tier.minQuantity ? 'bg-green-50' : ''
                }`}
              >
                <span>
                  {tier.minQuantity}+ kg
                </span>
                <span className="font-medium">
                  {formatPrice(tier.price)}/kg
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">Shipping Information</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Estimated Delivery Time</p>
                <p className="text-gray-600">{product.shipping.estimatedDays} business days</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Package className="h-5 w-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-gray-600">On orders above {formatPrice(product.shipping.freeAbove)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Shipping Coverage</p>
                <p className="text-gray-600">{product.shipping.locations}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}