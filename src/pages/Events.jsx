import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

const Events = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    banner: null,
  });
  const [assigningId, setAssigningId] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${baseURL}/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(`${baseURL}/volunteers`);
      setVolunteers(res.data);
    } catch (err) {
      console.error("Failed to fetch volunteers", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    try {
      await axios.post(`${baseURL}/events`, formData);
      fetchEvents();
      setModalOpen(false);
      setForm({
        title: "",
        date: "",
        venue: "",
        description: "",
        banner: null,
      });
    } catch (err) {
      console.error("Failed to create event", err);
    } finally {
      setLoading(false);
    }
  };

  const openAssignModal = async (eventId) => {
    setAssigningId(eventId);
    await fetchVolunteers();
  };

  const submitVolunteerAssignment = async () => {
    try {
      await axios.patch(`${baseURL}/events/${assigningId}/assign-volunteers`, {
        volunteerIds: selectedVolunteers,
      });
      setAssigningId(null);
      setSelectedVolunteers([]);
      fetchEvents();
    } catch (err) {
      console.error("Failed to assign volunteers", err);
    }
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Event Management</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-[#FF5E3A] text-white px-4 py-2 rounded hover:bg-[#e14f2e]"
        >
          <FaPlus /> Add Event
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event._id} className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" /> {event.title}
            </h3>
            <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
              <FaMapMarkerAlt /> {event.venue} |{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-3 line-clamp-3">
              {event.description}
            </p>
            <div className="flex gap-2">
              <button
                className="text-sm bg-[#FF5E3A] text-white px-3 py-1 rounded hover:bg-[#e14f2e]"
                onClick={() => openAssignModal(event._id)}
              >
                <FaUsers className="inline-block mr-1" /> Assign Volunteers
              </button>
              <button className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                <FaEdit className="inline-block mr-1" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Event</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Venue"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, banner: e.target.files[0] })
                }
                className="w-full"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5E3A] text-white py-2 rounded hover:bg-[#e14f2e]"
              >
                {loading ? "Submitting..." : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      )}

      {assigningId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setAssigningId(null)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Assign Volunteers</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {volunteers.map((vol) => (
                <label key={vol._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedVolunteers.includes(vol._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVolunteers([...selectedVolunteers, vol._id]);
                      } else {
                        setSelectedVolunteers(
                          selectedVolunteers.filter((id) => id !== vol._id)
                        );
                      }
                    }}
                  />
                  {vol.fullName} ({vol.email})
                </label>
              ))}
            </div>
            <button
              onClick={submitVolunteerAssignment}
              className="mt-4 bg-[#FF5E3A] text-white py-2 px-4 rounded hover:bg-[#e14f2e]"
            >
              Assign Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
