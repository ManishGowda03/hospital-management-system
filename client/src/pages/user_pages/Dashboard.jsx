import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import {
  FaTh,
  FaThLarge,
  FaThList,
  FaClipboardList,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";

import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords.jsx";
import globalBackendRoute from "../../config/Config";

const Dashboard = () => {
  const navigate = useNavigate();

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Decode User
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch User Appointments
  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/view-all-appointments`)
      .then((res) => {
        const userAppointments = res.data.filter(
          (a) => a.email === user?.email
        );

        setAppointments(userAppointments);
      })
      .catch((err) =>
        console.error("Error fetching appointments:", err.message)
      );
  }, [user]);

  // Dashboard Cards
  const dashboardCards = [
    {
      title: "Book Appointment",
      value: "",
      icon: (
        <FaUserPlus className="text-yellow-500 text-2xl" />
      ),
      link: "/book-appointment",
      bgColor: "bg-yellow-100 border border-yellow-300",
    },

    {
      title: "My Appointments",
      value: appointments.length,
      icon: (
        <FaClipboardList className="text-indigo-600 text-2xl" />
      ),
      link: "/all-user-appointments",
      bgColor: "bg-indigo-100 border border-indigo-300",
    },

    {
      title: "My Profile",
      value: "",
      icon: (
        <FaUser className="text-blue-600 text-2xl" />
      ),
      link: `/profile/${user?.id}`,
      bgColor: "bg-blue-100 border border-blue-300",
    },
  ];

  // Search Filter
  const filteredCards =
    search.trim() === ""
      ? dashboardCards
      : dashboardCards.filter((card) => {
          const text = `${card.title}`.toLowerCase();

          const queryWords = search
            .toLowerCase()
            .split(/\s+/)
            .filter((word) => !stopwords.includes(word));

          return queryWords.some((word) =>
            text.includes(word)
          );
        });

  return (
    <div className="fullWidth py-6">
      <div className="containerWidth">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap mb-6 gap-4">
          <h1 className="headingText">
            Welcome, {user?.name || "User"}
          </h1>

          <div className="flex items-center flex-wrap gap-3">
            <FaThList
              className={`text-xl cursor-pointer ${
                view === "list"
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            />

            <FaThLarge
              className={`text-xl cursor-pointer ${
                view === "card"
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            />

            <FaTh
              className={`text-xl cursor-pointer ${
                view === "grid"
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            />

            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dashboard..."
            />
          </div>
        </div>

        {/* Cards */}
        <div
          className={`${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }`}
        >
          {filteredCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.link)}
              className={`${card.bgColor} rounded-xl p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card.title}
                  </h3>

                  {card.value !== "" && (
                    <p className="text-2xl font-bold mt-2 text-gray-900">
                      {card.value}
                    </p>
                  )}
                </div>

                <div>{card.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;