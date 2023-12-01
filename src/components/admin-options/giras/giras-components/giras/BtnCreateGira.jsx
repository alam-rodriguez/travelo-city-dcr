import React from 'react';

const BtnCreateGira = ({ text = 'Crear Gira' }) => {
  return (
    <input
      type="submit"
      className="bg-color border-0 rounded-3 p-2 w-100 fs-4 my-4"
      value={text}
    />
  );
};

export default BtnCreateGira;
