import React from 'react';

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'You have received a new order for 2 items',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Order Delivered',
      message: 'Your order #123 has been delivered successfully',
      time: '1 hour ago',
      read: true
    },
    {
      id: 3,
      title: 'Special Offer',
      message: 'Get 20% off on all electronics today!',
      time: '2 hours ago',
      read: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Notifications</h1>
      <div className="bg-white rounded-lg shadow-lg">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
              !notification.read ? 'bg-green-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 