// app/page.jsx
import React from "react";
import ServiceCard from "@/app/services/serviceCard";

// This will be a Server Component that fetches data
const fetchServices = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Set your base URL for production here
  const response = await fetch(`${baseUrl}/api/fetchServices`);
  const data = await response.json();
  return data;
};

const Services = async () => {
  // Fetch the services on the server side
  const services = await fetchServices();

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Our Cybersecurity Services
          </h1>
          <p className="text-lg mb-6">
            We provide a wide range of services designed to protect your
            business from cyber threats.
          </p>
        </div>
      </section>

      {/* Services Section with Custom Gradient (70% Black, 30% Brown) */}
      <section className="py-16 bg-gradient-to-b from-black via-brown-700 to-brown-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-16">
            Our Core Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.services.map((service, index) => (
              <ServiceCard
                key={index}
                // title={service.title}
                // description={service.description}
                // details={service.details}

                title={service.SrvTitle}
                description={service.SrvDescription}
                details={service.SrvDescription}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
