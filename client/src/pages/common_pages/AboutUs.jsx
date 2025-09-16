import React from "react";

const AboutUs = () => {
  return (
    <div className="about-us p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          About Our Hospital Management System
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our Hospital Management System (HMS) is designed to streamline
          hospital operations, enhance patient care, and simplify administrative
          tasks. With integrated modules for patients, doctors, treatments,
          pharmacy, and billing, we ensure a seamless healthcare experience for
          all stakeholders.
        </p>
      </div>

      {/* Section 1: Three in a row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">
            Patient-Centered Care
          </h3>
          <p className="text-gray-600">
            We focus on providing patients with easy access to medical records,
            appointment scheduling, and treatment updates.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">
            Doctor Management
          </h3>
          <p className="text-gray-600">
            Doctors can efficiently manage patient histories, treatments,
            prescriptions, and follow-ups within a unified system.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">
            Pharmacy & Billing
          </h3>
          <p className="text-gray-600">
            Integrated pharmacy management and automated billing ensure
            transparency and quick processing for patients and staff.
          </p>
        </div>
      </div>

      {/* Section 2: More than 3 in a row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="p-6 shadow-md rounded-lg bg-white">
          <h4 className="font-bold text-blue-600">24/7 Support</h4>
          <p className="text-gray-600 text-sm">
            Round-the-clock assistance for patients and staff.
          </p>
        </div>
        <div className="p-6 shadow-md rounded-lg bg-white">
          <h4 className="font-bold text-blue-600">Data Security</h4>
          <p className="text-gray-600 text-sm">
            Ensuring patient confidentiality with secure records.
          </p>
        </div>
        <div className="p-6 shadow-md rounded-lg bg-white">
          <h4 className="font-bold text-blue-600">Scalable System</h4>
          <p className="text-gray-600 text-sm">
            Built to handle hospitals of all sizes, from clinics to
            multi-specialty centers.
          </p>
        </div>
        <div className="p-6 shadow-md rounded-lg bg-white">
          <h4 className="font-bold text-blue-600">Analytics</h4>
          <p className="text-gray-600 text-sm">
            Real-time insights for better decision-making and efficiency.
          </p>
        </div>
      </div>

      {/* Section 3: Single file type (mission/vision) */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Mission:</strong> To revolutionize healthcare delivery by
          providing a digital solution that improves patient experience and
          hospital efficiency.
        </p>
        <p className="text-gray-700">
          <strong>Vision:</strong> To become a trusted healthcare technology
          partner for hospitals worldwide, ensuring accessible and efficient
          care for all.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
