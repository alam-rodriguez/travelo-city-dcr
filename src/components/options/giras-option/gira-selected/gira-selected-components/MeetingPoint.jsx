import React from 'react';

const MeetingPoint = ({ giraMeetingPoint }) => {
  return (
    <div className="my-3">
      <p className="m-0 mt-1 fs-4 fw-bold">punto de encuentro</p>
      <p className="m-0 fw-normal">{giraMeetingPoint}</p>
    </div>
  );
};

export default MeetingPoint;
