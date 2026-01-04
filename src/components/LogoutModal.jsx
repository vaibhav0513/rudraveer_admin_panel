// components/LogoutModal.jsx
export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
