import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaUserCircle,
  FaRegNewspaper,
  FaCalendarCheck,
  FaDonate,
} from "react-icons/fa";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  { label: "Blogs", path: "/blogs", icon: <FaRegNewspaper /> },
  { label: "Problems", path: "/problems", icon: <FaTasks /> },
  { label: "Volunteers", path: "/volunteers", icon: <FaUsers /> },
  { label: "Donation", path: "/donation", icon: <FaDonate /> },
  { label: "Events", path: "/events", icon: <FaCalendarCheck /> },
  {
    label: "Pending Volunteers",
    path: "/pending-volunteer",
    icon: <FaFileAlt />,
  },
];

// export default function Sidebar() {
//   const location = useLocation();

//   return (
//     <div className="bg-[#1C1F1D] text-[#F9F9F9] w-64 min-h-screen flex flex-col px-5 py-6 shadow-xl">
//       {/* Branding */}
//       <div className="mb-6 text-center">
//         <h1 className="text-2xl font-bold text-[#FF5E3A]">RudraVeer</h1>
//         <p className="text-xs text-[#9CA3AF] mt-1 tracking-wider">
//           Admin Control
//         </p>
//       </div>

//       {/* User Profile */}
//       <Link
//         to="/settings"
//         className="flex items-center gap-3 p-3 mb-6 rounded-lg bg-[#262926] hover:bg-[#2F322F] transition duration-200 shadow"
//       >
//         <FaUserCircle className="text-3xl text-[#A3F7BF]" />
//         <div>
//           <p className="text-sm font-semibold">Admin</p>
//           <p className="text-xs text-[#9CA3AF]">Settings</p>
//         </div>
//       </Link>

//       {/* Navigation */}
//       <nav className="flex flex-col gap-2">
//         {navItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-150 text-sm font-medium ${
//                 isActive
//                   ? "bg-[#FF5E3A] text-black shadow-md"
//                   : "hover:bg-[#2A2D2B] text-[#F9F9F9]"
//               }`}
//             >
//               <span className="text-lg">{item.icon}</span>
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="mt-auto text-xs text-center text-[#6B7280] pt-6 border-t border-[#333]">
//         &copy; 2025 RudraVeer.NGO
//       </div>
//     </div>
//   );
// }

export default function Sidebar({ onNavigate }) {
  const location = useLocation();

  return (
    <div className="bg-[#1C1F1D] text-[#F9F9F9] w-64 min-h-screen flex flex-col px-5 py-6 shadow-xl">
      {/* Branding */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-[#FF5E3A]">RudraVeer</h1>
        <p className="text-xs text-[#9CA3AF] mt-1 tracking-wider">
          Admin Control
        </p>
      </div>

      {/* User Profile */}
      <Link
        to="/settings"
        onClick={onNavigate}
        className="flex items-center gap-3 p-3 mb-6 rounded-lg bg-[#262926] hover:bg-[#2F322F] transition duration-200 shadow"
      >
        <FaUserCircle className="text-3xl text-[#A3F7BF]" />
        <div>
          <p className="text-sm font-semibold">Admin</p>
          <p className="text-xs text-[#9CA3AF]">Settings</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-150 text-sm font-medium ${
                isActive
                  ? "bg-[#FF5E3A] text-black shadow-md"
                  : "hover:bg-[#2A2D2B] text-[#F9F9F9]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-center text-[#6B7280] pt-6 border-t border-[#333]">
        &copy; 2026 RudraVeer.NGO
      </div>
    </div>
  );
}
