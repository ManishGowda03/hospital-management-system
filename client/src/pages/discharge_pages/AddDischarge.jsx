import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserInjured,
  FaHospital,
  FaCalendarAlt,
  FaClipboardList,
  FaFileMedicalAlt,
  FaUserMd,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddDischarge = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [allPediatrics, setAllPediatrics] = useState([]);
  const [allTreatments, setAllTreatments] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const navigate = useNavigate( );

  const [discharge, setDischarge] = useState({
    patient_name: "",
    patient_id: "",
    hospital_id: "",
    discharge_date: "",
    reason_for_discharge: "",
    treatment_summary: "",
    doctor_name: "",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [patientsRes, pediatricsRes, treatmentsRes, hospitalsRes, doctorsRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/get-all-patients`),
              axios.get(`${globalBackendRoute}/api/get-all-pediatrics`),
              axios.get(`${globalBackendRoute}/api/view-all-treatments`),
          axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
          axios.get(`${globalBackendRoute}/api/view-all-doctors`),
        ]);
        setAllPatients(patientsRes.data);
        setAllPediatrics(pediatricsRes.data);
        setAllTreatments(treatmentsRes.data);
        setAllHospitals(hospitalsRes.data);
        setAllDoctors(doctorsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  const handleChange = (e) => {
    setDischarge({ ...discharge, [e.target.name]: e.target.value });
  };

  const handlePatientChange = (e) => {
  const value = e.target.value;

  // Pediatric selected
  if (value.startsWith("pediatric-")) {
    const pediatricId = value.replace("pediatric-", "");

    const selectedPediatric = allPediatrics.find(
      (p) => p._id === pediatricId
    );

    if (selectedPediatric) {
      setDischarge({
        ...discharge,
patient_id: pediatricId,
patient_type: "Pediatric",
        hospital_id: selectedPediatric.hospital_id?._id || "",
        doctor_name: selectedPediatric.doctor_id?.doctor_name || "",
      });
    }
  }

  // Normal patient selected
  else {
  const selectedTreatment = allTreatments.find(
    (t) =>
      t.patient_id?._id === value ||
      t.patient_id === value
  );

  if (selectedTreatment) {
    setDischarge({
      ...discharge,
      patient_id: value,
      patient_type: "Patient",
      hospital_id:
        selectedTreatment.hospital_id?._id ||
        selectedTreatment.hospital_id ||
        "",
      doctor_name:
        selectedTreatment.doctor_id?.doctor_name ||
        "",
    });
  }
}
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["patient_id", "hospital_id"];
    const missing = required.filter((key) => !discharge[key]);
    if (missing.length > 0) {
      alert("Missing required fields: " + missing.join(", "));
      return;
    }

    try {
      await axios.post(`${globalBackendRoute}/api/create-discharge`, discharge);
      alert("Discharge record added successfully!");
      setDischarge({
        patient_name: "",
        patient_id: "",
        hospital_id: "",
        discharge_date: "",
        reason_for_discharge: "",
        treatment_summary: "",
        doctor_name: "",
      });
      navigate("/all-discharges");
    } catch (error) {
      console.error("❌ Error adding discharge:", error);
      alert("There was an issue adding the discharge record.");
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
        value={discharge[name]}
        onChange={handleChange}
        required
        className="formInput w-full sm:w-2/3"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  const isPediatricSelected =
  discharge.patient_id &&
  discharge.patient_id.startsWith("pediatric-");

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add Discharge Details</h2>
          <Link to="/all-discharges">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Discharges
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserInjured className="text-blue-500" />
              <span className="ml-2">Patient</span>
            </label>
            <select
  name="patient_id"
value={
  discharge.patient_type === "Pediatric"
    ? `pediatric-${discharge.patient_id}`
    : discharge.patient_id
}  onChange={handlePatientChange}
  required
  className="formInput w-full sm:w-2/3"
>
  <option value="">Select patient</option>

  <optgroup label="Patients">
    {allPatients.map((p) => (
      <option key={p._id} value={p._id}>
        {p.patient_name}
      </option>
    ))}
  </optgroup>

  <optgroup label="Pediatrics">
    {allPediatrics.map((p) => (
      <option key={`pediatric-${p._id}`} value={`pediatric-${p._id}`}>
        {p.child_name}
      </option>
    ))}
  </optgroup>
</select>
          </div>

          {/* Doctor Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaUserMd className="text-green-500" />
              <span className="ml-2">Doctor</span>
            </label>
            <select
              name="doctor_name"
              value={discharge.doctor_name}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
              disabled={isPediatricSelected}
            >
              <option value="">Select doctor</option>
              {allDoctors.map((doc) => (
                <option key={doc._id} value={doc.doctor_name}>
                  {doc.doctor_name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="formLabel w-full sm:w-1/3 flex items-center">
              <FaHospital className="text-red-500" />
              <span className="ml-2">Hospital</span>
            </label>
            <select
              name="hospital_id"
              value={discharge.hospital_id}
              onChange={handleChange}
              required
              className="formInput w-full sm:w-2/3"
              disabled={isPediatricSelected}
            >
              <option value="">Select hospital</option>
              {allHospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.hospital_name}
                </option>
              ))}
            </select>
          </div>

          {/* Discharge Date */}
          {renderInput(
            "Discharge Date",
            "discharge_date",
            <FaCalendarAlt className="text-purple-500" />,
            "date"
          )}

          {/* Reason for Discharge */}
          {renderInput(
            "Reason for Discharge",
            "reason_for_discharge",
            <FaClipboardList className="text-indigo-500" />
          )}

          {/* Treatment Summary */}
<div className="flex flex-col sm:flex-row items-start gap-2">
  <label className="formLabel w-full sm:w-1/3 flex items-center">
    <FaFileMedicalAlt className="text-yellow-500" />
    <span className="ml-2">Treatment Summary</span>
  </label>

  <textarea
    name="treatment_summary"
    value={discharge.treatment_summary}
    onChange={handleChange}
    rows="4"
    className="formInput w-full sm:w-2/3 resize-none"
    placeholder="Enter treatment summary"
    required
  />
</div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Discharge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDischarge;
