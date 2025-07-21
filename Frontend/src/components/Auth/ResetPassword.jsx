import React, { useState, useRef } from "react";
import { resetPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const confirmPasswordRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");

    // Password match validation for browser-native tooltip
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      const password = e.target.name === "password" ? e.target.value : form.password;
      const confirmPassword = e.target.name === "confirmPassword" ? e.target.value : form.confirmPassword;
      if (confirmPasswordRef.current) {
        if (password && confirmPassword && password !== confirmPassword) {
          confirmPasswordRef.current.setCustomValidity("Passwords do not match.");
        } else {
          confirmPasswordRef.current.setCustomValidity("");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await resetPassword({ password: form.password });
    setLoading(false);
    if (res && typeof res === "object" && res.message) {
      setMessage(res.message);
      toast.success(res.message);
      if (res.message.toLowerCase().includes("success")) {
        setTimeout(() => {
          navigate("/login");
        }, 1800);
      }
    } else if (typeof res === "string") {
      setError(res);
      toast.error(res);
    } else {
      setError("Failed to reset password. Please try again.");
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br  bg-white">
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 m-4">
        <h1 className="text-center font-bold text-2xl mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="font-medium mb-1 block">New Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                onChange={handleChange}
                placeholder="New Password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div>
            <label className="font-medium mb-1 block">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                ref={confirmPasswordRef}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500 focus:outline-none cursor-pointer"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {error && <div className="text-red-600 text-center mb-2">{error}</div>}
          {message && <div className="text-green-600 text-center mb-2">{message}</div>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg mt-2 hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
} 