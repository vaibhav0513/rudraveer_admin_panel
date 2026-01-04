import React, { createContext, useState, useContext } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const triggerNotification = (message, type = "success") => {
    const id = Date.now(); // Unique ID
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ triggerNotification }}>
      {children}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col items-center space-y-4">
        {notifications.map((n) => (
          <Notification
            key={n.id}
            message={n.message}
            type={n.type}
            onClose={() =>
              setNotifications((prev) => prev.filter((nt) => nt.id !== n.id))
            }
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
