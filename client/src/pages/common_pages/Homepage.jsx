import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserInjured,
  FaUserMd,
  FaHospital,
  FaCalendarCheck,
} from "react-icons/fa";

const Home = () => {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="containerWidth text-center">

          <h1 className="headingText mb-6">
            Hospital Management System
          </h1>

          <p className="paragraphText max-w-3xl mx-auto mb-8">
            A modern healthcare management platform built using the MERN Stack
            that simplifies hospital operations, patient management,
            appointment scheduling, treatment tracking, and administrative
            workflows.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/book-appointment">
              <button className="primaryBtn">
                Book Appointment
              </button>
            </Link>

            <Link to="/about-us">
              <button className="secondaryBtn">
                Learn More
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* Overview Cards */}
      <section className="containerWidth py-16">

        <h2 className="subHeadingText text-center mb-10">
          Hospital Overview
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <FaUserInjured className="text-blue-500 text-4xl mx-auto mb-4" />

            <h3 className="font-bold text-lg">
              Patients
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              Patient Records
            </p>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <FaUserMd className="text-green-500 text-4xl mx-auto mb-4" />

            <h3 className="font-bold text-lg">
              Doctors
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              Medical Specialists
            </p>
          </div>

          <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <FaHospital className="text-red-500 text-4xl mx-auto mb-4" />

            <h3 className="font-bold text-lg">
              Hospitals
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              Healthcare Facilities
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
            <FaCalendarCheck className="text-purple-500 text-4xl mx-auto mb-4" />

            <h3 className="font-bold text-lg">
              Appointments
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              Appointment Scheduling
            </p>
          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">

        <div className="containerWidth text-center">

          <h2 className="subHeadingText mb-4">
            Simplifying Healthcare Management
          </h2>

          <p className="paragraphText max-w-2xl mx-auto mb-8">
            HMS provides an efficient platform for managing hospitals,
            appointments, treatments, and patient records from a single
            centralized system.
          </p>

          <Link to="/contact-us">
            <button className="primaryBtn">
              Contact Us
            </button>
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Home;