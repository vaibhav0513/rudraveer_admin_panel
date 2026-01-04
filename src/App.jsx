import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Volunteers from "./pages/Volunteers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoute from "./route/PrivateRoute";
import VolunteerApprovalPanel from "./components/PendingVolunteers";
import Blogs from "./pages/Blogs";
import { NotificationProvider } from "./context/NotificationProvider";
import PendingVolunteers from "./components/PendingVolunteers";
import Donations from "./pages/Donations";
import Events from "./pages/Events";

function App() {
  return (
    <NotificationProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect root path to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Routes under common layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/donation" element={<Donations />} />
            <Route path="/pending-volunteer" element={<PendingVolunteers />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/events" element={<Events />} />
          </Route>
        </Route>
      </Routes>
    </NotificationProvider>
  );
}

export default App;
