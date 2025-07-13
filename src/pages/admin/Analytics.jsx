import React from 'react';
import { BarChart, TrendingUp, Users, ShoppingCart, DollarSign, MapPin, CreditCard, IndianRupee } from 'lucide-react';

const stats = [
  { name: 'Total Revenue', value: '₹32,45,000', change: '+12.3%', icon: IndianRupee },
  { name: 'Active Users', value: '8,200', change: '+5.1%', icon: Users },
  { name: 'Total Orders', value: '3,450', change: '+7.8%', icon: ShoppingCart },
  { name: 'Growth Rate', value: '9.2%', change: '+1.2%', icon: TrendingUp },
];

const topStates = [
  { state: 'Maharashtra', orders: 950 },
  { state: 'Karnataka', orders: 700 },
  { state: 'Delhi', orders: 620 },
  { state: 'Tamil Nadu', orders: 540 },
];

const paymentMethods = [
  { method: 'UPI', percent: 52 },
  { method: 'Credit Card', percent: 23 },
  { method: 'Cash on Delivery', percent: 18 },
  { method: 'Net Banking', percent: 7 },
];

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Key metrics and insights for your Indian marketplace.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6">
            <dt>
              <div className="absolute rounded-md bg-green-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">{stat.change}</p>
            </dd>
          </div>
        ))}
      </div>
      {/* Top States */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Top States by Orders</h3>
        <ul>
          {topStates.map((state) => (
            <li key={state.state} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <span className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-green-500" />{state.state}</span>
              <span className="font-semibold">{state.orders} orders</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Payment Methods */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Payment Methods</h3>
        <ul>
          {paymentMethods.map((pm) => (
            <li key={pm.method} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <span className="flex items-center"><CreditCard className="h-4 w-4 mr-2 text-green-500" />{pm.method}</span>
              <span className="font-semibold">{pm.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Placeholder for charts */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
        <BarChart className="h-16 w-16 text-gray-300 mb-2" />
        <span className="text-gray-400">(Charts coming soon...)</span>
      </div>
    </div>
  );
} 