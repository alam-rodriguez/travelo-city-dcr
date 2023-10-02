import React from 'react';

const GiraDetailds = ({ icon, text, className }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      {icon}
      <p className={`m-0 fw-normal ${className}`}>{text}</p>
    </div>
  );
};

export default GiraDetailds;
