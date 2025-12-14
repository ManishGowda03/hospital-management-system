import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaStethoscope,
  FaUserInjured,
  FaNotesMedical,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddTreatment = () => {
  const [allpatients, setAllPatients] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const navigate = useNavigate();

  const [treatment, setTreatment] = useState({
    treatment_name: "",
    hospital_id: "",
    doctor_id: "",
    patient_id: "",
    description: "",
    cost: "",
    treatment_date: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [patientsRes, doctorsRes, hospitalsRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/get-all-patients`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
        ]);
        setAllPatients(patientsRes.data);
        setAllDoctors(doctorsRes.data);
        setAllHospitals(hospitalsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  const handleChange = (e) => {
    setTreatment({ ...treatment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Treatment payload submitting to backend:", treatment);

    const required = ["hospital_id", "doctor_id", "patient_id"];
    const missing = required.filter((key) => !treatment[key]);
    if (missing.length > 0) {
      alert("Missing required fields: " + missing.join(", "));
      return;
    }

    try {
      await axios.post(`${globalBackendRoute}/api/create-treatment`, treatment);
      alert("Treatment record added successfully!");
      setTreatment({
        treatment_name: "",
        hospital_id: "",
        doctor_id: "",
        patient_id: "",
        description: "",
        cost: "",
        treatment_date: "",
      });
      navigate("/all-treatments");
    } catch (error) {
      console.error("❌ Error adding treatment:", error);
      alert("There was an issue adding the treatment.");
    }
  };

  const renderInput = (label, name, icon, type = "text") => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={treatment[name]}
        onChange={handleChange}
        required
        className="formInput w-full sm:w-2/3"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add New Treatment</h2>
          <Link to="/all-treatments">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Treatments
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput(
            "Treatment Name",
            "treatment_name",
            <FaStethoscope className="text-green-500" />
          )}

          {/* Patient Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserInjured className="text-blue-500" />
              <span className="ml-2">Patient</span>
            </label>
            <select
              name="patient_id"
              value={treatment.patient_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select patient</option>
              {allpatients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.patient_name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserInjured className="text-blue-500" />
              <span className="ml-2">Doctor</span>
            </label>
            <select
              name="doctor_id"
              value={treatment.doctor_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select doctor</option>
              {allDoctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.doctor_name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserInjured className="text-blue-500" />
              <span className="ml-2">Hospital</span>
            </label>
            <select
              name="hospital_id"
              value={treatment.hospital_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
            >
              <option value="">Select hospital</option>
              {allHospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.hospital_name}
                </option>
              ))}
            </select>
          </div>

          {renderInput(
            "Description",
            "description",
            <FaNotesMedical className="text-indigo-500" />
          )}
          {renderInput(
            "Cost",
            "cost",
            <FaMoneyBillWave className="text-yellow-500" />,
            "number"
          )}
          {renderInput(
            "Date",
            "treatment_date",
            <FaCalendarAlt className="text-purple-500" />,
            "date"
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Treatment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreatment;
