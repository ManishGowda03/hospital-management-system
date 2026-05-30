import React from "react";
import {
  FaHospital,
  FaUserMd,
  FaCalendarCheck,
  FaNotesMedical,
  FaUsers,
  FaBlog,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="containerWidth py-12">

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="headingText mb-4">
          About Hospital Management System
        </h1>

        <p className="paragraphText max-w-3xl mx-auto">
          Hospital Management System (HMS) is a full-stack MERN application
          developed to simplify healthcare administration through centralized
          management of hospitals, patients, doctors, appointments,
          treatments, and healthcare services.
        </p>
      </section>

      {/* Overview */}
      <section className="mb-16">
        <h2 className="subHeadingText mb-6">
          Project Overview
        </h2>

        <p className="paragraphText leading-relaxed">
          HMS provides a centralized healthcare platform where patients can
          book appointments, manage profiles, and access medical services.
          Administrators can efficiently manage hospitals, doctors,
          treatments, blogs, and users through dedicated dashboards.
        </p>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="subHeadingText text-center mb-10">
          Core Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <FeatureCard
            color="from-purple-50 to-purple-100"
            icon={<FaCalendarCheck className="text-purple-500" />}
            title="Appointment Management"
            description="Book and manage appointments efficiently."
          />

          <FeatureCard
            color="from-green-50 to-green-100"
            icon={<FaUserMd className="text-green-500" />}
            title="Doctor Management"
            description="Manage doctors and specialists."
          />

          <FeatureCard
            color="from-red-50 to-red-100"
            icon={<FaHospital className="text-red-500" />}
            title="Hospital Management"
            description="Manage hospitals and facilities."
          />

          <FeatureCard
            color="from-blue-50 to-blue-100"
            icon={<FaUsers className="text-blue-500" />}
            title="Patient Management"
            description="Manage patient records and profiles."
          />

          <FeatureCard
            color="from-orange-50 to-orange-100"
            icon={<FaNotesMedical className="text-orange-500" />}
            title="Treatment Tracking"
            description="Track treatments and diagnoses."
          />

          <FeatureCard
            color="from-indigo-50 to-indigo-100"
            icon={<FaBlog className="text-indigo-500" />}
            title="Blog Management"
            description="Publish healthcare awareness blogs."
          />

        </div>
      </section>

      {/* Technologies */}
      <section className="mb-16">
        <h2 className="subHeadingText mb-6">
          Technologies Used
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {[
    { name: "React.js", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    { name: "Node.js", color: "bg-green-50 text-green-700 border-green-200" },
    { name: "Express.js", color: "bg-gray-50 text-gray-700 border-gray-200" },
    { name: "MongoDB", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { name: "JWT", color: "bg-orange-50 text-orange-700 border-orange-200" },
    { name: "Tailwind CSS", color: "bg-sky-50 text-sky-700 border-sky-200" },
    { name: "Multer", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { name: "REST APIs", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  ].map((tech) => (
    <div
      key={tech.name}
      className={`${tech.color} border rounded-xl p-4 text-center font-medium shadow-sm hover:shadow-md transition-all duration-300`}
    >
      {tech.name}
    </div>
  ))}
</div>
      </section>

      {/* Objective */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="subHeadingText mb-4">
          Project Objective
        </h2>

        <p className="paragraphText">
          The objective of HMS is to demonstrate a complete MERN Stack
          application featuring authentication, role-based access control,
          appointment scheduling, hospital management, treatment tracking,
          content management, and responsive UI design.
        </p>
      </section>

    </div>
  );
};

const FeatureCard = ({
  color,
  icon,
  title,
  description,
}) => (
  <div
    className={`bg-gradient-to-r ${color} rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300`}
  >
    <div className="text-4xl mb-4">
      {icon}
    </div>

    <h3 className="font-bold text-lg mb-2">
      {title}
    </h3>

    <p className="text-gray-600 text-sm">
      {description}
    </p>
  </div>
);

export default AboutUs;