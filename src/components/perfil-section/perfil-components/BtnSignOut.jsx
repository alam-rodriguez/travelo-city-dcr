import React from 'react';

const BtnSignOut = ({ cerrarSeccion }) => {
  return (
    <button
      className="bg-transparent color-1 border-0 fw-medium text-center w-100 mt-3 mb-5"
      onClick={cerrarSeccion}
    >
      Cerrar seccion
    </button>
  );
};

export default BtnSignOut;
