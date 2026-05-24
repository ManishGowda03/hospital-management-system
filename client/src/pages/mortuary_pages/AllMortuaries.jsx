import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaUser,
  FaVenusMars,
  FaCross,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllMortuaries = () => {
  const [records, setRecords] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-all-mortuary`
        );
        setRecords(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching mortuary records:", error.message);
        toast.error("Failed to fetch mortuary records.");
      }
    };
    fetchRecords();
  }, []);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-mortuary/${id}`
      );
      if (res.status === 200) {
        setRecords((prev) => prev.filter((r) => r._id !== id));
        toast.success("Mortuary record deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete mortuary record.");
    }
  };

  const filtered = searchQuery.trim()
    ? records.filter((r) => {
        const fullText =
          `${r.deceased_name} ${r.gender} ${r.cause_of_death}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some(
          (word) =>
            fullText.includes(word) || fullText.includes(word.replace(/s$/, ""))
        );
      })
    : records;

  const handleNavigate = (id) => {
    navigate(`/single-mortuary/${id}`);
  };

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Mortuary Records{" "}
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
              placeholder="Search deceased..."
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
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
                  : view === "card"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filtered.map((r) => (
                <div
                  key={r._id}
                  onClick={() => handleNavigate(r._id)}
                  className={`relative cursor-pointer bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition-all duration-300 ${
  view === "list"
    ? "flex flex-wrap items-center gap-2 text-sm text-gray-700"
    : "flex flex-col items-start"
}`}
                >
                  <>
  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2 break-words w-full leading-snug">
    <FaUser className="text-blue-500 text-lg" />
    {r.deceased_name}
  </h3>

  <p className="text-sm text-gray-600 flex items-center gap-2 mb-2 w-full">
    <FaVenusMars className="text-pink-500" />
    {r.gender}, Age: {r.age}
  </p>

  <p className="text-sm text-gray-600 flex items-center gap-2 mb-2 w-full">
    <FaCross className="text-red-500" />
    {r.cause_of_death}
  </p>

  <p className="text-sm text-gray-600 flex items-center gap-2 mb-3 w-full">
    <FaPhone className="text-green-500" />
    {r.contact_number}
  </p>

  <div className="flex justify-between items-center w-full mt-auto">
    <p className="text-xs text-gray-400 flex items-center gap-1">
      <FaMapMarkerAlt />
      {new Date(r.date_of_death).toLocaleDateString()}
    </p>
  </div>
</>
                  <button
                    onClick={(e) => handleDelete(r._id, e)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
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

export default AllMortuaries;
