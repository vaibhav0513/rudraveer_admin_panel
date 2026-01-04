import { useState } from "react";

export default function VolunteerModal({
  volunteer,
  onClose,
  onUpdate,
  onDelete,
}) {
  const [form, setForm] = useState(volunteer);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96 space-y-3">
        <input
          className="w-full border p-2"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          className="w-full border p-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <select
          className="w-full border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>committee member</option>
          <option>member</option>
          <option>active member</option>
        </select>

        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white px-4 py-1"
            onClick={() => onUpdate(form)}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1"
            onClick={() => onDelete(form._id)}
          >
            Delete
          </button>
        </div>

        <button onClick={onClose} className="text-sm text-gray-500">
          Close
        </button>
      </div>
    </div>
  );
}
