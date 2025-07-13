import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Notifications({ isMobile = false, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const notificationsRef = useRef(null);

  const [notifications] = useState([
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
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleViewAll = () => {
    setIsOpen(false);
    if (onClose) onClose();
    navigate('/notifications');
  };

  const NotificationList = () => (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Notifications</h3>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
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
      <div className="p-4 border-t">
        <button 
          onClick={handleViewAll}
          className="text-sm text-green-600 hover:text-green-700"
        >
          View All Notifications
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <NotificationList />
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={notificationsRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 relative"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 z-50">
          <NotificationList />
        </div>
      )}
    </div>
  );
} 