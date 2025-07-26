"use client";

import { useState } from "react";
import ServiceList from "./deleteService";

export default function AdminPanel() {
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/createService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SrvTitle: serviceTitle,
          SrvDescription: serviceDescription,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Service added successfully!");
        setServiceTitle(""); // Clear form fields
        setServiceDescription("");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding service:", error);
      setMessage("Failed to add service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel-container bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Add New Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serviceTitle" className="block text-lg mb-2">
            Service Title
          </label>
          <input
            type="text"
            id="serviceTitle"
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>

        <div>
          <label htmlFor="serviceDescription" className="block text-lg mb-2">
            Service Description
          </label>
          <textarea
            id="serviceDescription"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg">{message}</p>}

      <ServiceList />

    </div>

  );
}
