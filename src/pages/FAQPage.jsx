import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(['general']);
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const faqData = {
    general: {
      title: 'General Questions',
      questions: [
        {
          id: 'g1',
          question: 'How do I register on DuniyaMart?',
          answer: 'Simply visit our website, click "Sign Up", and enter your business details. Once verified, you can start buying or selling immediately.'
        },
        {
          id: 'g2',
          question: 'What types of products can I buy?',
          answer: 'We offer groceries, household goods, food and beverages, hygiene products, and more at wholesale prices.'
        },
        {
          id: 'g3',
          question: 'Is DuniyaMart available in all regions?',
          answer: 'We are expanding rapidly! Check our website to see if we deliver to your area.'
        }
      ]
    },
    payments: {
      title: 'Payments & Transactions',
      questions: [
        {
          id: 'p1',
          question: 'What payment methods are available?',
          answer: 'We accept UPI, digital wallets, debit/credit cards, and bank transfers for secure transactions.'
        }
      ]
    },
    shipping: {
      title: 'Shipping & Delivery',
      questions: [
        {
          id: 's1',
          question: 'What is the estimated delivery time?',
          answer: 'Orders typically arrive within 2 to 7 business days, depending on location and order size.'
        },
        {
          id: 's2',
          question: 'How do I return a damaged product?',
          answer: 'If you receive an incorrect or damaged product, you can initiate a return for a full refund or replacement within the return period.'
        }
      ]
    },
    quality: {
      title: 'Quality & Standards',
      questions: [
        {
          id: 'q1',
          question: 'How does DuniyaMart ensure product quality?',
          answer: 'We work only with verified suppliers and conduct strict quality checks before listing products.'
        }
      ]
    },
    selling: {
      title: 'Selling on DuniyaMart',
      questions: [
        {
          id: 'sl1',
          question: 'Can I sell my products on DuniyaMart?',
          answer: 'Yes! Farmers, manufacturers, and industries can register as sellers and reach thousands of buyers directly.'
        }
      ]
    },
    support: {
      title: 'Customer Support',
      questions: [
        {
          id: 'cs1',
          question: 'How do I contact customer support?',
          answer: 'Email: support@duniyamart.com\nPhone: +91-XXXX-XXXXXX\nLive Chat: Available on our website.'
        }
      ]
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const filteredFAQ = Object.entries(faqData).reduce((acc, [category, data]) => {
    const filteredQuestions = data.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredQuestions.length > 0) {
      acc[category] = {
        ...data,
        questions: filteredQuestions
      };
    }

    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our platform
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {Object.entries(filteredFAQ).map(([category, data]) => (
            <div
              key={category}
              className="border rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-900">{data.title}</h2>
                {expandedCategories.includes(category) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedCategories.includes(category) && (
                <div className="divide-y">
                  {data.questions.map((item) => (
                    <div key={item.id} className="px-6">
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full py-4 flex items-center justify-between text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-8">
                          {item.question}
                        </h3>
                        {expandedQuestions.includes(item.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedQuestions.includes(item.id) && (
                        <div className="pb-4 text-gray-600">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {Object.keys(filteredFAQ).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No FAQs found matching your search.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-green-600 hover:text-green-700 font-medium">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 