// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Home, Users, Settings, Menu, X, Layers } from "lucide-react";

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`${sidebarOpen ? "w-60" : "w-15"
//           } bg-gray-800 text-white transition-all duration-300 ease-in-out`}
//       >
//         <div className="flex justify-between items-center p-4 border-b border-gray-700">
//           <h2 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>SCS Admin</h2>
//           <button onClick={toggleSidebar} className="text-white focus:outline-none">
//             {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         <nav className="mt-6">
//           <ul>
//             <li>
//               <Link
//                 href="/admin"
//                 className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
//               >
//                 <Home size={24} />
//                 <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Home</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="test/Admin-Dashboard/users"
//                 className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
//               >
//                 <Users size={24} />
//                 <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Manage Users</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="test/Admin-Dashboard/Service-Dashboard"
//                 className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
//               >
//                 <Layers size={24} />
//                 <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Manage Services</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="test/Admin-Dashboard/Settings"
//                 className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
//               >
//                 <Settings size={24} />
//                 <span className={`ml-4 ${!sidebarOpen && "hidden"}`}>Settings</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 overflow-x-hidden overflow-y-auto">
//         <div className="container mx-auto px-6 py-8">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }








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
    if (path === "/test/Admin-Dashboard" && pathname === "/test/Admin-Dashboard") {
      return true;
    }
    return pathname.startsWith(path) && path !== "/test/Admin-Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-60" : "w-15"
          } bg-gray-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className={`flex-1 text-center ${!sidebarOpen && "hidden"}`}>
            <h2 className="font-bold text-xl">SCS Admin</h2>
          </div>
          <button onClick={toggleSidebar} className="text-white focus:outline-none cursor-pointer hover:bg-blue-600 rounded">
            {sidebarOpen ? <X size={30} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            <li>
              <Link
                href="/admin"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/admin")
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
                href="/test/Admin-Dashboard/users"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/test/Admin-Dashboard/users")
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
                href="/admin/services"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/admin/services")
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
                href="/admin/settings"
                className={`flex items-center px-4 py-3 transition-colors ${isActive("/admin/settings")
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
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

