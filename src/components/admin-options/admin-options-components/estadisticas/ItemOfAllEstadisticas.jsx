import React from 'react';

const ItemOfAllEstadisticas = ({ head, value }) => {
  return (
    <div className="d-flex justify-content-between py-2">
      <p className="m-0 fw-medium fs-6">{head}</p>
      <p className="m-0 fw-bold fs-6">{value}</p>
    </div>
  );
};

export default ItemOfAllEstadisticas;
