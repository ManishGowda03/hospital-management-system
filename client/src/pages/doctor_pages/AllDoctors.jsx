import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaUserMd,
  FaClipboardCheck,
  FaBriefcase,
  FaUserGraduate,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/view-all-doctors`
        );
        setDoctors(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
        toast.error("Failed to fetch doctors.");
      }
    };
    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorId, e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-doctor/${doctorId}`
      );
      if (res.status === 200) {
        setDoctors((prev) => prev.filter((d) => d._id !== doctorId));
        toast.success("Doctor deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete doctor.");
    }
  };

  const filteredDoctors = searchQuery.trim()
    ? doctors.filter((doctor) => {
        const fullText =
          `${doctor.doctor_name} ${doctor.specialization} ${doctor.qualifications}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : doctors;

  const handleNavigate = (id) => {
    navigate(`/single-doctor/${id}`);
  };

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Doctors{" "}
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredDoctors.length} of {totalCount}
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
              placeholder="Search doctors..."
            />
          </div>
        </div>

        {/* View Display */}
        <div className="mt-6">
          {filteredDoctors.length === 0 ? (
            <p className="text-center text-gray-500">No doctors found.</p>
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
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  onClick={() => handleNavigate(doctor._id)}
                  className="relative cursor-pointer bg-white shadow rounded-xl p-4 border hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                    <FaUserMd className="text-green-500 text-lg" /> {doctor.doctor_name}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-start gap-2 mb-1">
                    <FaClipboardCheck /> {doctor.specialization}
                  </p>
                  <p className="text-sm text-gray-600 flex items-start gap-2 mb-1">
                    <FaBriefcase /> {doctor.experience_years} yrs experience
                  </p>
                  <p className="text-sm text-gray-600 flex items-start gap-2 mb-1">
                    <FaUserGraduate /> {doctor.qualifications}
                  </p>
                  <button
                    onClick={(e) => handleDeleteDoctor(doctor._id, e)}
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

export default AllDoctors;
