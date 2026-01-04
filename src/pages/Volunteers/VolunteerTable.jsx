export default function VolunteerTable({ volunteers, onView, onDelete }) {
  return (
    <table className="w-full text-xs bg-white">
      <thead className="bg-orange-500 text-white">
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {volunteers.map((v) => (
          <tr key={v._id} className="border-b">
            <td>{v.fullName}</td>
            <td>{v.phone}</td>
            <td>{v.status}</td>
            <td>
              <button
                className="bg-blue-500 text-white px-2 py-1 mr-1"
                onClick={() => onView(v)}
              >
                View
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => onDelete(v._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
