import React from 'react';
import { Megaphone, CheckCircle, XCircle, MoreVertical, Edit, Play } from 'lucide-react';

const campaigns = [
  {
    id: 'MKT-6001',
    name: 'Diwali Dhamaka Sale',
    status: 'Scheduled',
    startDate: '2024-10-20',
    endDate: '2024-10-25',
  },
  {
    id: 'MKT-6002',
    name: 'Republic Day Offers',
    status: 'Active',
    startDate: '2024-01-20',
    endDate: '2024-01-27',
  },
  {
    id: 'MKT-6003',
    name: 'Holi Special Discounts',
    status: 'Completed',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
  },
];

const statusColors = {
  'Active': 'bg-green-100 text-green-800',
  'Scheduled': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-gray-100 text-gray-800',
};

export function Marketing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and launch marketing campaigns for Indian festivals and events.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <Megaphone className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium text-gray-900">{campaign.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[campaign.status]}`}>{campaign.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-900" title="View Campaign">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900" title="Edit Campaign">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900" title="Launch Campaign">
                        <Play className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Delete Campaign">
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