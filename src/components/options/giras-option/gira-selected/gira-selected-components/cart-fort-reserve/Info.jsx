import React from 'react';

const Info = ({ icon, text }) => {
  return (
    <div className="d-flex align-items-center gap-2 my-1">
      {icon}
      <p className="m-0 fw-normal">{text}</p>
    </div>
  );
};

export default Info;
