import React, { useState } from 'react';
import {
  BarChart2,
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  ArrowDown,
  ArrowUp,
  DollarSign,
  Truck,
  Star,
  Bell,
  Settings,
  Calendar,
  Plus,
  Edit,
  Trash2,
  FileText,
  ShoppingBag,
  Tag,
  Edit2
} from 'lucide-react';

export function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [orderFilter, setOrderFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [productFilter, setProductFilter] = useState('all');
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'ORD-2024-001',
      customer: 'Green Mart Retail',
      items: [
        { name: 'Premium Basmati Rice', quantity: '500 kg', price: 75000 },
        { name: 'Organic Turmeric Powder', quantity: '100 kg', price: 25000 }
      ],
      total: 100000,
      status: 'processing',
      date: '2024-03-15',
      paymentStatus: 'paid',
      location: ''
    },
    {
      id: 'ORD-2024-002',
      customer: 'Fresh Foods Store',
      items: [
        { name: 'Yellow Toor Dal', quantity: '300 kg', price: 45000 }
      ],
      total: 45000,
      status: 'shipped',
      date: '2024-03-14',
      paymentStatus: 'pending',
      location: ''
    }
  ]);

  const ORDER_STATUSES = [
    'pending',
    'processing',
    'dispatched',
    'shipped',
    'out for delivery',
    'delivered',
    'cancelled',
    'refunded',
    'returned'
  ];

  // Placeholder data - in production, this would come from an API
  const dashboardData = {
    stats: {
      totalRevenue: 450000,
      totalOrders: 128,
      activeOrders: 12,
      totalCustomers: 45,
      revenueGrowth: 15.8,
      orderGrowth: 8.5,
      customerGrowth: 12.3,
      averageRating: 4.7,
      totalProducts: 20,
      lowStockProducts: 3
    },
    topProducts: [
      {
        id: 1,
        name: 'Premium Basmati Rice',
        totalSales: 185000,
        quantity: '2500 kg',
        growth: 12.5,
        image: 'https://via.placeholder.com/40',
        category: 'Rice',
        price: 75,
        stock: 10,
        status: 'in-stock'
      },
      {
        id: 2,
        name: 'Organic Turmeric Powder',
        totalSales: 95000,
        quantity: '800 kg',
        growth: 8.3,
        image: 'https://via.placeholder.com/40',
        category: 'Spices',
        price: 120,
        stock: 5,
        status: 'low-stock'
      },
      {
        id: 3,
        name: 'Yellow Toor Dal',
        totalSales: 78000,
        quantity: '1200 kg',
        growth: -2.1,
        image: 'https://via.placeholder.com/40',
        category: 'Pulses',
        price: 95,
        stock: 0,
        status: 'out-of-stock'
      }
    ],
    notifications: [
      {
        id: 1,
        type: 'order',
        message: 'New order received from Green Mart Retail',
        time: '5 minutes ago'
      },
      {
        id: 2,
        type: 'payment',
        message: 'Payment received for order #ORD-2024-001',
        time: '1 hour ago'
      },
      {
        id: 3,
        type: 'alert',
        message: 'Low stock alert: Premium Basmati Rice',
        time: '2 hours ago'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'dispatched':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'out for delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getGrowthIndicator = (value) => {
    if (value > 0) {
      return (
        <span className="flex items-center text-green-600">
          <ArrowUp className="w-4 h-4 mr-1" />
          {value}%
        </span>
      );
    }
    return (
      <span className="flex items-center text-red-600">
        <ArrowDown className="w-4 h-4 mr-1" />
        {Math.abs(value)}%
      </span>
    );
  };

  const getTrackingSteps = (order) => [
    { label: 'Order Placed', date: order.date },
    { label: 'Processing', date: order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? order.date : null },
    { label: 'Shipped', date: order.status === 'shipped' || order.status === 'delivered' ? order.date : null },
    { label: 'Delivered', date: order.status === 'delivered' ? order.date : null }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            {getGrowthIndicator(dashboardData.stats.revenueGrowth)}
          </div>
          <h3 className="text-2xl font-bold">₹{dashboardData.stats.totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-600">Total Revenue</p>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            {getGrowthIndicator(dashboardData.stats.orderGrowth)}
          </div>
          <h3 className="text-2xl font-bold">{dashboardData.stats.totalOrders}</h3>
          <p className="text-gray-600">Total Orders</p>
        </div>

        {/* Customers Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            {getGrowthIndicator(dashboardData.stats.customerGrowth)}
          </div>
          <h3 className="text-2xl font-bold">{dashboardData.stats.totalCustomers}</h3>
          <p className="text-gray-600">Total Customers</p>
        </div>

        {/* Rating Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold">{dashboardData.stats.averageRating}</h3>
          <p className="text-gray-600">Average Rating</p>
        </div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <select
                className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{order.customer}</h3>
                      <p className="text-sm text-gray-500">{order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600 flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                    <span className="font-medium">Total: ₹{order.total.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500">Location: {order.location || 'N/A'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Top Products</h2>
              <select
                className="bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dashboardData.topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">Sold: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{product.totalSales.toLocaleString()}</p>
                    {getGrowthIndicator(product.growth)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Recent Notifications</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {dashboardData.notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'order' ? 'bg-blue-100' :
                  notification.type === 'payment' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {notification.type === 'order' ? (
                    <Package className={`h-5 w-5 ${
                      notification.type === 'order' ? 'text-blue-600' :
                      notification.type === 'payment' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  ) : notification.type === 'payment' ? (
                    <DollarSign className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Export Orders</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {order.items.map((item, index) => (
                    <div key={index}>{item.name} × {item.quantity}</div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.total.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.location || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => openEditModal(order)}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={productSearchTerm}
              onChange={(e) => setProductSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            className="border rounded-lg py-2 px-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.topProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">SKU: PRD-{product.id}</p>
              </div>
              <Tag className="text-green-600" />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Total Sales</span>
                <span className="font-medium text-gray-900">₹{product.totalSales.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <span>Quantity Sold</span>
                <span className="font-medium text-gray-900">{product.quantity}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <span>Growth</span>
                {getGrowthIndicator(product.growth)}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button className="text-gray-600 hover:text-gray-900">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Export Customers</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            name: 'Green Mart Retail',
            orders: 45,
            totalSpent: 350000,
            lastOrder: '2024-03-15',
            status: 'active'
          },
          {
            id: 2,
            name: 'Fresh Foods Store',
            orders: 32,
            totalSpent: 280000,
            lastOrder: '2024-03-14',
            status: 'active'
          }
        ].map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-500">Customer ID: CUST-{customer.id}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {customer.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Total Orders</span>
                <span className="font-medium text-gray-900">{customer.orders}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <span>Total Spent</span>
                <span className="font-medium text-gray-900">₹{customer.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <span>Last Order</span>
                <span className="font-medium text-gray-900">{customer.lastOrder}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button className="text-blue-600 hover:text-blue-800">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
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
            <option value="year">This Year</option>
          </select>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Download Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            {/* Placeholder for sales chart */}
            <p className="text-gray-500">Sales Chart Coming Soon</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            {/* Placeholder for order trends chart */}
            <p className="text-gray-500">Order Trends Chart Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Add this function to select tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'products':
        return renderProductsTab();
      case 'orders':
        return renderOrdersTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return null;
    }
  };

  // Function to open the edit modal
  const openEditModal = (order) => {
    setEditingOrder(order);
    setEditStatus(order.status);
    setEditLocation(order.location || '');
    setEditModalOpen(true);
  };

  // Function to save the changes
  const saveOrderEdit = () => {
    if (editingOrder) {
      setRecentOrders(prevOrders => prevOrders.map(order =>
        order.id === editingOrder.id
          ? { ...order, status: editStatus, location: editLocation }
          : order
      ));
    }
    setEditModalOpen(false);
    setEditingOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your products and orders</p>
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
              onClick={() => setActiveTab('products')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'products'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
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
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'analytics'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analytics
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

      {/* Edit Order Modal */}
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
                {ORDER_STATUSES.map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
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