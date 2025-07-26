"use client";
import { useState } from "react";
import {
  FaUserAlt,
  FaEnvelope,
  FaMobileAlt,
  FaHome,
  FaLock,
} from "react-icons/fa"; // Icons for various fields

export default function Profile() {
  const [formData, setFormData] = useState({
    userId: "john_doe123",
    password: "********",
    name: "John Doe",
    email: "John123@gmai.com",
    phone: "+91 9635436372", // Renamed here
    address: "1234 Elm St, Springfield, IL, 62701, USA",
  });

  // State to manage the editing status of the entire profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // State to manage the editing status of each field individually
  const [editMode, setEditMode] = useState({
    userId: false,
    password: false,
    name: false,
    email: false,
    phone: false, // Renamed here
    address: false,
  });

  // State to track the verification status of the phone number
  const [verifyStatus, setVerifyStatus] = useState("Verify");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEditMode = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field], // Toggle the specific field's edit mode
    });
  };

  const handleSave = (field) => {
    console.log(`${field} updated:`, formData[field]);
    setEditMode({
      ...editMode,
      [field]: false, // Exit editing mode for the specific field
    });
  };

  const toggleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile); // Toggle profile edit mode
  };

  const handleVerifyPhone = () => {
    setVerifyStatus("Verifying..."); // Change text to 'Verifying...'
    setTimeout(() => {
      setVerifyStatus("Verified");
      alert("Phone number verified!"); // Change text to 'Verified' after a delay
    }, 2000); // Simulate phone verification
  };

  const verifyButtonClass = () => {
    switch (verifyStatus) {
      case "Verifying...":
        return "bg-blue-400 hover:bg-lightblue-600 text-white";
      case "Verified":
        return "bg-green-500 hover:bg-green-600 text-white";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Profile Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              {/* User ID */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaUserAlt className="text-gray-500 w-6 h-6" />
                  <span className="font-semibold whitespace-nowrap mr-4">
                    User ID:
                  </span>
                </div>
                {isEditingProfile && editMode.userId ? (
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      onClick={() => handleSave("userId")}
                      className="ml-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <p>{formData.userId}</p>
                    {isEditingProfile && (
                      <button
                        onClick={() => toggleEditMode("userId")}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaUserAlt className="text-gray-500 w-6 h-6" />
                  <span className="font-semibold whitespace-nowrap mr-4">
                    Name:
                  </span>
                </div>
                {isEditingProfile && editMode.name ? (
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      onClick={() => handleSave("name")}
                      className="ml-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <p>{formData.name}</p>
                    {isEditingProfile && (
                      <button
                        onClick={() => toggleEditMode("name")}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-gray-500 w-6 h-6" />
                  <span className="font-semibold whitespace-nowrap mr-4">
                    Email:
                  </span>
                </div>
                {isEditingProfile && editMode.email ? (
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      onClick={() => handleSave("email")}
                      className="ml-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <p>{formData.email}</p>
                    {isEditingProfile && (
                      <button
                        onClick={() => toggleEditMode("email")}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaMobileAlt className="text-gray-500 w-6 h-6" />
                  <span className="font-semibold whitespace-nowrap mr-4">
                    Phone:
                  </span>
                </div>
                {isEditingProfile && editMode.phone ? (
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      onClick={() => handleSave("phone")}
                      className="ml-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <p>{formData.phone}</p>
                    {isEditingProfile && (
                      <button
                        onClick={() => toggleEditMode("phone")}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
                {/* Verify Button */}
                {!editMode.phone && !isEditingProfile && (
                  <button
                    onClick={handleVerifyPhone}
                    className={`${verifyButtonClass()} ml-2 py-1 px-3 rounded-lg transition-all duration-500 ease-in-out`}
                  >
                    {verifyStatus}
                  </button>
                )}
              </div>

              {/* Address */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaHome className="text-gray-500 w-6 h-6" />
                  <span className="font-semibold whitespace-nowrap mr-4">
                    Address:
                  </span>
                </div>
                {isEditingProfile && editMode.address ? (
                  <div className="flex items-center w-full space-x-2">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      onClick={() => handleSave("address")}
                      className="ml-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <p>{formData.address}</p>
                    {isEditingProfile && (
                      <button
                        onClick={() => toggleEditMode("address")}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-gray-500 w-6 h-6" />
                  <span className="font-semibold whitespace-nowrap mr-4">
                    Password:
                  </span>
                </div>
                {isEditingProfile && editMode.password ? (
                  <div className="flex items-center w-full space-x-2">
                    <input
                      type="password"
                      name="password"
                      value={
                        formData.password === "********"
                          ? ""
                          : formData.password
                      }
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      onClick={() => handleSave("password")}
                      className="ml-2 bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between w-full">
                    <p>{formData.password}</p>
                    {isEditingProfile && (
                      <button
                        onClick={() => toggleEditMode("password")}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              {!isEditingProfile ? (
                <button
                  onClick={toggleProfileEdit}
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={toggleProfileEdit}
                  className="w-full py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              )}
              <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
