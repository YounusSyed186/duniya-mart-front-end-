import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const reports = [
  {
    id: 'RPT-7001',
    name: 'Monthly GST Report',
    period: 'March 2024',
    type: 'GST',
  },
  {
    id: 'RPT-7002',
    name: 'Sales by State',
    period: 'Q1 2024',
    type: 'Sales',
  },
  {
    id: 'RPT-7003',
    name: 'Top Products',
    period: 'March 2024',
    type: 'Product',
  },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          Download and view key business reports for your Indian marketplace.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map(report => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium text-gray-900">{report.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-green-600 hover:text-green-900" title="Download Report">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900" title="View Report">
                        <Eye className="h-5 w-5" />
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