import { useState, useRef } from "react";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const passwordRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    if (e.target.name === "password" && passwordRef.current) {
      passwordRef.current.setCustomValidity("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Missing credentials. Please fill in all fields.");
      toast.error("⚠️ Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      if (passwordRef.current) {
        passwordRef.current.setCustomValidity("Missing credentials. Please fill in all fields.");
        passwordRef.current.reportValidity();
      }
      return;
    }
    setLoading(true);
    try {
      const response = await login(form);
      if (response.message) {
        const message = response.message.toLowerCase();
        if (message.includes("success")) {
          toast.success("✅ Login Successful!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/landing");
          }, 2000);
        } else {
          // Handle different error cases
          let errorMessage = "Login failed";
          if (message.includes("invalid email") || message.includes("user not registered") || message.includes("email dont exist")) {
            errorMessage = "❌ User is not registered! Please sign up first.";
            toast.error(errorMessage, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              navigate("/register");
            }, 3000);
          } else if (message.includes("password didn't match") || message.includes("invalid credentials")) {
            errorMessage = "❌ Invalid password! Please try again.";
            toast.error(errorMessage, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            toast.error(`❌ ${response.message}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
          setError(errorMessage);
          if (passwordRef.current) {
            passwordRef.current.setCustomValidity(errorMessage);
            passwordRef.current.reportValidity();
          }
        }
      }
    } catch {
      const errorMessage = "Login failed. Please try again.";
      toast.error(`❌ ${errorMessage}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-14 m-4">
        <h1 className="text-center font-bold text-4xl mb-3">Log in to your account</h1>
        <div className="text-center mb-8 text-gray-600 text-lg">
          Or <Link to="/register" className="text-blue-600 font-medium hover:underline cursor-pointer">create an account</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="font-medium mb-1 block text-lg">Email address</label>
            <input name="email" type="email" onChange={handleChange} placeholder="Enter your email address" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
          </div>
          <div>
            <label className="font-medium mb-1 block text-lg">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                placeholder="Enter your password"
                ref={passwordRef}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-lg ${error ? 'border-red-400' : ''}`}
                aria-invalid={!!error}
                aria-describedby={error ? "password-error-tooltip" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-base">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="rounded border-gray-300" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</Link>
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold text-xl mt-2 hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
} 