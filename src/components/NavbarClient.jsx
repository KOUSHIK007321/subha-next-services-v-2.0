"use client";

// import React, { useState } from "react";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import NavLink from "./NavLink"; // Assuming you have NavLink as a separate component
import localFont from "next/font/local"; // Import local font
import { logout } from "@/actions/auth";

const myFont = localFont({ src: "../fonts/JungleFlame-nAAv4.otf" });

function NavbarClient({ authUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // New Patch added here
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Patch Ended

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="mt-2.5 md:flex space-x-4">
            <Link
              className={`${myFont.className} text-5xl mx-5 bg-gray-800 text-white font-large cursor-pointer hover:scale-105 transition-all duration-300`}
              href="/"
            >
              SCS
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center justify-center space-x-3">
            <NavLink label="Home" href="/" />
            <NavLink label="Services" href="/services" />
            <NavLink label="About" href="/about" />
            <NavLink label="Contact Us" href="/contacts" />
          </div>

          <div className="hidden md:flex space-x-5">
            {/* Conditionally render Dashboard link if user is authenticated */}
            {authUser ? (

              <div className="hidden md:flex items-center justify-center space-x-3">
                <NavLink label="Admin Panel" href="/Admin-Dashboard" />



                {/* New Patch added here */}

                <div className="relative" ref={dropdownRef}>
                  <button
                    className="mx-12 w-11 h-11 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold text-lg tracking-tight hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-150 shadow-md cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}
                  >
                    KD
                  </button>

                  {/* Dropdown with triangle connector */}
                  <div className="absolute right-0 flex justify-center w-full h-0">
                    <div
                      className={`mt-2 transition-all duration-200 ease-in-out ${isOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                        }`}
                    >
                      {/* Triangle connector */}
                      <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-800 mx-auto"></div>

                      {/* Dropdown menu */}
                      <div className="w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                        <div className="text-gray-100 flex flex-col items-center text-center">
                          <Link
                            href="/mydashboard"
                            className="block w-full px-4 py-2 hover:bg-gray-700 transition-colors duration-150"
                            onClick={() => setIsOpen(false)}
                          >
                            My Profile
                          </Link>
                          <Link
                            href="/mydashboard"
                            className="block w-full px-4 py-2 hover:bg-gray-700 transition-colors duration-150"
                            onClick={() => setIsOpen(false)}
                          >
                            Settings
                          </Link>
                          <div className="border-t border-gray-600 w-full my-1"></div>
                          <button
                            className="my-2 block w-4/5 px-3 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 active:scale-95 text-white font-medium transition-all duration-150 rounded-md cursor-pointer"
                            onClick={() => {
                              // Add your logout logic here
                              console.log("Logging out...");
                              setIsOpen(false);
                              logout();
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex space-x-5">
                <Link
                  href="/Login-Signup"
                  className="px-4 py-3 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/Login-Signup"
                  className="px-4 py-3 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"
          } md:hidden bg-gray-800 px-4 py-2 space-y-4`}
      >
        <Link
          href="/"
          onClick={toggleMenu}
          className="block text-white hover:text-green-400"
        >
          Home
        </Link>

        <Link
          href="/services"
          onClick={toggleMenu}
          className="block text-white hover:text-green-400"
        >
          Services
        </Link>

        <Link
          onClick={toggleMenu}
          href="/about"
          className="block text-white hover:text-green-400"
        >
          About
        </Link>

        <Link
          onClick={toggleMenu}
          href="/contacts"
          className="block text-white hover:text-blue-400"
        >
          Contact Us
        </Link>

        {/* Conditionally render Dashboard link if user is authenticated */}
        {authUser ? (
          <>
            <Link
              href="/Admin-Dashboard"
              className="block text-white hover:text-blue-400"
              onClick={toggleMenu}
            >
              Admin Panel
            </Link>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu();
                logout();
              }}
              className="block text-center text-white bg-red-500 my-3 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            {/* Mobile Log In Button */}
            <Link
              href="/Login-Signup"
              onClick={toggleMenu}
              className="block text-center text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Log In
            </Link>

            <Link
              href="/Login-Signup"
              onClick={toggleMenu}
              className="block text-center text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavbarClient;
