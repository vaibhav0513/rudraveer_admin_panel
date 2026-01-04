import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaSave } from "react-icons/fa";

const Settings = () => {
  const [name, setName] = useState("Vaibhav");
  const [email, setEmail] = useState("vaibhav@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    // Logic to save settings (e.g., API call)
    alert("Settings saved!");
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Account Settings
        </h2>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaUser className="text-gray-400" />
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaEnvelope className="text-gray-400" />
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaLock className="text-gray-400" />
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#FF5E3A] hover:bg-[#e14f2e] text-white py-2 rounded-lg font-medium shadow transition flex items-center justify-center gap-2"
        >
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
