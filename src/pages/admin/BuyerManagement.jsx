import React, { useState } from 'react';
import { Search, User, CheckCircle, XCircle, MoreVertical, Mail, Phone } from 'lucide-react';

const buyers = [
  {
    id: 1,
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 98765 43210',
    status: 'Active',
    joinDate: '2024-01-10',
    orders: 12,
    totalSpent: '₹1,250',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 91234 56789',
    status: 'Suspended',
    joinDate: '2023-12-22',
    orders: 5,
    totalSpent: '₹320',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    email: 'rahul.verma@email.com',
    phone: '+91 99887 76655',
    status: 'Active',
    joinDate: '2024-02-01',
    orders: 8,
    totalSpent: '₹670',
  },
];

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Suspended': 'bg-red-100 text-red-800',
};

export function BuyerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBuyers = buyers.filter(buyer =>
    buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    buyer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buyer Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          View, search, and manage all buyers on the marketplace.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search buyers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBuyers.map(buyer => (
                <tr key={buyer.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <User className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium text-gray-900">{buyer.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-1" />{buyer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <Phone className="h-4 w-4 mr-1" />{buyer.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[buyer.status]}`}>{buyer.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.totalSpent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-900" title="View Profile">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900" title="Suspend Buyer">
                        <XCircle className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500" title="More Actions">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 