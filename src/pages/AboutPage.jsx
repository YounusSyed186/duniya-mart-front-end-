import React from 'react';
import { Target, Users, Truck, ShieldCheck, TrendingUp } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About DuniyaMart</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          India's leading B2B marketplace for groceries wholesale trading, connecting businesses across the country.
        </p>
      </div>

      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <p className="text-lg text-gray-600 mb-4">
          DuniyaMart was founded with a vision to revolutionize the wholesale grocery trade in India. We recognized the challenges faced by both buyers and sellers in the traditional wholesale market and set out to create a digital platform that would make wholesale trading more efficient, transparent, and accessible.
        </p>
        <p className="text-lg text-gray-600">
          Today, we're proud to be India's leading B2B marketplace for groceries, serving thousands of businesses across the country. Our platform has transformed the way wholesale trading works, making it easier for businesses to connect, trade, and grow.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 py-16 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Target className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-600">
            To empower businesses across India by providing a transparent, efficient, and reliable platform for wholesale grocery trading. We aim to create a digital ecosystem that fosters growth, innovation, and trust in the wholesale market.
          </p>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">For Buyers</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Access to verified suppliers</li>
              <li>• Competitive wholesale prices</li>
              <li>• Secure payment options</li>
              <li>• Quality assurance</li>
              <li>• Easy order tracking</li>
              <li>• Dedicated support</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">For Sellers</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Nationwide reach</li>
              <li>• Digital storefront</li>
              <li>• Secure payments</li>
              <li>• Order management</li>
              <li>• Analytics dashboard</li>
              <li>• Marketing tools</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Truck className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Logistics</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Pan India delivery</li>
              <li>• Real-time tracking</li>
              <li>• Multiple shipping options</li>
              <li>• Warehousing solutions</li>
              <li>• Delivery partners</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Quality Assurance</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Verified suppliers</li>
              <li>• Quality checks</li>
              <li>• Product certifications</li>
              <li>• Return policy</li>
              <li>• Customer protection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of businesses that trust DuniyaMart for their wholesale needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register?type=buyer"
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Register as Buyer
          </a>
          <a
            href="/register?type=seller"
            className="px-8 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Register as Seller
          </a>
        </div>
      </div>
    </div>
  );
} 