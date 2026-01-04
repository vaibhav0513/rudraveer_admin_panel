import { FaBell, FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";

export default function Header({ onHamburgerClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const adminData = JSON.parse(localStorage.getItem("adminData"));
  const avatarLetter = adminData?.fullName?.[0]?.toUpperCase() || "A";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/login");
  };

  return (
    // <header className="bg-[#1B1E1C] text-white h-14 flex items-center justify-between px-6 shadow border-b border-[#2A2D2B]">
    //   {/* Logo */}
    //   <div className="text-lg font-bold text-[#FF5E3A]">Admin Panel</div>

    //   {/* Right Section */}
    //   <div className="relative flex items-center gap-6" ref={dropdownRef}>
    //     {/* Bell Icon */}
    //     <button className="relative hover:text-[#FF5E3A] transition">
    //       <FaBell className="text-lg" />
    //       <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5E3A] rounded-full animate-ping"></span>
    //       <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5E3A] rounded-full"></span>
    //     </button>

    //     {/* Avatar & Dropdown */}
    //     <div
    //       onClick={() => setShowDropdown(!showDropdown)}
    //       className="flex items-center gap-2 cursor-pointer group"
    //     >
    //       <div className="w-8 h-8 rounded-full bg-[#A3F7BF] flex items-center justify-center text-black font-bold shadow-md text-sm">
    //         {avatarLetter}
    //       </div>
    //       <div className="text-sm font-medium">
    //         {adminData?.fullName || "Admin"}
    //       </div>
    //       <FaChevronDown
    //         className={`transition-transform duration-200 text-sm ${
    //           showDropdown ? "rotate-180" : ""
    //         }`}
    //       />
    //     </div>

    //     {/* Dropdown Panel */}
    //     {showDropdown && (
    //       <div className="absolute top-14 right-0 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
    //         {/* Arrow Tail */}
    //         <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>

    //         {/* Header */}
    //         <div className="px-4 py-3 bg-gray-50">
    //           <p className="text-sm font-medium text-gray-800">
    //             {adminData?.fullName}
    //           </p>
    //           <p className="text-xs text-gray-500 capitalize">{adminData?.role}</p>
    //         </div>

    //         {/* Menu */}
    //         <div className="divide-y text-sm">
    //           <button
    //             onClick={() => {
    //               setShowModal(true);
    //               setShowDropdown(false);
    //             }}
    //             className="flex items-center w-full gap-3 px-4 py-3 hover:bg-gray-100 transition text-gray-700"
    //           >
    //             <FaSignOutAlt className="text-red-500" />
    //             Logout
    //           </button>
    //         </div>
    //       </div>
    //     )}
    //   </div>

    //   <LogoutModal
    //     isOpen={showModal}
    //     onClose={() => setShowModal(false)}
    //     onConfirm={handleLogout}
    //   />
    // </header>
    <header className="bg-[#1B1E1C] text-white h-14 flex items-center justify-between px-6 shadow border-b border-[#2A2D2B]">
      {/* Logo */}
      <button
        className="md:hidden text-white text-xl"
        onClick={onHamburgerClick}
      >
        ☰
      </button>
      {/* <div className="text-lg font-bold text-[#FF5E3A]">Admin Panel</div> */}
      <div className="text-lg font-bold text-[#FF5E3A] flex-shrink-0">
        Admin Panel
      </div>

      {/* Hamburger only on mobile */}

      {/* Right Section */}
      <div className="relative flex items-center gap-6" ref={dropdownRef}>
        {/* Bell Icon */}
        <button className="relative hover:text-[#FF5E3A] transition hidden md:inline-block">
          <FaBell className="text-lg" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5E3A] rounded-full animate-ping"></span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#FF5E3A] rounded-full"></span>
        </button>

        {/* Avatar & Dropdown */}
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#A3F7BF] flex items-center justify-center text-black font-bold shadow-md text-sm">
            {avatarLetter}
          </div>
          <div className="text-sm font-medium hidden sm:inline-block">
            {adminData?.fullName || "Admin"}
          </div>
          <FaChevronDown
            className={`transition-transform duration-200 text-sm ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-14 right-0 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in">
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
            <div className="px-4 py-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-800">
                {adminData?.fullName}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {adminData?.role}
              </p>
            </div>
            <div className="divide-y text-sm">
              <button
                onClick={() => {
                  setShowModal(true);
                  setShowDropdown(false);
                }}
                className="flex items-center w-full gap-3 px-4 py-3 hover:bg-gray-100 transition text-gray-700"
              >
                <FaSignOutAlt className="text-red-500" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LogoutModal */}
      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}
