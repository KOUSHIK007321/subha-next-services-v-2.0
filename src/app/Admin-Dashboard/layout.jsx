"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings, Menu, X, Layers } from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Check if the current path matches the menu item path
  const isActive = (path) => {
    if (path === "/Admin-Dashboard" && pathname === "/Admin-Dashboard") {
      return true;
    }
    return pathname.startsWith(path) && path !== "/Admin-Dashboard";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-60" : "w-15"
          } bg-gray-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className={`flex-1 text-center ${!sidebarOpen && "hidden"}`}>
            <h1 className="font-bold text-xl">SCS Admin</h1>
          </div>
          <button onClick={toggleSidebar} className="text-white focus:outline-none cursor-pointer hover:bg-blue-600 rounded">
            {sidebarOpen ? <X size={30} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="mt-0">
          <ul>
            <li>
              <Link
                href="/Admin-Dashboard"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/Admin-Dashboard")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
                  }`}
              >
                <Home size={24} />
                <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Admin-Dashboard/Manage-Users"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/Admin-Dashboard/Manage-Users")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
                  }`}
              >
                <Users size={24} />
                <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Manage Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Admin-Dashboard/Manage-Services"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/Admin-Dashboard/Manage-Services")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
                  }`}
              >
                <Layers size={24} />
                <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Manage Services</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Admin-Dashboard/Settings"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/Admin-Dashboard/Settings")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
                  }`}
              >
                <Settings size={24} />
                <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="bg-white flex-1 p-4">
        {children}
      </div>
    </div>

  );
}

