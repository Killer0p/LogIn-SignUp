const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7002/api";

async function parseResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { message: text };
  }
}

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return parseResponse(res);
};

export const login = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include",
  });
  return parseResponse(res);
};

export const forgotPassword = async (data) => {
  const res = await fetch(`${API_URL}/auth/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return parseResponse(res);
};

export const verifyOtp = async (data) => {
  const res = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return parseResponse(res);
};

export const resetPassword = async (data) => {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return parseResponse(res);
};

export const resendOtp = async (email) => {
  // Reuse forgotPassword endpoint to resend OTP
  const res = await fetch(`${API_URL}/auth/forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include",
  });
  return parseResponse(res);
}; 