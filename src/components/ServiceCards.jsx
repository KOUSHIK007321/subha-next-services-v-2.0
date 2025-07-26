"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ServiceCards() {
  const DefaultServices = [
    {
      id: 1,
      title: "Threat Detection",
      description:
        "Advanced monitoring systems to detect and prevent threats in real-time.",
    },
    {
      id: 2,
      title: "Data Protection",
      description:
        "Encrypt your data and ensure it remains safe with our cutting-edge solutions.",
    },
    {
      id: 3,
      title: "Security Audits",
      description:
        "Comprehensive audits to identify vulnerabilities and enhance security posture.",
    },
  ];

  const [services, setServices] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchServices"); // Ensure correct API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        console.log("API response:", result); // Debug log to check API response

        // Check if the result is an array (or if the response is wrapped in an object with a 'services' key)
        if (Array.isArray(result)) {
          setServices(result); // Set services directly to the array
        } else if (Array.isArray(result.services)) {
          setServices(result.services); // Use the 'services' key if the response is wrapped
        } else {
          console.error("Expected an array, but received:", result);
          setError("Data is not in the expected array format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return (
      <div className="flex bg-gray-900 items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl"
        >
          <CarouselContent>
            {DefaultServices.map((DefaultService) => (
              <CarouselItem
                key={DefaultService.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-gray-800 m-4 ">
                  <CardContent className="flex aspect-square items-center justify-center max-h-40">
                    <div className="p-3">
                      <h2 className="flex items-center justify-center text-2xl font-bold text-white mb-4">
                        {DefaultService.title}
                      </h2>
                      <p className="text-center text-lg text-gray-300">
                        {DefaultService.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"hidden md:flex py-6 bg-slate-800"} />
          <CarouselNext className={"hidden md:flex py-6 bg-slate-800 "} />
        </Carousel>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure that services is an array before calling .map()
  if (Array.isArray(services) && services.length > 0) {
    return (
      <div className="flex bg-gray-900 items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl"
        >
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem
                key={service.order} // Assuming _id is used as the unique key
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-gray-800 m-4 ">
                  <CardContent className="flex aspect-square items-center justify-center max-h-40">
                    <div className="p-3">
                      <h2 className="flex items-center justify-center text-2xl font-bold text-white mb-4">
                        {service.SrvTitle} {/* Assuming this is the title field */}
                      </h2>
                      <p className="text-center text-lg text-gray-300">
                        {service.SrvDescription} {/* Assuming this is the description field */}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className={"hidden md:flex py-6 bg-slate-800"} />
          <CarouselNext className={"hidden md:flex py-6 bg-slate-800 "} />
        </Carousel>
      </div>
    );
  }
  return <div>No services available</div>;
}
