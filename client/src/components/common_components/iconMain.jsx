import {
  FaUsers,
  FaUserShield,
  FaUserPlus,
  FaUserCheck,
  FaLayerGroup,
  FaBoxes,
} from "react-icons/fa";

const iconMap = {
  admin: <FaUserCheck className="text-indigo-600 text-3xl" />,
  superadmin: <FaUserShield className="text-red-500 text-3xl" />,
  user: <FaUserPlus className="text-green-600 text-3xl" />,
  totalUsers: <FaUsers className="text-blue-600 text-3xl" />,
  category: <FaLayerGroup className="text-yellow-600 text-3xl" />,
  product: <FaBoxes className="text-green-600 text-3xl" />,
};

export default iconMap;
