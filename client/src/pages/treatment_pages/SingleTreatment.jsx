import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaStethoscope,
  FaUserInjured,
  FaNotesMedical,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUserMd,
FaHospital,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, useParams, Link } from "react-router-dom";
import globalBackendRoute from "../../config/Config";

export default function SingleTreatment() {
  const [treatment, setTreatment] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/view-treatment-by-id/${id}`)
      .then((res) => setTreatment(res.data))
      .catch((err) => console.error("Error fetching treatment:", err.message));
  }, [id]);

  const handleUpdate = () => navigate(`/update-treatment/${id}`);

  if (!treatment) return <div className="text-center py-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="containerWidth my-6"
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="headingText">Treatment Details</h2>
          <Link to="/all-treatments">
            <button className="fileUploadBtn text-sm py-1 px-3">
              View All Treatments
            </button>
          </Link>
        </div>

        <div className="border-t border-gray-200 divide-y divide-gray-100">
          <DetailField
            icon={<FaStethoscope className="text-green-600" />}
            label="Treatment Name"
            value={treatment.treatment_name}
          />
          <DetailField
            icon={<FaUserInjured className="text-blue-600" />}
            label="Patient Name"
            value={treatment.patient_id?.patient_name ||
    treatment.patient_id?.child_name}
          />
          <DetailField
  icon={<FaUserMd className="text-teal-600" />}
  label="Doctor Name"
  value={treatment.doctor_id?.doctor_name}
/>

<DetailField
  icon={<FaHospital className="text-red-500" />}
  label="Hospital Name"
  value={treatment.hospital_id?.hospital_name}
/>
          <DetailField
            icon={<FaNotesMedical className="text-indigo-600" />}
            label="Diagnosis"
            value={treatment.description}
          />
          <DetailField
            icon={<FaMoneyBillWave className="text-yellow-600" />}
            label="Treatment Cost"
            value={`₹${treatment.cost}`}
          />
          <DetailField
            icon={<FaCalendarAlt className="text-purple-600" />}
            label="Treatment Date"
            value={treatment.treatment_date?.slice(0, 10)}
          />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleUpdate}
            className="primaryBtn w-fit px-4 flex items-center gap-2 rounded-full mx-auto"
          >
            <MdEdit /> Update
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DetailField({ icon, label, value }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 px-2 sm:px-4">
      <dt className="flex items-center text-sm font-medium text-gray-700 gap-2">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value || "N/A"}
      </dd>
    </div>
  );
}
