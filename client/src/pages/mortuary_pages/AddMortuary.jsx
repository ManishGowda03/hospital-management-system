import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaVenusMars,
  FaRegIdBadge,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHospital,
  FaUserMd,
  FaCross,
  FaClock,
} from "react-icons/fa";
import { MdSave } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

const AddMortuary = () => {
  const navigate = useNavigate();
  const [allPatients, setAllPatients] = useState([]);
const [allPediatrics, setAllPediatrics] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [allTreatments, setAllTreatments] = useState([]);

  const [mortuary, setMortuary] = useState({
    deceased_name: "",
    age: "",
    gender: "",
    date_of_death: "",
    time_of_death: "",
    cause_of_death: "",
    hospital_id: "",
    doctor_id: "",
    body_received_by: "",
    relation_to_deceased: "",
    contact_number: "",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [hospitals, doctors, patients, pediatrics, treatments] = await Promise.all([
  axios.get(`${globalBackendRoute}/api/view-all-hospitals`),
  axios.get(`${globalBackendRoute}/api/view-all-doctors`),
  axios.get(`${globalBackendRoute}/api/get-all-patients`),
  axios.get(`${globalBackendRoute}/api/get-all-pediatrics`),
  axios.get(`${globalBackendRoute}/api/view-all-treatments`)
]);
        setAllHospitals(hospitals.data);
        setAllDoctors(doctors.data);
        setAllPatients(patients.data);
setAllPediatrics(pediatrics.data);
setAllTreatments(treatments.data);
      } catch (error) {
        console.error("Error fetching hospital/doctor data:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setMortuary({ ...mortuary, [e.target.name]: e.target.value });
  };

const handleDeceasedChange = (e) => {
  const value = e.target.value;

  // Pediatric selected
  if (value.startsWith("pediatric-")) {
    const actualId = value.replace("pediatric-", "");

    const selected = allPediatrics.find(
      (p) => p._id === actualId
    );

    if (selected) {
      setMortuary((prev) => ({
        ...prev,

        deceased_id: actualId,
        deceased_type: "Pediatric",
        deceased_name: selected.child_name,

age: selected.date_of_birth
  ? new Date().getFullYear() -
    new Date(selected.date_of_birth).getFullYear()
  : "",        gender: selected.gender || "",

        hospital_id:
          selected.hospital_id?._id ||
          selected.hospital_id,

        doctor_id:
          selected.doctor_id?._id ||
          selected.doctor_id,
      }));
    }
  }

  // Normal patient
  else {
  const selected = allPatients.find(
    (p) => p._id === value
  );

  const patientTreatment = allTreatments.find(
    (t) =>
      t.patient_id?._id === value ||
      t.patient_id === value
  );

  if (selected) {
    setMortuary((prev) => ({
      ...prev,

      deceased_id: selected._id,
      deceased_type: "Patient",
      deceased_name: selected.patient_name,

      age: selected.age || "",
      gender: selected.gender || "",

      hospital_id:
        patientTreatment?.hospital_id?._id ||
        patientTreatment?.hospital_id ||
        "",

      doctor_id:
        patientTreatment?.doctor_id?._id ||
        patientTreatment?.doctor_id ||
        "",
    }));
  }
}
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${globalBackendRoute}/api/add-mortuary`, mortuary);
      alert("Mortuary record added successfully!");
      setMortuary({
deceased_name: "",
deceased_id: "",
deceased_type: "",
        age: "",
        gender: "",
        date_of_death: "",
        time_of_death: "",
        cause_of_death: "",
        hospital_id: "",
        doctor_id: "",
        body_received_by: "",
        relation_to_deceased: "",
        contact_number: "",
      });
      navigate("/all-mortuary");
    } catch (error) {
      console.error("Error adding mortuary record:", error);
      alert("There was an issue adding the record.");
    }
  };

  const renderInput = (
    label,
    name,
    icon,
    type = "text",
    options = null,
    placeholder = ""
  ) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="formLabel w-full sm:w-1/3 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      {options ? (
        <select
          name={name}
          value={mortuary[name]}
          onChange={handleChange}
          required
          className="formInput w-full sm:w-2/3"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option._id} value={option._id}>
                {option.hospital_name || option.doctor_name}
              </option>
            )
          )}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={mortuary[name]}
          onChange={handleChange}
          required
          className="formInput w-full sm:w-2/3"
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );

  return (
    <div className="bg-white py-10">
      <div className="compactWidth">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Add Mortuary Record</h2>
          <Link to="/all-mortuary">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Records
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
  <label className="formLabel w-full sm:w-1/3 flex items-center">
    <FaUser className="text-blue-500" />
    <span className="ml-2">Deceased Name</span>
  </label>

  <select
    value={
      mortuary.deceased_type === "Pediatric"
        ? `pediatric-${mortuary.deceased_id}`
        : mortuary.deceased_id
    }
    onChange={handleDeceasedChange}
    className="formInput w-full sm:w-2/3"
    required
  >
    <option value="">Select deceased</option>

    {allPatients.map((patient) => (
      <option key={patient._id} value={patient._id}>
        {patient.patient_name}
      </option>
    ))}

    {allPediatrics.map((pediatric) => (
      <option
        key={pediatric._id}
        value={`pediatric-${pediatric._id}`}
      >
        {pediatric.child_name} (Pediatric)
      </option>
    ))}
  </select>
</div>
          {renderInput(
            "Age",
            "age",
            <FaRegIdBadge className="text-green-500" />,
            "number"
          )}
          {renderInput(
            "Gender",
            "gender",
            <FaVenusMars className="text-pink-500" />,
            "text",
            ["Male", "Female", "Other"]
          )}
          {renderInput(
            "Date of Death",
            "date_of_death",
            <FaCross className="text-red-600" />,
            "date"
          )}
          {renderInput(
            "Time of Death",
            "time_of_death",
            <FaClock className="text-gray-500" />,
            "time"
          )}
          {renderInput(
            "Cause of Death",
            "cause_of_death",
            <FaCross className="text-red-500" />
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
  <label className="formLabel w-full sm:w-1/3 flex items-center">
    <FaHospital className="text-red-500" />
    <span className="ml-2">Hospital</span>
  </label>

  <input
    type="text"
    value={
      allHospitals.find(
        (h) => h._id === mortuary.hospital_id
      )?.hospital_name || ""
    }
    readOnly
    className="formInput w-full sm:w-2/3 bg-gray-100"
  />
</div>
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
  <label className="formLabel w-full sm:w-1/3 flex items-center">
    <FaUserMd className="text-green-500" />
    <span className="ml-2">Doctor</span>
  </label>

  <input
    type="text"
    value={
      allDoctors.find(
        (d) => d._id === mortuary.doctor_id
      )?.doctor_name || ""
    }
    readOnly
    className="formInput w-full sm:w-2/3 bg-gray-100"
  />
</div>
          {renderInput(
            "Body Received By",
            "body_received_by",
            <FaUser className="text-blue-600" />
          )}
          {renderInput(
            "Relation to Deceased",
            "relation_to_deceased",
            <FaUser className="text-purple-600" />
          )}
          {renderInput(
            "Contact Number",
            "contact_number",
            <FaPhoneAlt className="text-teal-500" />,
            "tel"
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="primaryBtn flex justify-center items-center gap-2 px-4 py-2"
            >
              <MdSave />
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMortuary;
