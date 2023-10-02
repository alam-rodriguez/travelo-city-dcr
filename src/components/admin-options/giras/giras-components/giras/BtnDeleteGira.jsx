import React from 'react';

const BtnDeleteGira = ({ action }) => {
  return (
    <input
      type="button"
      value="Eliminar Gira"
      className="bg-danger border-0 rounded-3 p-2 w-100 fs-4 my-4"
      onClick={action}
    />
  );
};

export default BtnDeleteGira;
