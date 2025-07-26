"use client";

import React from "react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ServiceCard = ({ title, description, details }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          className="group bg-gradient-to-b from-gray-800 via-brown-700 to-brown-900 p-6 rounded-lg shadow-xl hover:shadow-md hover:shadow-red-800 transition-shadow duration-300 transform hover:scale-103 border-b-4 border-r-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            borderColor: "#9c0202", // Custom dark red border color
            boxShadow: "0 4px 6px rgba(139, 0, 0, 0.5)", // Custom dark red shadow
          }}
        >
          <div className="mb-4">
            <h4 className="text-2xl font-semibold text-white">{title}</h4>
          </div>
          <p className="text-gray-300 mb-4">{description}</p>

          {/* Hover: Show details when hovered over the entire card */}

          {isHovered && (
            <HoverCardContent
              side="top"
              // sideOffset={-100}
              className={`w-80 h-60 custom-shape-upper bg-gray-800 p-6 rounded-lg shadow-xl`}
            >
              <p className="text-white">{details}</p>
            </HoverCardContent>
          )}
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default ServiceCard;
