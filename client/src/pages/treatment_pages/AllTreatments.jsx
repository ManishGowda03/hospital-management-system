import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaStethoscope,
  FaUserInjured,
  FaNotesMedical,
  FaMoneyBillWave,
  FaUserMd,
FaHospital,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-all-treatments`
        );
        setTreatments(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching treatments:", error.message);
        toast.error("Failed to fetch treatment records.");
      }
    };
    fetchTreatments();
  }, []);

  const handleDeleteTreatment = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-treatment/${id}`
      );
      if (res.status === 200) {
        setTreatments((prev) => prev.filter((t) => t._id !== id));
        toast.success("Treatment record deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record.");
    }
  };

  const filtered = searchQuery.trim()
    ? treatments.filter((t) => {
        const full =
          `${t.treatment_name} ${t.patient_id} ${t.diagnosis}`.toLowerCase();
        const words = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w && !stopwords.includes(w));
        return words.some(
          (word) => full.includes(word) || full.includes(word.replace(/s$/, ""))
        );
      })
    : treatments;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Treatments{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filtered.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-4">
            <FaThList
              className={`text-xl cursor-pointer ${
                view === "list" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`text-xl cursor-pointer ${
                view === "card" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            />
            <FaTh
              className={`text-xl cursor-pointer ${
                view === "grid" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            />
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments..."
            />
          </div>
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No records found.</p>
          ) : (
            <div
              className={
                view === "grid"
? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : view === "card"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-3"
              }
            >
              {filtered.map((t) => (
                <div
                  key={t._id}
                  onClick={() => navigate(`/single-treatment/${t._id}`)}
                  className={`relative cursor-pointer bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-all duration-300 ${
                    view === "list"
                      ? "flex flex-wrap items-center gap-2 text-sm text-gray-700"
                      : "flex flex-col items-start"
                  }`}
                >
                  {view === "list" ? (
                    <>
                      <span className="text-green-600 font-medium truncate max-w-full">
                        <FaStethoscope className="inline mr-1" />
                        {t.treatment_name}
                      </span>
                      <span>|</span>
                      <span className="truncate max-w-full">
                        <FaUserInjured className="inline mr-1" />
                        {t.patient_id?.patient_name || t.patient_id?.child_name}
                      </span>
                      <span>|</span>
                       <span className="truncate max-w-full">
    <FaUserMd className="inline mr-1" />
    {t.doctor_id?.doctor_name}
  </span>
  <span>|</span>
  <span className="truncate max-w-full">
    <FaHospital className="inline mr-1" />
    {t.hospital_id?.hospital_name}
  </span>
  <span>|</span>
                      <span className="truncate max-w-full">
                        <FaNotesMedical className="inline mr-1" />
                        {t.description}
                      </span>
                      <span>|</span>
                      <span>
                        <FaMoneyBillWave className="inline mr-1" />₹{t.cost}
                      </span>
                      <span>|</span>
                      <span>{t.treatment_date}</span>
                    </>
                  ) : (
                    <>
  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2 break-words w-full leading-snug">
    <FaStethoscope className="text-green-500 text-lg" />
    {t.treatment_name}
  </h3>

  <p className="text-sm text-gray-600 flex items-center gap-2 mb-2 w-full">
    <FaUserInjured className="text-gray-500" />
    {t.patient_id?.patient_name ||
      t.patient_id?.child_name ||
      "Patient"}
  </p>

  <p className="text-sm text-gray-600 flex items-center gap-2 mb-2 w-full">
  <FaUserMd className="text-gray-500" />
  {t.doctor_id?.doctor_name || "Doctor"}
</p>

<p className="text-sm text-gray-600 flex items-center gap-2 mb-2 w-full">
  <FaHospital className="text-gray-500" />
  {t.hospital_id?.hospital_name || "Hospital"}
</p>

  <p className="text-sm text-gray-600 flex items-start gap-2 mb-3 w-full leading-relaxed">
    <FaNotesMedical className="text-gray-500 mt-1" />
    {t.description?.split(" ").slice(0, 7).join(" ")}...
  </p>

  <div className="flex justify-between items-center w-full mt-auto">
    <p className="text-sm text-gray-700 flex items-center gap-2">
      <FaMoneyBillWave className="text-gray-500" />
      ₹{t.cost}
    </p>

    <p className="text-xs text-gray-400">
      {new Date(t.treatment_date).toLocaleDateString()}
    </p>
  </div>
</>
                  )}

                  <button
                    onClick={(e) => handleDeleteTreatment(t._id, e)}
className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full shadow hover:bg-red-600 transition"                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTreatments;
