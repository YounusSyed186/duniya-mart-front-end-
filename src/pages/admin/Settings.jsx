import React, { useState } from 'react';
import { Settings as SettingsIcon, Mail, Smartphone, CreditCard } from 'lucide-react';

export function Settings() {
  const [marketplaceName, setMarketplaceName] = useState('Duniya Mart');
  const [supportEmail, setSupportEmail] = useState('support@duniyamart.in');
  const [gstin, setGstin] = useState('27AAAPL1234C1ZV');
  const [upiId, setUpiId] = useState('duniyamart@upi');
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      <p className="text-sm text-gray-500">
        Manage your marketplace settings for India, including GST and UPI details.
      </p>
      {/* General Settings */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">General Settings</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Marketplace Name</label>
          <input
            type="text"
            value={marketplaceName}
            onChange={e => setMarketplaceName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Support Email</label>
          <div className="flex items-center mt-1">
            <Mail className="h-5 w-5 mr-2 text-gray-400" />
            <input
              type="email"
              value={supportEmail}
              onChange={e => setSupportEmail(e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>
      {/* Payment Settings */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Payment Settings</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">GSTIN</label>
          <input
            type="text"
            value={gstin}
            onChange={e => setGstin(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">UPI ID</label>
          <div className="flex items-center mt-1">
            <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
            <input
              type="text"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Notification Settings</h2>
        <div className="flex items-center justify-between">
          <span className="flex items-center"><Smartphone className="h-5 w-5 mr-2 text-gray-400" />SMS Notifications</span>
          <input
            type="checkbox"
            checked={smsEnabled}
            onChange={() => setSmsEnabled(!smsEnabled)}
            className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center"><Mail className="h-5 w-5 mr-2 text-gray-400" />Email Notifications</span>
          <input
            type="checkbox"
            checked={emailEnabled}
            onChange={() => setEmailEnabled(!emailEnabled)}
            className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
} 