"use client";

import Link from "next/link";
// import { useAuth } from "@/app/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import IL from "@/lib/getAuthUser";

export default function Navbar() {
  const isLoggedIn = IL();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const menuItems = ["Home", "Service", "About", "Contact Us"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ...existing code for mobile menu...
  const ProfileDropdown = () => (
    <div className="relative" ref={profileDropdownRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        KD
      </button>

      {/* Updated Dropdown Menu with adjusted positioning and triangle connector */}
      <div
        className={`absolute right-[-60px] mt-4 w-40 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-in-out ${
          isProfileOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Updated Triangle Connector */}
        <div
          className="absolute -top-[6px] right-[72px] w-0 h-0 z-10"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "10px solid rgb(31, 41, 55)", // Matches bg-gray-800
            filter: "drop-shadow(0 -1px 1px rgba(0,0,0,0.1))",
          }}
        />
        <Link
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 text-center"
          onClick={() => setIsProfileOpen(false)}
        >
          My Profile
        </Link>
        <Link
          href="/settings"
          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 text-center"
          onClick={() => setIsProfileOpen(false)}
        >
          Settings
        </Link>

        {/* Separator */}
        <div className="my-1 border-t border-gray-600"></div>

        {/* Red Logout Button */}
        <button
          onClick={() => {
            logout();
            setIsProfileOpen(false);
          }}
          className="flex items-center justify-center my-3 px-6 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 font-medium transition-colors duration-200 rounded-md w-24 mx-auto block text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          {/* Logo */}
          <div className="w-48 flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-300 hover:text-white px-4 py-3 rounded-md text-sm font-bold relative group hover:bg-gray-600"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="w-48 hidden md:flex items-center justify-end">
            {isLoggedIn ? (
              <div className="flex items-center space-x-8">
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-white px-4 py-3 rounded-md text-sm font-bold relative group hover:bg-gray-600"
                >
                  Admin Panel
                </Link>
                <ProfileDropdown />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="bg-green-500 text-white hover:text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-green-600"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-600 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile 3 line Menu Button */}
          <div
            className="md:hidden flex items-center flex-1 justify-end"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile Menu */}
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } md:hidden absolute top-16 right-0 w-full bg-gray-800 shadow-lg py-2`}
            >
              <div className="px-2 py-2 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="block text-center px-4 py-2 text-sm font-bold text-gray-200 hover:bg-gray-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}

                {/* For the mobile menu, update the logged in section: */}
                {isLoggedIn ? (
                  <>
                    {/* Separator before Admin Panel */}
                    <div className="my-2 border-t border-gray-600"></div>

                    <Link
                      href="/admin"
                      className="block text-center px-4 py-2 text-sm font-bold text-gray-200 hover:bg-gray-700 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="mx-auto block px-6 py-1.5 mt-2 font-bold text-sm bg-red-500 text-white hover:bg-red-600 rounded-md transition-colors duration-200 w-24"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="my-2 border-t border-gray-600"></div>
                    <div className="px-2 py-2">
                      <div className="flex justify-center space-x-4">
                        <Link
                          href="/login"
                          className="w-1/3 text-center px-4 py-2 text-sm font-bold bg-green-500 text-white hover:bg-green-600 rounded-md transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className="w-1/3 text-center px-4 py-2 text-sm font-bold bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
