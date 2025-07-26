"use client";

import ServiceCards from "@/components/ServiceCards";
import Link from "next/link";

// This will be a Server Component that fetches data
const services = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Set your base URL for production here
  const response = await fetch(`${baseUrl}/api/fetchServices`);
  const data = await response.json();
  return data;
};


export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            Protecting Your Digital World
          </h2>
          <p className="text-lg mb-6">
            We provide cutting-edge cybersecurity solutions to keep your data
            and systems secure.
          </p>
          <Link
            href="/services"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl text-indigo-400 font-semibold mb-6">
            Our Services
          </h3>
        </div>
        <ServiceCards services/>
      </section>

      {/* Testimonials Section */}
      <section className="pb-16 bg-gray-900">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl text-indigo-400 font-semibold mb-6">
            What Our Clients Say
          </h3>
          <div className="flex flex-col gap-8 items-center md:flex-row justify-center">
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md mt-8 md:mt-0">
              <p className="text-lg text-gray-300 mb-4">
                "SecureTech provided us with the most reliable and robust
                cybersecurity services. Our data has never been more secure!"
              </p>
              <a
                href="https://tacsecurity.com/team/trishneet-arora/"
                target="_blank"
                className="font-semibold text-indigo-500"
              >
                Trishneet Arora
              </a>
              <p className="text-gray-400">
                Founder & CEO, TAC Security Pvt. Ltd.
              </p>
            </div>
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md mt-8 md:mt-0">
              <p className="text-lg text-gray-300 mb-4">
                "The security audit conducted by SecureTech helped us find and
                fix critical vulnerabilities. Their team is highly
                professional."
              </p>
              <a
                href="https://www.crunchbase.com/person/sanjay-dalal"
                target="_blank"
                className="font-semibold text-indigo-500"
              >
                Sanjoy Dalal
              </a>
              <p className="text-gray-400">CEO, oGoing pvt. ltd.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
