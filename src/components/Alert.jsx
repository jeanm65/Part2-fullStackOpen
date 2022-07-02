import React from "react";

const Alert = ({ type, message }) => {
  if (type === "") return;
  return <div className={type}>{message}</div>;
};

export default Alert;
