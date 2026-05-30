const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// ----------------------------
// MULTER STORAGE CONFIG
// ----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const role = req.body.role || "user";
    const dir = path.join("uploads", role);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ----------------------------
// CONTROLLERS
// ----------------------------

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET || "hms_secret_key_2025",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      companyName,
      companyAddress,
      companyEmail,
      gstNumber,
      promotionalConsent,
    } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = { ...user.address, ...JSON.parse(address) };
    if (companyName) user.companyName = companyName;
    if (companyAddress) user.companyAddress = companyAddress;
    if (companyEmail) user.companyEmail = companyEmail;
    if (gstNumber) user.gstNumber = gstNumber;
    if (promotionalConsent !== undefined)
      user.promotionalConsent = promotionalConsent;

    if (req.file) {
      const newAvatarPath = path
        .join("uploads", user.role, req.file.filename)
        .replace(/\\/g, "/");

      if (user.avatar) {
        const oldAvatarPath = path.join(__dirname, "..", user.avatar);
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }

      user.avatar = newAvatarPath;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.avatar) {
      const imagePath = path.join(__dirname, "..", user.avatar);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const getUserCounts = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: "admin" });
    const superadmins = await User.countDocuments({ role: "superadmin" });
    const customers = await User.countDocuments({ role: "user" });

    res.status(200).json({ totalUsers, admins, superadmins, customers });
  } catch (err) {
    console.error("Count Error:", err.message);
    res.status(500).json({ message: "Failed to fetch counts" });
  }
};

const getUserCountsByRole = async (req, res) => {
  try {
    const counts = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    const totalUsers = await User.countDocuments();
    const countMap = { totalUsers };

    counts.forEach((item) => {
      countMap[item._id] = item.count;
    });

    res.status(200).json(countMap);
  } catch (err) {
    console.error("Dynamic count error:", err.message);
    res.status(500).json({ message: "Failed to fetch dynamic user counts" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Fetch All Users Error:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(
      "Password Reset Error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const updateUserRoleAndPrivileges = async (req, res) => {
  try {
    const { role, privileges } = req.body;
    const updateData = {};

    if (role) updateData.role = role;
    if (privileges) updateData.privileges = privileges;

    const updated = await User.findByIdAndUpdate(req.params.id, {
      $set: updateData,
    });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User role and privileges updated", updated });
  } catch (error) {
    console.error("Error updating user role and privileges:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const checkUserEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: email.trim(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User found",
    });
  } catch (error) {
    console.error("Check Email Error:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
  getUserCounts,
  upload,
  checkUserEmail,
  getAllUsers,
  updateUserRoleAndPrivileges,
  resetPassword,
  getUserCountsByRole,
};
