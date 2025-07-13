import React, { useState } from 'react';
import { Search, ShoppingCart, User, DollarSign, CheckCircle, XCircle, MoreVertical, RefreshCcw, IndianRupee } from 'lucide-react';

const orders = [
  {
    id: 'ORD-1001',
    buyer: 'Amit Kumar',
    amount: '₹120.00',
    status: 'Completed',
    date: '2024-03-01',
  },
  {
    id: 'ORD-1002',
    buyer: 'Priya Sharma',
    amount: '₹45.50',
    status: 'Pending',
    date: '2024-03-02',
  },
  {
    id: 'ORD-1003',
    buyer: 'Rahul Verma',
    amount: '₹250.00',
    status: 'Refunded',
    date: '2024-03-03',
  },
];

const ORDER_STATUSES = [
  'Pending',
  'Processing',
  'Dispatched',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
  'Refunded',
  'Returned'
];

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Dispatched': 'bg-indigo-100 text-indigo-800',
  'Shipped': 'bg-green-100 text-green-800',
  'Out for Delivery': 'bg-orange-100 text-orange-800',
  'Delivered': 'bg-gray-100 text-gray-800',
  'Cancelled': 'bg-red-100 text-red-800',
  'Refunded': 'bg-blue-100 text-blue-800',
  'Returned': 'bg-purple-100 text-purple-800'
};

export function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editLocation, setEditLocation] = useState('');

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.buyer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditModal = (order) => {
    setEditingOrder(order);
    setEditStatus(order.status);
    setEditLocation(order.location || '');
    setEditModalOpen(true);
  };

  const saveOrderEdit = () => {
    if (editingOrder) {
      const idx = orders.findIndex(o => o.id === editingOrder.id);
      if (idx !== -1) {
        orders[idx].status = editStatus;
        orders[idx].location = editLocation;
      }
    }
    setEditModalOpen(false);
    setEditingOrder(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track, search, and manage all orders placed on the marketplace.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <User className="h-4 w-4 mr-1" />{order.buyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />{order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.location || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Edit Order" onClick={() => openEditModal(order)}>
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900" title="Refund Order">
                        <RefreshCcw className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete Order">
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
      {editModalOpen && editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setEditModalOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Edit Order - {editingOrder.id}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full border rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={editStatus}
                onChange={e => setEditStatus(e.target.value)}
              >
                {ORDER_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
              <input
                type="text"
                className="w-full border rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={editLocation}
                onChange={e => setEditLocation(e.target.value)}
                placeholder="Enter current location"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded-lg" onClick={() => setEditModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={saveOrderEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 