import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, User } from 'lucide-react';

export function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Placeholder blog data - in production, this would come from an API
  const blogPosts = [
    {
      id: '1',
      title: 'Understanding Wholesale Rice Market Trends in 2024',
      excerpt: 'An in-depth analysis of current rice market trends, pricing factors, and future predictions for wholesale buyers.',
      category: 'Market Analysis',
      author: 'Rahul Sharma',
      date: '2024-03-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500',
      tags: ['Rice', 'Market Trends', 'Wholesale']
    },
    {
      id: '2',
      title: 'Top 5 Spices in High Demand: A Seller\'s Guide',
      excerpt: 'Discover the most sought-after spices in the market and learn how to optimize your spice business for maximum profit.',
      category: 'Business Tips',
      author: 'Priya Patel',
      date: '2024-03-12',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=500',
      tags: ['Spices', 'Business Growth', 'Demand Analysis']
    },
    {
      id: '3',
      title: 'Sustainable Packaging Solutions for Grocery Wholesalers',
      excerpt: 'Explore eco-friendly packaging options that maintain product quality while reducing environmental impact.',
      category: 'Sustainability',
      author: 'Amit Kumar',
      date: '2024-03-10',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80&w=500',
      tags: ['Packaging', 'Sustainability', 'Wholesale']
    },
    {
      id: '4',
      title: 'Digital Payment Solutions for Wholesale Transactions',
      excerpt: 'A comprehensive guide to implementing secure and efficient digital payment systems for wholesale businesses.',
      category: 'Technology',
      author: 'Sanjay Mehta',
      date: '2024-03-08',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=500',
      tags: ['Digital Payments', 'Technology', 'Security']
    },
    {
      id: '5',
      title: 'Quality Control Best Practices for Pulses',
      excerpt: 'Essential guidelines for maintaining high-quality standards in pulse storage and distribution.',
      category: 'Quality Control',
      author: 'Mohammad Khan',
      date: '2024-03-05',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?auto=format&fit=crop&q=80&w=500',
      tags: ['Pulses', 'Quality Control', 'Storage']
    },
    {
      id: '6',
      title: 'Building Strong Supplier Relationships in Wholesale',
      excerpt: 'Learn effective strategies for developing and maintaining long-term partnerships with suppliers.',
      category: 'Business Tips',
      author: 'Lisa Chen',
      date: '2024-03-02',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=500',
      tags: ['Partnerships', 'Business Growth', 'Networking']
    }
  ];

  const categories = ['All', 'Market Analysis', 'Business Tips', 'Sustainability', 'Technology', 'Quality Control'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Insights Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest trends, insights, and best practices in the wholesale grocery industry
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="md:w-48 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/blog/${post.id}`} className="block">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </span>
              </div>
              <Link to={`/blog/${post.id}`} className="block group">
                <h2 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 text-green-600 hover:text-green-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
} 