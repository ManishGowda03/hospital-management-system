import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHospital,
  FaUserMd,
  FaClock,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function UpdateAppointmentSuperadmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    patient_name: "",
    contact_number: "",
    email: "",
    hospital_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
    status: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, hospitalRes, doctorRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/view-appointment-by-id/${id}`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
        ]);
        const data = res.data;
        setAppointment({
          ...data,
          hospital_id: data.hospital_id?._id || data.hospital_id,
          doctor_id: data.doctor_id?._id || data.doctor_id,
          doctor_name: data.doctor_id?.doctor_name || "",
hospital_name: data.hospital_id?.hospital_name || "",
appointment_date: data.appointment_date
  ? data.appointment_date.slice(0, 10)
  : "",
        });
        setHospitals(hospitalRes.data);
        setDoctors(doctorRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-appointment/${id}`,
        appointment
      );
      alert("Appointment updated successfully!");
      navigate(`/single-appointment-superadmin/${id}`);
    } catch (err) {
      console.error("Error updating appointment:", err);
      alert("Failed to update appointment.");
    }
  };

  const renderField = (
  label,
  name,
  icon,
  type = "text",
  readOnly = false
) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
    <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
      {icon} {label}
    </dt>

    <dd className="mt-1 sm:col-span-2 sm:mt-0">
      <input
        type={type}
        name={name}
        value={appointment[name] || ""}
        onChange={handleChange}
        readOnly={readOnly}
        className={`w-full text-sm border-b border-gray-300 bg-transparent focus:outline-none ${
          readOnly
            ? "text-gray-600 cursor-not-allowed"
            : ""
        }`}
      />
    </dd>
  </div>
);

  return (
    <div className="containerWidth my-6">
  <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Update Appointment</h2>
          <Link to="/all-appointments-superadmin">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Appointments
            </button>
          </Link>
        </div>

         {renderField(
  "Patient Name",
  "patient_name",
  <FaUser className="text-blue-500" />,
  "text",
  true
)}

{renderField(
  "Contact Number",
  "contact_number",
  <FaPhone className="text-green-500" />,
  "text",
  true
)}

{renderField(
  "Email",
  "email",
  <FaEnvelope className="text-red-500" />,
  "text",
  true
)}

{renderField(
  "Doctor",
  "doctor_name",
  <FaUserMd className="text-teal-600" />,
  "text",
  true
)}

{renderField(
  "Hospital",
  "hospital_name",
  <FaHospital className="text-pink-500" />,
  "text",
  true
)}

{renderField(
  "Appointment Date",
  "appointment_date",
  <FaCalendarAlt className="text-purple-500" />,
  "date",
  true
)}

{renderField(
  "Appointment Time",
  "appointment_time",
  <FaClock className="text-yellow-500" />,
  "time",
  true
)}

{renderField(
  "Reason",
  "reason",
  <FaClipboardList className="text-indigo-500" />,
  "text",
  true
)}
<div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
  <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
    <FaClipboardList className="text-green-600" />
    Status
  </dt>

  <dd className="mt-1 sm:col-span-2 sm:mt-0">
    <select
      name="status"
      value={appointment.status}
      onChange={handleChange}
      className="w-full text-sm border-b border-gray-300 bg-transparent focus:outline-none"
    >
      <option value="Scheduled">Scheduled</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </dd>
</div>

<div className="mt-6 text-center">           
   <button
              type="submit"
className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full mx-auto"            >
              <MdSave />
              Save Changes
            </button>
          </div>
        </form>
      </div>
  );
}
