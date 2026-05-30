import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



const handleSubmit = async () => {
  const trimmedEmail = email.trim();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    return setError(
      "Please enter a valid email address."
    );
  }

  try {
    setLoading(true);

    await axios.post(
      `${globalBackendRoute}/api/check-user-email`,
      {
        email: trimmedEmail,
      }
    );

    navigate("/reset-password", {
      state: {
        email: trimmedEmail,
      },
    });
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Email not found"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="compactWidth py-12">
      <div className="text-center">
        <FaKey
          className="iconPrimary mx-auto"
          size={48}
        />

        <h2 className="headingTextMobile lg:headingText mt-4">
          Forgot Password
        </h2>
      </div>

      <form className="mt-10 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="formLabel flex items-center gap-2"
          >
            <FaEnvelope className="text-blue-500" />
            Email Address
          </label>

          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="formInput mt-2"
            placeholder="Enter your registered email"
          />
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSubmit}
              disabled={loading}
            className="primaryBtn w-auto px-6"
          >
  {loading ? "Checking..." : "Continue"}
            </button>
        </div>

        {error && (
          <p className="errorText text-center">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;