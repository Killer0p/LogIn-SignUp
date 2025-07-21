import React, { useState, useRef } from "react";
import { verifyOtp, resendOtp } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const email = localStorage.getItem("resetEmail") || "your email";

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    setMessage("");
    setError("");
    // Move to next input if value entered
    if (value && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
    // Move to previous input on backspace
    if (!value && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    // Stricter validation: all fields filled and each is a digit
    if (otp.some(digit => digit === "" || !/^[0-9]$/.test(digit))) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    const res = await verifyOtp({ otp: otp.join("") });
    setLoading(false);
    if (res && typeof res === "object" && res.message) {
      setMessage(res.message);
      if (res.message.toLowerCase().includes("validated")) {
        setTimeout(() => {
          navigate("/reset-password");
        }, 1200);
      }
    } else if (typeof res === "string") {
      setMessage(res);
    } else {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    setMessage("");
    setError("");
    setResendDisabled(true);
    setResendTimer(30);
    try {
      const res = await resendOtp(email);
      if (res && res.message) {
        setMessage(res.message);
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
    // Start countdown timer
    let timer = 30;
    const interval = setInterval(() => {
      timer -= 1;
      setResendTimer(timer);
      if (timer <= 0) {
        clearInterval(interval);
        setResendDisabled(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-white">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-12 m-4 flex flex-col items-center">
        <div className="mb-6">
          <div className="mx-auto mb-2 w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-500">OTP</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Verify OTP</h2>
        <p className="text-gray-600 mb-6 text-center">Enter the 6-digit code sent to <span className="font-semibold">{email}</span></p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-4">
          <div className="flex gap-3 justify-center mb-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e, idx)}
                className="w-14 h-14 text-2xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
              />
            ))}
          </div>
          {error && <div className="text-red-600 text-center mb-2">{error}</div>}
          {message && <div className="text-green-600 text-center mb-2">{message}</div>}
          <div className="mb-2 text-gray-600 text-center">
            Didn't receive code? <button type="button" onClick={handleResend} className="text-blue-600 hover:underline cursor-pointer" disabled={resendDisabled}>
              {resendDisabled ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg mt-2 hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
} 