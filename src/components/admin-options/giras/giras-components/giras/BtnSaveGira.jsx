import React from 'react';

const BtnSaveGira = ({ action }) => {
  return (
    <input
      type="button"
      value="Guardar como gira realizada"
      className="bg-success border-0 rounded-3 p-2 w-100 fs-4 my-4"
      onClick={action}
    />
  );
};

export default BtnSaveGira;
