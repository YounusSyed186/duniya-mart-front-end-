import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';

const faqs = [
  {
    question: 'How do I contact business support?',
    answer: 'You can reach us via email, phone, WhatsApp, or the support form below.'
  },
  {
    question: 'What is the response time?',
    answer: 'Our team typically responds within 24 hours on business days.'
  },
  {
    question: 'Can I get support in Hindi or other Indian languages?',
    answer: 'Yes, our support team can assist you in multiple Indian languages.'
  }
];

export function BusinessSupport() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Support</h1>
        <p className="text-gray-600 mb-6">Need help? Our business support team is here for you. Reach out via any of the options below or fill out the support form.</p>
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-green-600" />
            <span>support@duniyamart.in</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-600" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            <span>WhatsApp: +91 91234 56789</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold flex items-center gap-2">
            <Send className="h-5 w-5" />
            Thank you! Your message has been sent.
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
              Send Message
            </button>
          </form>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <ul className="space-y-4">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <p className="font-medium text-gray-800">{faq.question}</p>
              <p className="text-gray-600">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 