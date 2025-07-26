// ServiceList.js (Frontend Component for displaying and deleting services)
import React, { useState, useEffect } from "react";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all services when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/fetchServices");
        const data = await response.json();
        if (response.ok) {
          setServices(data.services); // Assuming the response contains an array of services
        } else {
          setMessage("Failed to fetch services.");
        }
      } catch (error) {
        setMessage("Error fetching services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Delete service by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    setLoading(true);
    setMessage(""); // Reset message before deleting

    try {
      const response = await fetch("/api/deleteService", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Service deleted successfully.");
        setServices(services.filter((service) => service._id !== id)); // Remove deleted service from the list
      } else {
        setMessage(data.message || "Error deleting service.");
      }
    } catch (error) {
      setMessage("Failed to delete service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Service List</h2>
      {message && <p className="text-red-500">{message}</p>}
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service._id} className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold text-white">{service.SrvTitle}</h3>
              <p className="text-gray-300">{service.SrvDescription}</p>
              <button
                onClick={() => handleDelete(service._id)}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
