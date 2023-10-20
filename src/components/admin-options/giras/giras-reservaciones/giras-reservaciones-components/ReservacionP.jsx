import React from 'react';

const ReservacionP = ({ head, value }) => {
  return (
    <div className="d-flex justify-content-between my-2">
      <p className="m-0 fw-medium">{head}</p>
      <p className="m-0 fw-bold">{value}</p>
    </div>
  );
};

export default ReservacionP;
