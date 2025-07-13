import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
  Search,
  ArrowDown,
  Filter,
  BarChart2,
  List,
  Bell,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Star,
  Settings,
  Calendar,
  Plus,
  Edit,
  Trash2,
  FileText,
  ShoppingBag,
  Tag,
  LineChart,
  PieChart,
  Info,
  AlertCircle
} from 'lucide-react';

export function RetailerDashboard() {
  // Placeholder data - in production, this would come from an API
  const retailerData = {
    activeOrders: 8,
    pastOrders: 142,
    pendingDeliveries: 5,
    restockNeeded: 12,
    recentOrders: [
      {
        id: 'ORD-2024-101',
        product: 'Premium Basmati Rice',
        quantity: '200 kg',
        seller: 'Royal Foods Wholesale',
        status: 'in-transit',
        date: '2024-03-15',
        amount: 15000,
        expectedDelivery: '2024-03-18'
      },
      {
        id: 'ORD-2024-102',
        product: 'Organic Black Pepper',
        quantity: '50 kg',
        seller: 'Spice Masters Trading',
        status: 'processing',
        date: '2024-03-14',
        amount: 12000,
        expectedDelivery: '2024-03-19'
      },
      {
        id: 'ORD-2024-103',
        product: 'Yellow Toor Dal',
        quantity: '150 kg',
        seller: 'Fresh Produce Hub',
        status: 'delivered',
        date: '2024-03-12',
        amount: 18000,
        deliveredDate: '2024-03-14'
      }
    ],
    restockRecommendations: [
      {
        id: 1,
        product: 'Premium Basmati Rice',
        currentStock: '50 kg',
        recommendedStock: '250 kg',
        lastOrderDate: '2024-02-15',
        averageMonthlyDemand: '200 kg',
        priority: 'high'
      },
      {
        id: 2,
        product: 'Organic Turmeric Powder',
        currentStock: '25 kg',
        recommendedStock: '100 kg',
        lastOrderDate: '2024-02-20',
        averageMonthlyDemand: '75 kg',
        priority: 'medium'
      },
      {
        id: 3,
        product: 'Pure Mustard Oil',
        currentStock: '100 L',
        recommendedStock: '300 L',
        lastOrderDate: '2024-02-25',
        averageMonthlyDemand: '200 L',
        priority: 'high'
      },
      {
        id: 4,
        product: 'Green Cardamom',
        currentStock: '15 kg',
        recommendedStock: '40 kg',
        lastOrderDate: '2024-03-01',
        averageMonthlyDemand: '25 kg',
        priority: 'low'
      }
    ]
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [orderFilter, setOrderFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryFilter, setInventoryFilter] = useState('all');
  const [alertsFilter, setAlertsFilter] = useState('all');
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [showTracking, setShowTracking] = useState(false);

  // Placeholder data for price trends and market insights
  const marketData = {
    priceTrends: [
      {
        id: 1,
        product: 'Premium Basmati Rice',
        currentPrice: 85,
        previousPrice: 80,
        priceChange: 6.25,
        forecast: 'stable',
        history: [78, 80, 82, 80, 85],
        demand: 'high'
      },
      {
        id: 2,
        product: 'Organic Turmeric Powder',
        currentPrice: 120,
        previousPrice: 140,
        priceChange: -14.29,
        forecast: 'decreasing',
        history: [145, 140, 135, 130, 120],
        demand: 'medium'
      },
      {
        id: 3,
        product: 'Yellow Toor Dal',
        currentPrice: 95,
        previousPrice: 90,
        priceChange: 5.56,
        forecast: 'increasing',
        history: [85, 88, 90, 92, 95],
        demand: 'high'
      }
    ],
    marketInsights: [
      {
        id: 1,
        category: 'Rice',
        insight: 'Expected price increase due to reduced cultivation area',
        impact: 'high',
        recommendation: 'Consider stocking up before prices rise further'
      },
      {
        id: 2,
        category: 'Pulses',
        insight: 'Stable supply expected in coming months',
        impact: 'low',
        recommendation: 'Maintain current inventory levels'
      },
      {
        id: 3,
        category: 'Spices',
        insight: 'New organic suppliers entering the market',
        impact: 'medium',
        recommendation: 'Explore new supplier partnerships'
      }
    ],
    seasonalTrends: [
      {
        id: 1,
        product: 'Premium Basmati Rice',
        currentSeason: 'Peak',
        nextSeasonStart: '2024-06',
        priceOutlook: 'Expected to remain stable',
        stockAdvice: 'Maintain optimal stock'
      },
      {
        id: 2,
        product: 'Organic Turmeric Powder',
        currentSeason: 'Off-peak',
        nextSeasonStart: '2024-09',
        priceOutlook: 'Likely to decrease',
        stockAdvice: 'Consider reducing stock'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Placeholder tracking steps
  const getTrackingSteps = (order) => [
    { label: 'Order Placed', date: order.date },
    { label: 'Processing', date: order.status === 'processing' || order.status === 'in-transit' || order.status === 'delivered' ? order.date : null },
    { label: 'In Transit', date: order.status === 'in-transit' || order.status === 'delivered' ? order.expectedDelivery : null },
    { label: 'Delivered', date: order.status === 'delivered' ? order.deliveredDate : null }
  ];

  // Filter orders based on status and search
  const filteredOrders = retailerData.recentOrders.filter(order => {
    const matchesStatus = orderFilter === 'all' || order.status === orderFilter;
    const matchesSearch = searchTerm === '' || 
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filter recommendations based on search and priority
  const filteredRecommendations = retailerData.restockRecommendations.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = inventoryFilter === 'all' || item.priority === inventoryFilter;
    return matchesSearch && matchesPriority;
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Active Orders */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{retailerData.activeOrders}</h3>
                <p className="text-sm text-gray-600">Active Orders</p>
              </div>

              {/* Past Orders */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{retailerData.pastOrders}</h3>
                <p className="text-sm text-gray-600">Past Orders</p>
              </div>

              {/* Pending Deliveries */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Package className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{retailerData.pendingDeliveries}</h3>
                <p className="text-sm text-gray-600">Pending Deliveries</p>
              </div>

              {/* Restock Needed */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">{retailerData.restockNeeded}</h3>
                <p className="text-sm text-gray-600">Restock Needed</p>
              </div>
            </div>

            {/* Recent Orders and Restock Recommendations */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-lg font-bold">Recent Orders</h2>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full sm:w-auto pl-8 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      className="w-full sm:w-auto px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                    >
                      <option value="all">All Orders</option>
                      <option value="in-transit">In Transit</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Track</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.seller}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">₹{order.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                              {order.status !== 'delivered' && (
                                <button
                                  className="text-blue-600 hover:text-blue-800 underline"
                                  onClick={() => { setTrackingOrder(order); setShowTracking(true); }}
                                >
                                  Track Delivery
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Restock Recommendations */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-lg font-bold">Restock Recommendations</h2>
                  <select
                    className="w-full sm:w-auto px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={inventoryFilter}
                    onChange={(e) => setInventoryFilter(e.target.value)}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommended</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRecommendations.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.product}</div>
                                <div className="text-sm text-gray-500">Last order: {item.lastOrderDate}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.currentStock}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.recommendedStock}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">All Orders</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search orders..."
                        className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    <select
                      className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="in-transit">In Transit</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <h3 className="font-medium">{order.product}</h3>
                      <p className="text-sm text-gray-600">
                        {order.seller} • {order.quantity}
                      </p>
                      <p className="text-sm text-gray-500">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.status === 'delivered'
                          ? `Delivered: ${order.deliveredDate}`
                          : `Expected: ${order.expectedDelivery}`}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredOrders.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No orders found</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Inventory Management</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search inventory..."
                        className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    <select
                      className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={inventoryFilter}
                      onChange={(e) => setInventoryFilter(e.target.value)}
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {filteredRecommendations.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <h3 className="font-medium">{item.product}</h3>
                      <p className="text-sm text-gray-600">Current Stock: {item.currentStock}</p>
                      <p className="text-sm text-gray-600">Monthly Demand: {item.averageMonthlyDemand}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm px-2 py-1 rounded ${getPriorityColor(item.priority)}`}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Recommended: {item.recommendedStock}</p>
                      <p className="text-xs text-gray-500">Last Order: {item.lastOrderDate}</p>
                    </div>
                  </div>
                ))}
                {filteredRecommendations.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No products found</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[200px]">
              <p className="text-gray-500">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">System Alerts</h2>
                  <select
                    className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={alertsFilter}
                    onChange={(e) => setAlertsFilter(e.target.value)}
                  >
                    <option value="all">All Alerts</option>
                    <option value="stock">Stock Alerts</option>
                    <option value="delivery">Delivery Alerts</option>
                    <option value="price">Price Alerts</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <h3 className="font-medium text-red-800">Low Stock Alert</h3>
                      <p className="text-sm text-red-600">Premium Basmati Rice stock is below 20% threshold</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Delivery Delay</h3>
                      <p className="text-sm text-yellow-600">Order #ORD-2024-101 delivery might be delayed</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <h3 className="font-medium text-blue-800">Price Update</h3>
                      <p className="text-sm text-blue-600">Organic Turmeric Powder price has increased by 5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'price-trends':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>

            {/* Price Trends Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketData.priceTrends.map((trend) => (
                <div key={trend.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{trend.product}</h3>
                      <p className="text-sm text-gray-500">Current Price: ₹{trend.currentPrice}/kg</p>
                    </div>
                    {trend.priceChange > 0 ? (
                      <TrendingUp className="text-green-600 h-5 w-5" />
                    ) : (
                      <TrendingDown className="text-red-600 h-5 w-5" />
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Price Change</span>
                      <span className={trend.priceChange > 0 ? 'text-green-600' : 'text-red-600'}>
                        {trend.priceChange > 0 ? '+' : ''}{trend.priceChange}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-500">Forecast</span>
                      <span className="capitalize">{trend.forecast}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-500">Demand</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        trend.demand === 'high' ? 'bg-green-100 text-green-800' :
                        trend.demand === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {trend.demand.charAt(0).toUpperCase() + trend.demand.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-24 bg-gray-50 rounded flex items-center justify-center">
                    {/* Placeholder for price trend chart */}
                    <LineChart className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Seasonal Trends */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Seasonal Trends</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {marketData.seasonalTrends.map((season) => (
                    <div key={season.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{season.product}</h3>
                          <p className="text-sm text-gray-500">Next Season: {season.nextSeasonStart}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          season.currentSeason === 'Peak' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {season.currentSeason}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Price Outlook</p>
                          <p className="text-sm font-medium mt-1">{season.priceOutlook}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Stock Advice</p>
                          <p className="text-sm font-medium mt-1">{season.stockAdvice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'market-insights':
        return (
          <div className="space-y-6">
            {/* Market Insights Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Category Insights</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {marketData.marketInsights.map((insight) => (
                      <div key={insight.id} className="border-b last:border-0 pb-6 last:pb-0">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-lg ${
                            insight.impact === 'high' ? 'bg-red-100' :
                            insight.impact === 'medium' ? 'bg-yellow-100' :
                            'bg-green-100'
                          }`}>
                            <AlertCircle className={`h-5 w-5 ${
                              insight.impact === 'high' ? 'text-red-600' :
                              insight.impact === 'medium' ? 'text-yellow-600' :
                              'text-green-600'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{insight.category}</h3>
                            <p className="text-sm text-gray-600 mt-1">{insight.insight}</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                                insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {insight.impact.toUpperCase()} IMPACT
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              <span className="font-medium">Recommendation:</span> {insight.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Market Overview</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                      {/* Placeholder for market overview chart */}
                      <PieChart className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-green-800">Growing Categories</h3>
                        <ul className="mt-2 space-y-2 text-sm text-green-700">
                          <li>Organic Products</li>
                          <li>Premium Rice</li>
                          <li>Healthy Snacks</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-red-800">Declining Categories</h3>
                        <ul className="mt-2 space-y-2 text-sm text-red-700">
                          <li>Regular Spices</li>
                          <li>Processed Foods</li>
                          <li>Imported Grains</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market News and Updates */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Market News & Updates</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      title: 'New Government Policies Affecting Food Prices',
                      date: '2024-03-15',
                      type: 'Policy Update'
                    },
                    {
                      id: 2,
                      title: 'Upcoming Harvest Season Impact on Grain Prices',
                      date: '2024-03-14',
                      type: 'Market Update'
                    },
                    {
                      id: 3,
                      title: 'Consumer Trends: Rising Demand for Organic Products',
                      date: '2024-03-13',
                      type: 'Consumer Insight'
                    }
                  ].map((news) => (
                    <div key={news.id} className="flex items-start space-x-4">
                      <Info className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">{news.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">{news.date}</span>
                          <span className="text-sm text-blue-600">#{news.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Retailer Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Monitor your business performance</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm mt-4">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'overview'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'orders'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'inventory'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'alerts'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {renderTabContent()}
      </div>

      {/* Delivery Tracking Modal */}
      {showTracking && trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowTracking(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4">Delivery Tracking - {trackingOrder.id}</h2>
            <ol className="space-y-3">
              {getTrackingSteps(trackingOrder).map((step, idx) => (
                <li key={idx} className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-3 ${step.date ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                  <span className={step.date ? 'text-green-700 font-semibold' : 'text-gray-500'}>{step.label}</span>
                  {step.date && <span className="ml-auto text-xs text-gray-400">{step.date}</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
} 