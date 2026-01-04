import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaList,
  FaThLarge,
  FaEnvelope,
  FaBirthdayCake,
} from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { FaSort } from "react-icons/fa";

export default function Volunteers() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("cards");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isReordering, setIsReordering] = useState(false);
  const [reorderList, setReorderList] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/volunteers`)
      .then((res) => setVolunteers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDeleteVolunteer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this volunteer?"))
      return;

    try {
      await axios.delete(`${baseURL}/volunteers/${id}`);
      setVolunteers((prev) => prev.filter((v) => v._id !== id));
      setSelectedVolunteer(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete volunteer");
    }
  };

  const handleUpdateVolunteer = async (updatedData) => {
    try {
      const res = await axios.put(
        `${baseURL}/volunteers/${selectedVolunteer._id}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );

      setVolunteers((prev) =>
        prev.map((v) => (v._id === selectedVolunteer._id ? res.data.data : v))
      );

      setSelectedVolunteer(res.data.data);
      alert("Volunteer updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update volunteer");
    }
  };

  const filtered = volunteers.filter((v) =>
    v.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-gray-800">Volunteers</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setIsReordering(true);
              setReorderList([...volunteers]); // make a copy
            }}
            className="bg-[#FF5E3A] hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            {/* Edit Order */}
            <FaSort /> {/* Icon */}
          </button>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-[#FF5E3A] focus:outline-none"
          />
          <button
            onClick={() => setView("cards")}
            className={`p-1.5 rounded ${
              view === "cards"
                ? "bg-[#FF5E3A] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded ${
              view === "list"
                ? "bg-[#FF5E3A] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Cards View */}
      {view === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-lg p-3 shadow border-t-4 border-[#FF5E3A] hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={v.profilePicture || "/default-profile.png"}
                  alt={v.fullName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#FF5E3A]"
                />
                <div>
                  <h2 className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <FaUser className="text-[#FF5E3A]" /> {v.fullName}
                  </h2>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-gray-400" /> {v.address}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex items-center gap-1">
                  <FaPhoneAlt className="text-green-500" /> {v.phone}
                </p>
                <p className="flex items-center gap-1">
                  <GrStatusGood className="text-green-500" /> {v.status}
                </p>
                <p className="flex items-center gap-1">
                  <FaCalendarAlt className="text-blue-500" /> Joined:{" "}
                  {new Date(v.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => setSelectedVolunteer(v)}
                  className="bg-[#28C76F] hover:bg-[#20b463] text-white text-xs px-3 py-1 rounded"
                >
                  Update
                </button>
                {/* <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                  Remove
                </button> */}
                <button
                  onClick={() => handleDeleteVolunteer(v._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="overflow-x-auto rounded-md shadow-sm">
          <table className="min-w-full bg-white text-xs">
            <thead className="bg-[#FF5E3A] text-white text-left">
              <tr>
                <th className="py-2 px-3">Profile</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Address</th>
                <th className="py-2 px-3">Phone</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Joined</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr
                  key={v._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-3">
                    <img
                      src={v.profilePicture || "/default-profile.png"}
                      alt={v.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-3 text-gray-800">{v.fullName}</td>
                  <td className="py-2 px-3 text-gray-600">{v.address}</td>
                  <td className="py-2 px-3 text-gray-600">{v.phone}</td>
                  <td className="py-2 px-3 text-gray-600">{v.status}</td>
                  <td className="py-2 px-3 text-gray-600">
                    {new Date(v.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => setSelectedVolunteer(v)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 text-xs rounded mr-1"
                    >
                      View
                    </button>
                    {/* <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 text-xs rounded">
                      Remove
                    </button> */}
                    <button
                      onClick={() => handleDeleteVolunteer(v._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 text-xs rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No volunteers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isReordering && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md space-y-4 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsReordering(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-lg font-bold mb-2">Reorder Volunteers</h2>

            {/* Reorder List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {reorderList.map((v, index) => (
                <div
                  key={v._id}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded shadow"
                >
                  <span>{v.fullName}</span>
                  <div className="flex gap-1">
                    <button
                      disabled={index === 0}
                      onClick={() => {
                        const newList = [...reorderList];
                        [newList[index], newList[index - 1]] = [
                          newList[index - 1],
                          newList[index],
                        ];
                        setReorderList(newList);
                      }}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    >
                      ↑
                    </button>
                    <button
                      disabled={index === reorderList.length - 1}
                      onClick={() => {
                        const newList = [...reorderList];
                        [newList[index], newList[index + 1]] = [
                          newList[index + 1],
                          newList[index],
                        ];
                        setReorderList(newList);
                      }}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* OK & Cancel Buttons */}
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={async () => {
                  try {
                    // send updated sequence to backend
                    await axios.post(`${baseURL}/volunteers/reorder`, {
                      order: reorderList.map((v, idx) => ({
                        id: v._id,
                        sequence: idx + 1,
                      })),
                    });

                    // update frontend
                    setVolunteers([...reorderList]);
                    setIsReordering(false);
                    alert("Volunteer order updated successfully");
                  } catch (err) {
                    console.error(err);
                    alert("Failed to update order");
                  }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>

              <button
                onClick={() => setIsReordering(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}

      {/* {selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md space-y-4 shadow-xl relative">
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>

            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.fullName}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  fullName: e.target.value,
                })
              }
              placeholder="Full Name"
            />

            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.email}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.phone}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  phone: e.target.value,
                })
              }
              placeholder="Phone"
            />

            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.address}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  address: e.target.value,
                })
              }
              placeholder="Address"
            />

            <select
              className="w-full border p-2 rounded"
              value={selectedVolunteer.status}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  status: e.target.value,
                })
              }
            >
              <option value="president">President</option>
              <option value="committee member">Committee Member</option>
              <option value="member">Member</option>
              <option value="active member">Active Member</option>
              <option value="associate member">Associate Member</option>
              <option value="secretary">Secretary</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => handleUpdateVolunteer(selectedVolunteer)}
                className="bg-[#28C76F] text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => handleDeleteVolunteer(selectedVolunteer._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}

      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md space-y-4 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>

            {/* Profile Picture Preview & Upload */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  selectedVolunteer.profilePreview ||
                  selectedVolunteer.profilePicture ||
                  "/default-profile.png"
                }
                alt={selectedVolunteer.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#FF5E3A]"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedVolunteer({
                      ...selectedVolunteer,
                      profileFile: file, // store file for upload
                      profilePreview: URL.createObjectURL(file), // temporary preview
                    });
                  }
                }}
                className="text-sm"
              />
            </div>

            {/* Other Inputs */}
            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.fullName}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  fullName: e.target.value,
                })
              }
              placeholder="Full Name"
            />

            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.email}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.phone}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  phone: e.target.value,
                })
              }
              placeholder="Phone"
            />

            <input
              className="w-full border p-2 rounded"
              value={selectedVolunteer.address}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  address: e.target.value,
                })
              }
              placeholder="Address"
            />

            <select
              className="w-full border p-2 rounded"
              value={selectedVolunteer.status}
              onChange={(e) =>
                setSelectedVolunteer({
                  ...selectedVolunteer,
                  status: e.target.value,
                })
              }
            >
              <option value="president">President</option>
              <option value="committee member">Committee Member</option>
              <option value="member">Member</option>
              <option value="active member">Active Member</option>
              <option value="associate member">Associate Member</option>
              <option value="secretary">Secretary</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={async () => {
                  try {
                    const formData = new FormData();
                    formData.append("fullName", selectedVolunteer.fullName);
                    formData.append("email", selectedVolunteer.email);
                    formData.append("phone", selectedVolunteer.phone);
                    formData.append("address", selectedVolunteer.address);
                    formData.append("status", selectedVolunteer.status);

                    // If new profile picture selected
                    if (selectedVolunteer.profileFile) {
                      formData.append(
                        "profilePicture",
                        selectedVolunteer.profileFile
                      );
                    }

                    const res = await axios.put(
                      `${baseURL}/volunteers/${selectedVolunteer._id}`,
                      formData,
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );

                    setVolunteers((prev) =>
                      prev.map((v) =>
                        v._id === selectedVolunteer._id ? res.data.data : v
                      )
                    );

                    setSelectedVolunteer(res.data.data);
                    alert("Volunteer updated successfully");
                  } catch (error) {
                    console.error(error);
                    alert("Failed to update volunteer");
                  }
                }}
                className="bg-[#28C76F] text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => handleDeleteVolunteer(selectedVolunteer._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
