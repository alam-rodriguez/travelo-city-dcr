import React from 'react';

const ReservarGiraAccordingItem = ({ head, total }) => {
  return (
    <div className="d-flex justify-content-between" style={{ fontSize: 14 }}>
      <p className="m-0">{head}</p>
      <p className="m-0">{total}</p>
    </div>
  );
};

export default ReservarGiraAccordingItem;
