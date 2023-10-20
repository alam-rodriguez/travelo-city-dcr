import React from 'react';

const BtnArchivarGira = ({ action }) => {
  return (
    <input
      type="button"
      value="Archivar gira"
      className="bg-warning border-0 rounded-3 p-2 w-100 fs-4 my-4"
      onClick={action}
    />
  );
};

export default BtnArchivarGira;
