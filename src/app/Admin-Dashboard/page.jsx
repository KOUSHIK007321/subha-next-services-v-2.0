'use client';

import { useState, useEffect } from 'react';

export default function AdminHome() {
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch notification count on component mount
  useEffect(() => {
    fetchNotificationCount();

    // Set up polling to check for new notifications every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const response = await fetch('/api/notifications/count');
      if (response.ok) {
        const data = await response.json();
        setNotificationCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  return (
    <div className="bg-white p-12 h-[65vh] max-w-4xl mx-auto">
      {/* Page Header */}
      <h1 className="text-5xl font-bold text-black text-center mb-16">
        Welcome to the SCS Admin Dashboard
      </h1>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Services Button */}
        <button className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-blue-400 rounded-lg p-8 text-center transition-all duration-200 shadow-lg hover:shadow-xl">
          <div className="text-blue-400 text-xl font-semibold mb-2">
            Services
          </div>
          <div className="text-gray-300 text-sm">
            Manage system services
          </div>
        </button>

        {/* Notifications Button with Badge */}
        <button className="relative bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-green-400 rounded-lg p-8 text-center transition-all duration-200 shadow-lg hover:shadow-xl">
          <div className="text-green-400 text-xl font-semibold mb-2">
            Notifications
          </div>
          <div className="text-gray-300 text-sm">
            View and manage alerts
          </div>
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>

        {/* Settings Button */}
        <button className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-purple-400 rounded-lg p-8 text-center transition-all duration-200 shadow-lg hover:shadow-xl">
          <div className="text-purple-400 text-xl font-semibold mb-2">
            Settings
          </div>
          <div className="text-gray-300 text-sm">
            Configure system settings
          </div>
        </button>
      </div>
    </div>
  );
}


