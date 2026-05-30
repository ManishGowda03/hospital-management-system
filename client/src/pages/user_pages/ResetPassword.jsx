import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
  if (!email) {
    navigate("/forgot-password");
  }
}, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
        setLoading(true);

      await axios.post(
        `${globalBackendRoute}/api/reset-password`,
        {
          email,
          newPassword,
        }
      );
      navigate("/login");
    } catch (error) {
  setError(
    error.response?.data?.message ||
      "Failed to reset password."
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div className="compactWidth py-12">
      <div className="text-center">
        <FaLock className="iconPrimary" />
        <h2 className="headingTextMobile lg:headingText mt-4">
          Reset Password
        </h2>
      </div>

      <div className="mt-10">
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label
              htmlFor="new-password"
              className="formLabel flex items-center"
            >
              <FaLock className="text-blue-500 mr-2" /> New Password
            </label>
            <input
              id="new-password"
              name="newPassword"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              className="formInput mt-2"
              placeholder="Enter your new password"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="formLabel flex items-center"
            >
              <FaLock className="text-purple-500 mr-2" /> Confirm New Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="formInput mt-2"
              placeholder="Re-enter your password"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="primaryBtn w-auto px-6"
              disabled={loading}
>
  {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>

          {error && <p className="errorText">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
