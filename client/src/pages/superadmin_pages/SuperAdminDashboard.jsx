import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaCog,
  FaPlus,
  FaBoxOpen,
  FaStore,
  FaBuilding,
  FaUserPlus,
} from "react-icons/fa";

import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import LeftSidebarNav from "../../components/common_components/LeftSidebarNav";
import DashboardCard from "../../components/common_components/DashboardCard";
import DashboardLayout from "../../components/common_components/DashboardLayout";
import iconMap from "../../components/common_components/iconMap.jsx";
import stopwords from "../../components/common_components/stopwords.jsx";

const SuperadminDashboard = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return navigate("/login");
    }

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const roleRes = await axios.get(
          `${globalBackendRoute}/api/getUserCountsByRole`
        );

        setCounts(roleRes.data);
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };

    fetchCounts();
  }, []);

  const allCards = [
    {
      title: "Total Users",
      value: counts.totalUsers || 0,
      link: "/all-users",
      icon: iconMap.totalUsers,
    },

    {
      title: "All Hospitals",
      value: "Manage Hospitals",
      link: "/all-hospitals",
      icon: iconMap.hospital,
    },

    {
      title: "All Doctors",
      value: "Manage Doctors",
      link: "/all-doctors",
      icon: iconMap.doctor,
    },

    {
      title: "All Patients",
      value: "Manage Patients",
      link: "/all-patients",
      icon: iconMap.patient,
    },

    {
      title: "All Treatments",
      value: "Manage Treatments",
      link: "/all-treatments",
      icon: iconMap.treatment,
    },

    {
      title: "All Blood Records",
      value: "Manage Blood Records",
      link: "/all-bloods",
      icon: iconMap.blood,
    },

    {
      title: "All Pediatrics",
      value: "Manage Pediatrics",
      link: "/all-pediatrics",
      icon: iconMap.pediatric,
    },

    {
      title: "All Mortuary Records",
      value: "Manage Mortuary",
      link: "/all-mortuary",
      icon: iconMap.mortuary,
    },

    {
      title: "All Appointments",
      value: "Manage Appointments",
      link: "/superadmin-all-appointments",
      icon: iconMap.appointment,
    },

    {
      title: "All Blogs",
      value: "Manage Blogs",
      link: "/all-blogs",
      icon: iconMap.blog,
    },

    {
      title: "All Categories",
      value: "Manage Categories",
      link: "/all-categories",
      icon: iconMap.category,
    },

    {
      title: "All Vendors",
      value: "Manage Vendors",
      link: "/all-vendors",
      icon: iconMap.vendor,
    },

    {
      title: "All Outlets",
      value: "Manage Outlets",
      link: "/all-outlets",
      icon: iconMap.outlet,
    },
  ];

  const filteredCards =
    search.trim() === ""
      ? allCards
      : allCards.filter((card) => {
          const text = `${card.title} ${card.value}`.toLowerCase();

          const queryWords = search
            .toLowerCase()
            .split(/\s+/)
            .filter((word) => !stopwords.includes(word));

          return queryWords.some(
            (word) =>
              text.includes(word) || text.includes(word.replace(/s$/, ""))
          );
        });

  return (
<div className="w-full py-4 px-4 md:px-6">
  <div className="w-full">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap mb-6 gap-4">
          <div>
            <h1 className="headingText">Superadmin Dashboard</h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage hospitals, doctors, patients and appointments
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dashboard..."
            />
          </div>
        </div>

        <DashboardLayout
          left={
            <LeftSidebarNav
              navigate={navigate}
              items={[
                {
                  label: "Account Settings",
                  icon: <FaCog className="text-indigo-600" />,
                  path: `/profile/${userId}`,
                },

                {
                  label: "Add Hospital",
                  icon: <FaUserPlus className="text-yellow-500" />,
                  path: "/add-hospital",
                },

                {
                  label: "Add Doctor",
                  icon: <FaUserPlus className="text-yellow-700" />,
                  path: "/add-doctor",
                },

                {
                  label: "Add Patient",
                  icon: <FaUserPlus className="text-yellow-900" />,
                  path: "/add-patient",
                },

                {
                  label: "Add Treatment",
                  icon: <FaUserPlus className="text-yellow-300" />,
                  path: "/add-treatment",
                },

                {
                  label: "Add Pediatric",
                  icon: <FaUserPlus className="text-red-300" />,
                  path: "/add-pediatric",
                },

                {
                  label: "Add Blood",
                  icon: <FaBoxOpen className="text-green-800" />,
                  path: "/add-blood",
                },

                {
                  label: "Add Discharge Details",
                  icon: <FaUserPlus className="text-red-700" />,
                  path: "/add-discharge",
                },

                {
                  label: "View All Appointments",
                  icon: <FaCog className="text-indigo-300" />,
                  path: "/superadmin-all-appointments",
                },

                {
                  label: "Add Mortuary Details",
                  icon: <FaBoxOpen className="text-green-800" />,
                  path: "/add-mortuary",
                },

                {
                  label: "Add Category",
                  icon: <FaPlus className="text-orange-500" />,
                  path: "/add-category",
                },

                {
                  label: "Add Product",
                  icon: <FaBoxOpen className="text-green-600" />,
                  path: "/add-product",
                },

                {
                  label: "Add Vendor",
                  icon: <FaStore className="text-purple-600" />,
                  path: "/add-vendor",
                },

                {
                  label: "Add Outlet",
                  icon: <FaBuilding className="text-orange-500" />,
                  path: "/add-outlet",
                },

                {
                  label: "Add Blog",
                  icon: <FaUserPlus className="text-indigo-800" />,
                  path: "/add-blog",
                },
              ]}
            />
          }
          right={
            <div
              className={`${
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  : view === "card"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
                  : "space-y-4"
              }`}
            >
              {filteredCards.map((card, index) => (
                <DashboardCard
                  key={index}
                  card={card}
                  view={view}
                  onClick={() => navigate(card.link)}
                />
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SuperadminDashboard;

