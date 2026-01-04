import { useState, useEffect } from "react";
import axios from "axios";
import VolunteerCard from "./VolunteerCard";
import VolunteerTable from "./VolunteerTable";
import VolunteerModal from "./VolunteerModal";
import { FaThLarge, FaList } from "react-icons/fa";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("cards");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/volunteers")
      .then((res) => setVolunteers(res.data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/api/volunteers/${id}`);
    setVolunteers((prev) => prev.filter((v) => v._id !== id));
    setSelectedVolunteer(null);
  };

  const handleUpdate = async (data) => {
    const res = await axios.put(
      `http://localhost:5000/api/volunteers/${data._id}`,
      data
    );

    setVolunteers((prev) =>
      prev.map((v) => (v._id === data._id ? res.data.data : v))
    );
    setSelectedVolunteer(null);
  };

  const filtered = volunteers.filter((v) =>
    v.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between">
        <input
          className="border px-3 py-1 rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={() => setView("cards")}>
            <FaThLarge />
          </button>
          <button onClick={() => setView("list")}>
            <FaList />
          </button>
        </div>
      </div>

      {/* Views */}
      {view === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <VolunteerCard
              key={v._id}
              volunteer={v}
              onView={setSelectedVolunteer}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <VolunteerTable
          volunteers={filtered}
          onView={setSelectedVolunteer}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      {selectedVolunteer && (
        <VolunteerModal
          volunteer={selectedVolunteer}
          onClose={() => setSelectedVolunteer(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
