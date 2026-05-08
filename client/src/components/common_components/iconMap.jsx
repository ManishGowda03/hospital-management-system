
import {
  FaUsers,
  FaUserShield,
  FaUserPlus,
  FaUserCheck,
  FaCog,
  FaBoxOpen,
  FaStore,
  FaBuilding,
  FaLayerGroup,
  FaBoxes,
  FaHospital,
  FaUserMd,
  FaProcedures,
  FaHeartbeat,
  FaTint,
  FaCalendarCheck,
  FaNewspaper,
  FaClinicMedical,
  FaChild, 
FaArchive,
} from "react-icons/fa";

const iconMap = {
  admin: <FaUserCheck className="text-indigo-600 text-xl" />,
  superadmin: <FaUserShield className="text-red-500 text-xl" />,
  user: <FaUserPlus className="text-green-600 text-xl" />,
  developer: <FaCog className="text-purple-600 text-xl" />,
  vendor: <FaStore className="text-orange-600 text-xl" />,
  outlet: <FaBuilding className="text-blue-500 text-xl" />,

  totalUsers: <FaUsers className="text-blue-600 text-xl" />,
  category: <FaLayerGroup className="text-yellow-600 text-xl" />,
  product: <FaBoxes className="text-green-600 text-xl" />,

  hospital: <FaHospital className="text-red-500 text-xl" />,
  doctor: <FaUserMd className="text-cyan-600 text-xl" />,
  patient: <FaProcedures className="text-pink-600 text-xl" />,
  treatment: <FaHeartbeat className="text-emerald-600 text-xl" />,
  blood: <FaTint className="text-red-600 text-xl" />,
pediatric: <FaChild className="text-pink-500 text-xl" />,
mortuary: <FaArchive className="text-gray-700 text-xl" />,
  appointment: <FaCalendarCheck className="text-indigo-600 text-xl" />,
blog: <FaNewspaper className="text-purple-600 text-xl" />,
};

export default iconMap;

