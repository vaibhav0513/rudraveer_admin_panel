import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationProvider";

export default function Login() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { triggerNotification } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${baseURL}/admin/login`, {
        email,
        password,
      });

      const { token, admin } = res.data;
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(admin));
      triggerNotification("Login successful!", "success");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      triggerNotification(message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-100 to-orange-200">
      {/* Left image section */}
      <div className="w-full md:w-[70%] flex flex-col justify-between p-8 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-tr-3xl shadow-inner">
        <div className="w-full text-left">
          <h1 className="text-3xl font-extrabold text-[#FF5E3A] tracking-wide drop-shadow-sm">
            RudraVeer <span className="text-gray-600">Pratistan</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Empowering Through Action
          </p>
        </div>
        <div className="flex-grow flex items-center justify-center animate-fade-in">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <img
              src="/logo.png"
              alt="Register Illustration"
              className="w-[85%] max-h-[70vh] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Right form section */}
      <div className="w-full md:w-[30%] flex items-center justify-center px-6 py-10 bg-white shadow-2xl rounded-t-3xl md:rounded-none">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-center text-gray-600 tracking-wide mb-6">
            Admin Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#FF5E3A]" />
                Remember me
              </label>
              <button type="button" className="text-[#FF5E3A] hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5E3A] hover:bg-[#e14c28] text-white py-2 rounded-lg font-medium shadow-md transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don’t have an account?
              <Link
                to="/register"
                className="text-[#FF5E3A] hover:underline font-semibold ml-1"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
