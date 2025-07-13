import React, { useState } from 'react';
import { Search, AlertCircle, User, CheckCircle, XCircle, MoreVertical, ArrowUpRight } from 'lucide-react';

const disputes = [
  {
    id: 'DSP-4001',
    orderId: 'ORD-1001',
    buyer: 'Priya Sharma',
    issue: 'Product not delivered',
    status: 'Open',
    date: '2024-03-05',
  },
  {
    id: 'DSP-4002',
    orderId: 'ORD-1002',
    buyer: 'Rahul Verma',
    issue: 'Wrong item received',
    status: 'Resolved',
    date: '2024-03-06',
  },
  {
    id: 'DSP-4003',
    orderId: 'ORD-1003',
    buyer: 'Anjali Singh',
    issue: 'Refund not processed',
    status: 'Escalated',
    date: '2024-03-07',
  },
];

const statusColors = {
  'Open': 'bg-yellow-100 text-yellow-800',
  'Resolved': 'bg-green-100 text-green-800',
  'Escalated': 'bg-red-100 text-red-800',
};

export function DisputeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredDisputes = disputes.filter(dispute =>
    dispute.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dispute.issue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dispute Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and resolve disputes raised by buyers across India.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search disputes..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispute ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDisputes.map(dispute => (
                <tr key={dispute.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="font-medium text-gray-900">{dispute.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <User className="h-4 w-4 mr-1" />{dispute.buyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.issue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[dispute.status]}`}>{dispute.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-900" title="Resolve Dispute">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900" title="Escalate Dispute">
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete Dispute">
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