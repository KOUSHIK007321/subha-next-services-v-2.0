import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-6">
          About Us
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          We are a leading cybersecurity company dedicated to protecting your digital world.
          With cutting-edge technology and a team of seasoned experts, we provide unparalleled
          security services to ensure your peace of mind.
        </p>

        {/* Mission and Vision Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-16">
          {/* Mission */}
          <div className="text-left space-y-6">
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-300">
              Our mission is to safeguard businesses and individuals from the ever-evolving
              landscape of cyber threats. We employ advanced threat detection systems, provide
              continuous monitoring, and ensure the highest level of protection for your digital assets.
            </p>
          </div>

          {/* Vision */}
          <div className="text-left space-y-6">
            <h2 className="text-3xl font-semibold text-blue-500 mb-4">Our Vision</h2>
            <p className="text-base sm:text-lg text-gray-300">
              To be the most trusted cybersecurity partner globally, empowering organizations
              to focus on innovation without the constant worry of cyber attacks. We aim to stay
              ahead of cybercriminals by implementing proactive and adaptive security strategies.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Our team consists of certified cybersecurity professionals with a deep understanding
            of the latest security protocols, compliance standards, and emerging threats. We use
            a customer-centric approach, ensuring that our solutions are tailor-made to meet the
            unique security needs of your business.
          </p>

          {/* Feature Cards */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-80">
              <h3 className="text-xl font-semibold text-blue-500 mb-4">Expert Team</h3>
              <p className="text-gray-400">
                Our team is composed of certified experts who are constantly upgrading their skills
                to stay ahead of emerging cyber threats.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-80">
              <h3 className="text-xl font-semibold text-blue-500 mb-4">Proven Solutions</h3>
              <p className="text-gray-400">
                We provide scalable and effective security solutions that help businesses prevent
                and recover from cyber incidents.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-80">
              <h3 className="text-xl font-semibold text-blue-500 mb-4">24/7 Support</h3>
              <p className="text-gray-400">
                Our support team is always available to provide assistance, ensuring your business
                remains secure around the clock.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="/contacts"
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
