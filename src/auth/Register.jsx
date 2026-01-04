import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-100 to-orange-200">
      {/* Left Image Section */}
      <div className="w-full md:w-[70%] flex flex-col justify-between p-8 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 rounded-tr-3xl shadow-inner">
        {/* Top-left company name */}
        <div className="w-full text-left">
          <h1 className="text-3xl font-extrabold text-[#FF5E3A] tracking-wide drop-shadow-sm">
            RudraVeer <span className="text-gray-600">Pratistan</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Empowering Through Action
          </p>
        </div>

        {/* Centered image */}
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

      {/* Right Form Section */}
      <div className="w-full md:w-[30%] flex items-center justify-center px-6 py-10 bg-white shadow-2xl rounded-t-3xl md:rounded-none">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-center text-gray-600 tracking-wide mb-6">
            Admin Registration
          </h2>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#FF5E3A] hover:bg-[#e14c28] text-white py-2 rounded-lg font-medium shadow-md transition"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-xs text-center text-gray-600 mt-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#FF5E3A] hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
