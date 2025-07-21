import { useState, useRef } from "react";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
      if (passwordRef.current) passwordRef.current.setCustomValidity("Missing credentials. Please fill in all fields.");
      passwordRef.current && passwordRef.current.reportValidity();
      return;
    }
    setLoading(true);
    const res = await login(form);
    if (res.message) {
      if (res.message.toLowerCase().includes("success")) {
        setTimeout(() => {
          navigate("/landing");
        }, 1500);
      } else {
        // Friendly error messages for email and password
        let displayError = res.message;
        const msg = displayError.toLowerCase();
        if (msg.includes("invalid email") || msg.includes("user not registered")) {
          displayError = "Email is not registered";
        } else if (
          msg.includes("error occurred during login") ||
          msg.includes("password didn't match")
        ) {
          displayError = "Password didn't match";
        }
        setError(displayError);
        if (passwordRef.current) {
          passwordRef.current.setCustomValidity(displayError);
          passwordRef.current.reportValidity();
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* <ToastContainer position="top-center" autoClose={2500} /> */}
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
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-gray-500 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
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