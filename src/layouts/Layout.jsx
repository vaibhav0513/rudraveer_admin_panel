// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   return (
//     <div className="flex bg-[#121412]">
//       {/* Fixed Sidebar */}
//       <div className="fixed top-0 left-0 h-screen w-64 z-10">
//         <Sidebar />
//       </div>

//       {/* Content Wrapper */}
//       <div className="flex-1 flex flex-col ml-64 min-h-screen">
//         {/* Fixed Header */}
//         <div className="sticky top-0 z-10">
//           <Header />
//         </div>

//         {/* Scrollable Main Content */}
//         <main className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] h-[calc(100vh-3.5rem)]">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import { Outlet } from "react-router-dom";
// import { HiMenuAlt3 } from "react-icons/hi";

// export default function Layout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-[#121412]">
//       {/* Sidebar for large screens */}
//       <div className="hidden md:block fixed top-0 left-0 h-full w-64 z-20">
//         <Sidebar />
//       </div>

//       {/* Sidebar overlay for mobile/tablet */}
//       {sidebarOpen && (
//         <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-60" onClick={() => setSidebarOpen(false)}>
//           <div className="fixed top-0 left-0 h-full w-64 bg-[#1C1F1D] z-50" onClick={(e) => e.stopPropagation()}>
//             <Sidebar />
//           </div>
//         </div>
//       )}

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col md:ml-64 w-full">
//         {/* Header with hamburger for mobile */}
//         <div className="sticky top-0 z-30 bg-[#1B1E1C] text-white h-14 flex items-center justify-between px-4 shadow border-b border-[#2A2D2B] md:px-6">
//           {/* Show hamburger only on small screens */}
//           <button className="md:hidden text-white" onClick={() => setSidebarOpen(true)}>
//             <HiMenuAlt3 className="text-2xl" />
//           </button>
//           <div className="md:hidden text-lg font-bold text-[#FF5E3A]">Admin Panel</div>
//           <div className="hidden md:block w-full">
//             <Header />
//           </div>
//         </div>

//         {/* Scrollable Main Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F9F9F9]">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#121412]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-10">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="bg-[#1C1F1D] w-64 h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-30">
          <Header onHamburgerClick={() => setSidebarOpen(true)} />
        </div>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] h-[calc(100vh-3.5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
