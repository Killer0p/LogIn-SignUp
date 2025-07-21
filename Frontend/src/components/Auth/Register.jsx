import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Example register function, replace with your actual API call
async function register(form) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (form.email === "already@taken.com") {
        resolve({ message: "Email already taken." });
      } else {
        resolve({ message: "Registration successful!" });
      }
    }, 1000);
  });
}

export default function Register() {
  const [form, setForm] = useState({ userName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const confirmPasswordRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
    setSuccessMessage("");

    // Password match validation
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
    setErrorMessage("");
    setSuccessMessage("");
    if (!form.userName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await register(form);
    if (res.message) {
      if (res.message.toLowerCase().includes("success")) {
        setSuccessMessage(res.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setErrorMessage(res.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 m-4">
        <h1 className="text-center font-bold text-3xl mb-2">Create a new account</h1>
        <div className="text-center mb-6 text-gray-600 text-base">
          Or <Link to="/login" className="text-blue-600 font-medium hover:underline cursor-pointer">Login to your account</Link>
        </div>
        {errorMessage && <div className="mb-4 text-center text-red-600 font-medium">{errorMessage}</div>}
        {successMessage && <div className="mb-4 text-center text-green-600 font-medium">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-medium mb-1 block">Username</label>
            <input
              name="userName"
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">Email address</label>
            <input
              name="email"
              type="email"
              required
              pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.com$"
              onChange={handleChange}
              placeholder="user@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">Phone</label>
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                ref={confirmPasswordRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg mt-2 hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
} 