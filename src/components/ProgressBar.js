import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      ></div>
      <p>{Math.round(progress)}% Complete</p>
    </div>
  );
};

export default ProgressBar;