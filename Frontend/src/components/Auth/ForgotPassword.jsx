import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    const res = await forgotPassword({ email });
    setLoading(false);
    if (res && typeof res === "object" && res.message) {
      setMessage(res.message);
      if (!res.message.toLowerCase().includes("fail")) {
        localStorage.setItem("resetEmail", email); // Store email for OTP verification
        navigate("/verify-otp");
      }
    } else if (typeof res === "string") {
      setMessage(res);
    } else {
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 m-4">
        <h1 className="text-center font-bold text-2xl mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-medium mb-1 block">Enter your registered email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg mt-2 hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
            {loading ? "Sending..." : "Send OTP"}
          </button>
          {message && <div className="text-green-600 text-center mt-2">{message}</div>}
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
} 