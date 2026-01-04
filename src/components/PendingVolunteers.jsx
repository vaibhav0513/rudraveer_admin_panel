import { useEffect, useState } from "react";
import axios from "axios";

export default function PendingVolunteers() {
   const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [pendingVolunteers, setPendingVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMap, setStatusMap] = useState({});

  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseURL}/volunteers/pending`
      );
      setPendingVolunteers(res.data);
    } catch (err) {
      console.error("Error fetching pending volunteers:", err);
    } finally {
      setLoading(false);
    }
  };

  const approveVolunteer = async (id, status) => {
    try {
      await axios.post(`${baseURL}/volunteers/${id}/approve`, {
        status,
      });
      setPendingVolunteers((prev) => prev.filter((v) => v._id !== id));
      // console.log("✅ Approved:", data);
    } catch (err) {
      console.error("Approval failed:", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="space-y-6 ">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">
        Pending Volunteer Applications
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : pendingVolunteers.length === 0 ? (
        <p className="text-gray-500">No pending applications.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingVolunteers.map((v) => (
            <div key={v._id} className="bg-white border rounded-lg p-4 shadow">
              <h2 className="text-lg font-bold text-gray-800">{v.fullName}</h2>
              <p className="text-sm text-gray-600">Email: {v.email}</p>
              <p className="text-sm text-gray-600">Phone: {v.phone}</p>
              <p className="text-sm text-gray-600 mb-2">Address: {v.address}</p>
              <p className="text-sm text-gray-600 mb-2">Gender: {v.gender}</p>
              <p className="text-sm text-gray-600 mb-2">BloodGroup: {v.bloodGroup}</p>

              <select
                className="w-full mb-2 border rounded px-2 py-1"
                value={statusMap[v._id] || ""}
                onChange={(e) =>
                  setStatusMap((prev) => ({ ...prev, [v._id]: e.target.value }))
                }
              >
                <option value="">Select Role</option>
                  <option value="president">President</option>
                <option value="committee member">Committee Member</option>
                <option value="member">Member</option>
                <option value="secretary">Secretary</option>
                <option value="active member">Active Member</option>
                <option value="associate member">Associate Member</option>
              </select>

              <button
                onClick={() => approveVolunteer(v._id, statusMap[v._id])}
                disabled={!statusMap[v._id]}
                className={`w-full bg-[#FF5E3A] text-white font-semibold py-1.5 rounded hover:bg-[#e14f2e] transition ${
                  !statusMap[v._id] && "opacity-50 cursor-not-allowed"
                }`}
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
