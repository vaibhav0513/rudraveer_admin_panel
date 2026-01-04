import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBug,
  FaClock,
  FaUser,
  FaExclamationCircle,
  FaReply,
} from "react-icons/fa";

const Problems = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [problems, setProblems] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  const fetchProblems = async () => {
    try {
      const res = await axios.get(`${baseURL}/problem/all`);
      setProblems(res.data.problems);
    } catch (err) {
      console.error("Failed to fetch problems:", err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleReply = async (id) => {
    try {
      await axios.put(`${baseURL}/problem/contact/${id}/reply`, {
        reply: replyText,
      });
      setReplyText("");
      setSelectedProblemId(null);
      fetchProblems();
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  return (
    <div className="space-y-6 ">
      <h1 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        Reported Problems
      </h1>

      {problems.length === 0 ? (
        <p className="text-gray-500 italic">
          No problems have been reported yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FaBug className="text-red-400" /> {problem.fullname}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Email:</strong> {problem.email}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Contact No:</strong> {problem.contactNo}
              </p>
              <p className="text-gray-700 mb-3 line-clamp-3">
                {problem.message}
              </p>
              <div className="text-sm text-gray-500 flex justify-between mb-2">
                <span className="flex items-center gap-1">
                  <FaClock /> {new Date(problem.createdAt).toLocaleDateString()}
                </span>
              </div>
              {problem.reply ? (
                <p className="text-green-600 text-sm italic">
                  Reply: {problem.reply}
                </p>
              ) : selectedProblemId === problem._id ? (
                <div className="space-y-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg text-sm"
                    placeholder="Type your reply here..."
                  />
                  <button
                    onClick={() => handleReply(problem._id)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 flex items-center gap-1"
                  >
                    <FaReply /> Send Reply
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedProblemId(problem._id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Reply
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Problems;
