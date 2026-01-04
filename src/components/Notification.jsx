import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const Notification = ({ message, type = "success", onClose }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  const typeStyles = {
    success: {
      icon: <AiOutlineCheckCircle className="text-green-600" size={22} />,
      border: "border-green-500",
      bg: "bg-green-50",
      text: "text-green-800",
    },
    error: {
      icon: <AiOutlineCloseCircle className="text-red-600" size={22} />,
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-800",
    },
    info: {
      icon: <AiOutlineInfoCircle className="text-blue-600" size={22} />,
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-800",
    },
  };

  const { icon, border, bg, text } = typeStyles[type] || typeStyles.success;

  return (
    <div
      className={`w-fit max-w-sm px-4 py-3 rounded-xl border ${border} shadow-md ${bg} ${text}
      flex items-center gap-3 transition-all duration-500 ease-in-out
      ${fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 text-sm font-medium">{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-transform mt-[2px]"
          aria-label="Close"
        >
          <MdCancel size={18} />
        </button>
      )}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  onClose: PropTypes.func,
};

export default Notification;
