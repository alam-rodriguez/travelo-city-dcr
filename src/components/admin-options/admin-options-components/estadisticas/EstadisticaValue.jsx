import React from 'react';

const EstadisticaValue = ({ head, value, desk }) => {
  return (
    <div className="d-flex justify-content-between">
      <p className="fw-medium">{head}</p>
      <p className="fw-medium">
        <span className="fw-bold">{value}</span> {desk}
      </p>
    </div>
  );
};

export default EstadisticaValue;
