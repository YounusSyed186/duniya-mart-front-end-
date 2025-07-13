import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

// Blog posts data - in production, this would come from an API
const blogPosts = [
  {
    id: '1',
    title: 'Understanding Wholesale Rice Market Trends in 2024',
    content: `
      <p class="mb-4">
        The wholesale rice market has seen significant changes in recent years, with 2024 bringing new challenges and opportunities for traders and buyers alike. This comprehensive analysis explores current trends, pricing factors, and future predictions that every wholesale buyer should be aware of.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Current Market Overview</h2>
      <p class="mb-4">
        Global rice production has reached new heights in 2024, with major producing countries implementing advanced farming techniques and sustainable practices. This increase in production has led to more stable pricing in most markets, though regional variations persist.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Key Pricing Factors</h2>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Weather patterns and climate change impacts</li>
        <li>Government policies and export restrictions</li>
        <li>Transportation costs and supply chain efficiency</li>
        <li>Quality grades and certification requirements</li>
        <li>Market demand and consumer preferences</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Future Predictions</h2>
      <p class="mb-4">
        Industry experts predict a steady growth in demand for premium rice varieties, particularly in urban markets. Sustainability certifications are becoming increasingly important, with buyers willing to pay premium prices for environmentally conscious products.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Recommendations for Buyers</h2>
      <p class="mb-4">
        To optimize your wholesale rice purchasing strategy in 2024, consider the following recommendations:
      </p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li>Develop relationships with multiple suppliers to ensure stable supply</li>
        <li>Monitor international trade policies and regulations</li>
        <li>Invest in proper storage facilities to take advantage of bulk pricing</li>
        <li>Stay informed about sustainable farming practices and certifications</li>
        <li>Consider long-term contracts to lock in favorable prices</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">
        The wholesale rice market continues to evolve, presenting both challenges and opportunities. By staying informed about market trends and implementing strategic purchasing practices, buyers can maintain competitive advantages while ensuring stable supply for their businesses.
      </p>
    `,
    category: 'Market Analysis',
    author: 'Rahul Sharma',
    authorTitle: 'Senior Market Analyst',
    date: '2024-03-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1200',
    tags: ['Rice', 'Market Trends', 'Wholesale']
  },
  {
    id: '2',
    title: 'Top 5 Spices in High Demand: A Seller\'s Guide',
    content: `
      <p class="mb-4">
        The spice market is experiencing unprecedented growth, with certain varieties becoming increasingly sought-after. This guide explores the top 5 spices that are currently in high demand and provides valuable insights for sellers looking to optimize their spice business.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Premium Black Pepper</h2>
      <p class="mb-4">
        Known as the 'King of Spices', black pepper continues to dominate the market. Premium varieties from specific regions are commanding higher prices due to their superior quality and unique flavor profiles.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Organic Turmeric</h2>
      <p class="mb-4">
        With the growing focus on health and wellness, organic turmeric has seen a surge in demand. Buyers are particularly interested in turmeric with higher curcumin content and certified organic status.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Cardamom</h2>
      <p class="mb-4">
        Green cardamom's popularity in both culinary applications and the beverage industry has led to increased demand. Quality grading and proper storage are crucial for maintaining premium prices.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Cinnamon</h2>
      <p class="mb-4">
        Ceylon cinnamon, in particular, has seen growing demand due to its superior quality and health benefits. Understanding the different grades and origins is essential for successful trading.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Saffron</h2>
      <p class="mb-4">
        As the world's most expensive spice, saffron presents unique opportunities and challenges. Quality authentication and proper handling are crucial for success in this premium market segment.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Market Optimization Strategies</h2>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Implement rigorous quality control measures</li>
        <li>Develop direct relationships with producers</li>
        <li>Invest in proper storage and handling facilities</li>
        <li>Obtain relevant certifications</li>
        <li>Stay updated with market trends and pricing</li>
      </ul>
    `,
    category: 'Business Tips',
    author: 'Priya Patel',
    authorTitle: 'Spice Trade Specialist',
    date: '2024-03-12',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200',
    tags: ['Spices', 'Business Growth', 'Demand Analysis']
  },
  {
    id: '3',
    title: 'Sustainable Packaging Solutions for Grocery Wholesalers',
    content: `
      <p class="mb-4">
        As environmental consciousness grows, sustainable packaging has become a crucial consideration for grocery wholesalers. This article explores eco-friendly packaging solutions that maintain product quality while reducing environmental impact.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Current Challenges</h2>
      <p class="mb-4">
        The wholesale grocery industry faces unique challenges in balancing sustainability with practical packaging requirements. Understanding these challenges is the first step toward implementing effective solutions.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Innovative Solutions</h2>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Biodegradable packaging materials</li>
        <li>Reusable container systems</li>
        <li>Minimal packaging designs</li>
        <li>Recycled content packaging</li>
        <li>Smart packaging technologies</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Implementation Strategies</h2>
      <p class="mb-4">
        Successfully transitioning to sustainable packaging requires careful planning and execution. Consider these key strategies for implementation:
      </p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li>Assess current packaging practices</li>
        <li>Research available sustainable alternatives</li>
        <li>Conduct pilot programs</li>
        <li>Gather feedback from stakeholders</li>
        <li>Scale successful solutions</li>
      </ol>
    `,
    category: 'Sustainability',
    author: 'Amit Kumar',
    authorTitle: 'Sustainability Consultant',
    date: '2024-03-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80&w=1200',
    tags: ['Packaging', 'Sustainability', 'Wholesale']
  },
  {
    id: '4',
    title: 'Digital Payment Solutions for Wholesale Transactions',
    content: `
      <p class="mb-4">
        In today's fast-paced wholesale market, efficient and secure digital payment solutions are crucial for business success. This guide explores the latest payment technologies and best practices for wholesale transactions.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Benefits of Digital Payments</h2>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Faster transaction processing</li>
        <li>Reduced processing costs</li>
        <li>Enhanced security features</li>
        <li>Better transaction tracking</li>
        <li>Improved cash flow management</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Popular Payment Solutions</h2>
      <p class="mb-4">
        Several digital payment solutions have emerged as leaders in the wholesale sector:
      </p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li>B2B Payment Platforms</li>
        <li>Electronic Funds Transfer (EFT)</li>
        <li>Digital Wallets</li>
        <li>Blockchain-based Solutions</li>
        <li>Integrated Payment Systems</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Security Considerations</h2>
      <p class="mb-4">
        When implementing digital payment solutions, security should be a top priority. Key security measures include:
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Multi-factor authentication</li>
        <li>End-to-end encryption</li>
        <li>Regular security audits</li>
        <li>Fraud detection systems</li>
        <li>Compliance with payment standards</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Implementation Guide</h2>
      <p class="mb-4">
        Follow these steps to successfully implement digital payment solutions:
      </p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li>Assess your business needs</li>
        <li>Research available solutions</li>
        <li>Compare costs and features</li>
        <li>Plan the integration process</li>
        <li>Train staff and partners</li>
      </ol>
    `,
    category: 'Technology',
    author: 'Sanjay Mehta',
    authorTitle: 'Digital Payment Specialist',
    date: '2024-03-08',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200',
    tags: ['Digital Payments', 'Technology', 'Security']
  },
  {
    id: '5',
    title: 'Quality Control Best Practices for Pulses',
    content: `
      <p class="mb-4">
        Maintaining high quality standards in pulse storage and distribution is essential for success in the wholesale market. This comprehensive guide covers key aspects of quality control for pulses.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Storage Conditions</h2>
      <p class="mb-4">
        Proper storage is crucial for maintaining pulse quality:
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Temperature control (15-20°C ideal)</li>
        <li>Humidity monitoring (below 65%)</li>
        <li>Proper ventilation systems</li>
        <li>Clean and pest-free environment</li>
        <li>Regular maintenance checks</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Quality Parameters</h2>
      <p class="mb-4">
        Key quality parameters to monitor include:
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Moisture content</li>
        <li>Foreign matter percentage</li>
        <li>Damaged grain count</li>
        <li>Uniformity of size</li>
        <li>Color consistency</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Testing Procedures</h2>
      <p class="mb-4">
        Implement these testing procedures regularly:
      </p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li>Sample collection methods</li>
        <li>Moisture content analysis</li>
        <li>Physical examination</li>
        <li>Cooking quality tests</li>
        <li>Pest infestation checks</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Documentation</h2>
      <p class="mb-4">
        Maintain detailed records of:
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Batch information</li>
        <li>Test results</li>
        <li>Storage conditions</li>
        <li>Quality certifications</li>
        <li>Supplier details</li>
      </ul>
    `,
    category: 'Quality Control',
    author: 'Mohammad Khan',
    authorTitle: 'Quality Assurance Manager',
    date: '2024-03-05',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?auto=format&fit=crop&q=80&w=1200',
    tags: ['Pulses', 'Quality Control', 'Storage']
  },
  {
    id: '6',
    title: 'Building Strong Supplier Relationships in Wholesale',
    content: `
      <p class="mb-4">
        Strong supplier relationships are the foundation of a successful wholesale business. This guide explores effective strategies for developing and maintaining long-term partnerships with suppliers.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Communication Strategies</h2>
      <p class="mb-4">
        Effective communication is key to strong partnerships:
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Regular check-ins and updates</li>
        <li>Clear expectations and goals</li>
        <li>Transparent feedback systems</li>
        <li>Multi-channel communication</li>
        <li>Cultural sensitivity awareness</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Building Trust</h2>
      <p class="mb-4">
        Trust is built through consistent actions:
      </p>
      <ol class="list-decimal list-inside mb-4 space-y-2">
        <li>Honoring commitments</li>
        <li>Timely payments</li>
        <li>Fair negotiations</li>
        <li>Sharing market insights</li>
        <li>Supporting mutual growth</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conflict Resolution</h2>
      <p class="mb-4">
        Handle disagreements professionally:
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Address issues promptly</li>
        <li>Listen to all perspectives</li>
        <li>Focus on solutions</li>
        <li>Document agreements</li>
        <li>Learn from experiences</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Long-term Strategy</h2>
      <p class="mb-4">
        Develop strategies for lasting partnerships:
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>Joint business planning</li>
        <li>Innovation collaboration</li>
        <li>Risk sharing mechanisms</li>
        <li>Performance metrics</li>
        <li>Regular relationship reviews</li>
      </ul>
    `,
    category: 'Business Tips',
    author: 'Lisa Chen',
    authorTitle: 'Supply Chain Consultant',
    date: '2024-03-02',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
    tags: ['Partnerships', 'Business Growth', 'Networking']
  }
];

export function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the post that matches the ID from the URL
  const post = blogPosts.find(post => post.id === id);

  // If no post is found, redirect to the blog listing page
  if (!post) {
    React.useEffect(() => {
      navigate('/blog');
    }, [navigate]);
    return null;
  }

  // Find related posts (excluding the current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      {/* Article Header */}
      <article>
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
          <div className="flex items-center justify-between border-b pb-6">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="font-semibold">{post.author}</div>
                <div className="text-sm text-gray-600">{post.authorTitle}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="p-4">
                    <span className="text-sm text-green-600 mb-2 block">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold group-hover:text-green-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 