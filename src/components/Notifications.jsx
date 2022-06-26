import React from "react";

const Notifications = ({ message, values }) => {
  if (message === null) {
    return null;
  }
  return <div className={`${message} ? error : '' `}>{message}</div>;
};

export default Notifications;
