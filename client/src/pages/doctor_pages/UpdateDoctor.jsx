import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaClipboardCheck,
  FaBriefcase,
  FaUserGraduate,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useParams, useNavigate, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctor_name: "",
    specialization: "",
    experience_years: "",
    qualifications: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-doctor-by-id/${id}`
        );
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching doctor data:", err);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-doctor/${id}`,
        formData
      );
      alert("Doctor updated successfully!");
      navigate(`/single-doctor/${id}`);
    } catch (err) {
      console.error("Error updating doctor:", err);
      alert("Failed to update doctor.");
    }
  };

  return (
    <div className="containerWidth my-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Update Doctor Details</h2>
          <Link to="/all-doctors">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Doctors
            </button>
          </Link>
        </div>

        <EditableField
          label="Doctor Name"
          name="doctor_name"
          value={formData.doctor_name}
          onChange={handleChange}
          icon={<FaUserMd className="text-green-600" />}
        />
        <EditableField
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          icon={<FaClipboardCheck className="text-blue-600" />}
        />
        <EditableField
          label="Experience (Years)"
          name="experience_years"
          value={formData.experience_years}
          onChange={handleChange}
          icon={<FaBriefcase className="text-yellow-600" />}
        />
        <EditableField
          label="Qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          icon={<FaUserGraduate className="text-purple-600" />}
        />

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full mx-auto"
          >
            <MdSave /> Save
          </button>
        </div>
      </form>
    </div>
  );
}

function EditableField({ icon, label, name, value, onChange }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="text-sm text-gray-900 border-b border-gray-300 pb-1">
          <input
            type="text"
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
      </dd>
    </div>
  );
}
