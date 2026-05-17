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
  const [allPediatrics, setAllPediatrics] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const navigate = useNavigate();

  const [treatment, setTreatment] = useState({
    treatment_name: "",
    hospital_id: "",
    doctor_id: "",
    patient_id: "",
    patient_type: "",
    description: "",
    cost: "",
    treatment_date: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [patientsRes, pediatricsRes, doctorsRes, hospitalsRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/get-all-patients`),
          axios.get(`${globalBackendRoute}/api/get-all-pediatrics`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
        ]);
        setAllPatients(patientsRes.data);
        setAllPediatrics(pediatricsRes.data);
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
        patient_type: "",
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

const isPediatricSelected =
  treatment.patient_type === "Pediatric";

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
    onChange={(e) => {
  const value = e.target.value;

  // check if selected item is pediatric
  const selectedPediatric = allPediatrics.find(
    (p) => p._id === value
  );

  if (selectedPediatric) {
    setTreatment({
      ...treatment,
      patient_id: value,
      patient_type: "Pediatric",

      doctor_id:
        selectedPediatric?.doctor_id?._id ||
        selectedPediatric?.doctor_id ||
        "",

      hospital_id:
        selectedPediatric?.hospital_id?._id ||
        selectedPediatric?.hospital_id ||
        "",
    });
  } else {
    setTreatment({
      ...treatment,
      patient_id: value,
      patient_type: "Patient",
      doctor_id: "",
      hospital_id: "",
    });
  }
}}
    required
    className="formInput w-full sm:w-2/3"
  >
    <option value="">Select patient</option>

    {/* Normal Patients */}
    <optgroup label="Patients">
      {allpatients.map((patient) => (
        <option key={patient._id} value={patient._id}>
          {patient.patient_name}
        </option>
      ))}
    </optgroup>

    {/* Pediatrics */}
    <optgroup label="Pediatrics">
      {allPediatrics.map((child) => (
        <option
          key={child._id}
          value={child._id}
        >
          {child.child_name}
        </option>
      ))}
    </optgroup>
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
              disabled={isPediatricSelected}
  className={`formInput w-full sm:w-2/3 ${
    isPediatricSelected
      ? "bg-gray-100 cursor-not-allowed"
      : ""
  }`}
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
              disabled={isPediatricSelected}
  className={`formInput w-full sm:w-2/3 ${
    isPediatricSelected
      ? "bg-gray-100 cursor-not-allowed"
      : ""
  }`}
            >
              <option value="">Select hospital</option>
              {allHospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.hospital_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-2">
  <label className="formLabel w-full sm:w-1/3 flex items-center pt-3">
    <FaNotesMedical className="text-indigo-500" />
    <span className="ml-2">Description</span>
  </label>

  <textarea
    name="description"
    value={treatment.description}
    onChange={handleChange}
    required
    rows={4}
    placeholder="Enter treatment description"
    className="formInput w-full sm:w-2/3 resize-none py-3"
  />
</div>
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
