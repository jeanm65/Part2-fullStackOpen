import React from "react";

const Notifications = ({ notificationMessage }) => {
  if (notificationMessage === null) {
    return null;
  }
  return <div className={`${notificationMessage} ? error : '' `}>{notificationMessage}</div>;
};

export default Notifications;
