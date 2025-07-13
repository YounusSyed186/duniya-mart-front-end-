import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  MoreVertical,
  Star,
  Package,
  IndianRupee,
  AlertCircle
} from 'lucide-react';

const sellers = [
  {
    id: 1,
    name: 'Fresh Groceries Inc.',
    email: 'contact@freshgroceries.com',
    status: 'Pending Approval',
    products: 45,
    rating: 4.8,
    totalSales: '$12,450',
    joinDate: '2024-02-15',
    verificationStatus: 'Unverified'
  },
  {
    id: 2,
    name: 'Organic Foods Ltd.',
    email: 'info@organicfoods.com',
    status: 'Active',
    products: 78,
    rating: 4.9,
    totalSales: '$23,890',
    joinDate: '2024-01-20',
    verificationStatus: 'Verified'
  },
  {
    id: 3,
    name: 'Local Market Co.',
    email: 'sales@localmarket.com',
    status: 'Active',
    products: 32,
    rating: 4.7,
    totalSales: '$8,450',
    joinDate: '2024-02-01',
    verificationStatus: 'Verified'
  },
  {
    id: 4,
    name: 'Farm Fresh Produce',
    email: 'info@farmfresh.com',
    status: 'Suspended',
    products: 15,
    rating: 4.5,
    totalSales: '$5,230',
    joinDate: '2024-01-15',
    verificationStatus: 'Unverified'
  }
];

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Pending Approval': 'bg-yellow-100 text-yellow-800',
  'Suspended': 'bg-red-100 text-red-800'
};

const verificationColors = {
  'Verified': 'bg-green-100 text-green-800',
  'Unverified': 'bg-yellow-100 text-yellow-800'
};

export function SellerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || seller.verificationStatus === verificationFilter;
    return matchesSearch && matchesStatus && matchesVerification;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Seller Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor your marketplace sellers
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value="all">All Verification Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSellers.map((seller) => (
                <tr key={seller.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                        <div className="text-sm text-gray-500">{seller.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[seller.status]}`}>
                      {seller.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${verificationColors[seller.verificationStatus]}`}>
                      {seller.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      {seller.products}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {seller.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {seller.totalSales}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {seller.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {seller.status === 'Pending Approval' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button className="text-gray-400 hover:text-gray-500">
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