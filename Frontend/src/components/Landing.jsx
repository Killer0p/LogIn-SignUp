
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear any auth state or cookies here
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Landing Page!</h1>
        <p className="text-lg text-gray-700 mb-6">You have successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 