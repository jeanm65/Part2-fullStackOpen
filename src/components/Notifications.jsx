import React from "react";

const Notifications = ({ notificationMessage }) => {
  if (notificationMessage === null) {
    return null;
  }
  return <div className={`${notificationMessage} ? notification : '' `}>{notificationMessage}</div>;
};

export default Notifications;
