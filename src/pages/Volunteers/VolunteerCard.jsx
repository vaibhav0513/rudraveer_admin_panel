import { FaUser } from "react-icons/fa";

export default function VolunteerCard({ volunteer, onView, onDelete }) {
  return (
    <div className="bg-white p-3 rounded shadow border-t-4 border-orange-500">
      <div className="flex items-center gap-2">
        <img
          src={volunteer.profilePicture || "/default-profile.png"}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="text-sm font-semibold flex gap-1 items-center">
            <FaUser /> {volunteer.fullName}
          </h3>
          <p className="text-xs text-gray-500">{volunteer.address}</p>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <button
          className="bg-green-500 text-white px-3 py-1 text-xs rounded"
          onClick={() => onView(volunteer)}
        >
          View
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 text-xs rounded"
          onClick={() => onDelete(volunteer._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
