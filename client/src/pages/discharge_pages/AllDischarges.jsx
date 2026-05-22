import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaUser,
  FaHospital,
  FaUserMd,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllDischarges = () => {
  const [discharges, setDischarges] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDischarges = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-all-discharges`
        );
        setDischarges(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        toast.error("Failed to fetch discharges.");
      }
    };
    fetchDischarges();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this discharge?"))
      return;

    try {
      await axios.delete(`${globalBackendRoute}/api/delete-discharge/${id}`);
      setDischarges((prev) => prev.filter((d) => d._id !== id));
      toast.success("Discharge deleted.");
    } catch (err) {
      toast.error("Failed to delete discharge.");
    }
  };

  const filtered = searchQuery.trim()
    ? discharges.filter((d) => {
        const fullText =
          `${d.patient_name} ${d.doctor_name} ${d.reason_for_discharge}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : discharges;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="headingText">
            All Discharges{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filtered.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
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
              placeholder="Search discharges..."
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
                  : "space-y-4"
              }
            >
              {filtered.map((d) => (
                <div
                  key={d._id}
                  onClick={() => navigate(`/single-discharge/${d._id}`)}
                  className={`relative cursor-pointer bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-all duration-300 ${
                    view === "list"
      ? "flex flex-wrap items-center gap-2 text-sm text-gray-700"
      : "flex flex-col items-start"
  }`}
                >
                  {view === "list" ? (
    <>
      <span className="text-blue-600 font-medium truncate max-w-full">
        <FaUser className="inline mr-1" />
        {d.patient_name}
      </span>

      <span>|</span>

      <span className="truncate max-w-full">
        <FaUserMd className="inline mr-1" />
        {d.doctor_name}
      </span>

      <span>|</span>

      <span className="truncate max-w-full">
        <FaHospital className="inline mr-1" />
        {d.hospital_id?.hospital_name}
      </span>

      <span>|</span>

      <span className="truncate max-w-full">
        <FaClipboardList className="inline mr-1" />
        {d.reason_for_discharge}
      </span>

      <span>|</span>

      <span>
        <FaCalendarAlt className="inline mr-1" />
        {new Date(d.discharge_date).toLocaleDateString()}
      </span>
    </>
  ) : (
    <>
                   <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2 break-words w-full leading-snug">
        <FaUser className="text-blue-500 text-lg" />
        {d.patient_name}
      </h3>
                   <p className="text-sm text-gray-600 flex items-center gap-2 mb-2 w-full">
        <FaUserMd className="text-blue-500" />
        {d.doctor_name}
      </p>

      <p className="text-sm text-gray-600 flex items-center gap-2 mb-2 w-full">
        <FaHospital className="text-green-500" />
        {d.hospital_id?.hospital_name}
      </p>

      <p className="text-sm text-gray-600 flex items-start gap-2 mb-3 w-full leading-relaxed">
        <FaClipboardList className="text-indigo-500 mt-1" />
        {d.reason_for_discharge
          ?.split(" ")
          .slice(0, 7)
          .join(" ")}
        ...
      </p>

      <div className="flex justify-between items-center w-full mt-auto">
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <FaCalendarAlt />
          {new Date(d.discharge_date).toLocaleDateString()}
        </p>
      </div>
    </>
  )}

  <button
    onClick={(e) => handleDelete(d._id, e)}
    className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full shadow hover:bg-red-600 transition"
  >
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

export default AllDischarges;
