import React, { useState } from 'react';
import { Megaphone, Mail, Phone, Store, Send } from 'lucide-react';

const adOptions = [
  {
    icon: Megaphone,
    title: 'Banner Ads',
    desc: 'Promote your brand with high-visibility banners on our platform.'
  },
  {
    icon: Store,
    title: 'Sponsored Products',
    desc: 'Boost your products to the top of search results and category pages.'
  },
  {
    icon: Mail,
    title: 'Email Campaigns',
    desc: 'Reach thousands of buyers directly with targeted email campaigns.'
  }
];

const whyAdvertise = [
  'Reach a large and engaged B2B audience across India.',
  'Advanced targeting for maximum ROI.',
  'Dedicated support for your campaigns.',
  'Transparent reporting and analytics.'
];

export function Advertise() {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advertise with Us</h1>
        <p className="text-gray-600 mb-6">Grow your business by advertising on our platform. Choose from a variety of options to reach your ideal customers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {adOptions.map((opt, idx) => (
            <div key={idx} className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center">
              <opt.icon className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-lg mb-1">{opt.title}</h3>
              <p className="text-gray-600 text-sm">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Request Advertising</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold flex items-center gap-2">
            <Send className="h-5 w-5" />
            Thank you! Our team will contact you soon.
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business</label>
              <input
                type="text"
                name="business"
                value={form.business}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              Request Advertising
            </button>
          </form>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Why Advertise With Us?</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {whyAdvertise.map((reason, idx) => (
            <li key={idx}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 