import React, { useState } from 'react';
import { Search, MessageSquare, User, CheckCircle, XCircle, MoreVertical, ArrowUpRight } from 'lucide-react';

const tickets = [
  {
    id: 'SUP-5001',
    user: 'Amit Kumar',
    subject: 'Unable to login',
    status: 'Open',
    date: '2024-03-08',
  },
  {
    id: 'SUP-5002',
    user: 'Sneha Patel',
    subject: 'Order not received',
    status: 'Resolved',
    date: '2024-03-09',
  },
  {
    id: 'SUP-5003',
    user: 'Vikram Singh',
    subject: 'Payment failed',
    status: 'Escalated',
    date: '2024-03-10',
  },
];

const statusColors = {
  'Open': 'bg-yellow-100 text-yellow-800',
  'Resolved': 'bg-green-100 text-green-800',
  'Escalated': 'bg-red-100 text-red-800',
};

export function SupportManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTickets = tickets.filter(ticket =>
    ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and resolve support tickets from users across India.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tickets..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium text-gray-900">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <User className="h-4 w-4 mr-1" />{ticket.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[ticket.status]}`}>{ticket.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-900" title="Resolve Ticket">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900" title="Escalate Ticket">
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete Ticket">
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