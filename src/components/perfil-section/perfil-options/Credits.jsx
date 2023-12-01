import React from 'react';
import HeaderOptions from '../perfil-components/HeaderOptions';

const Credits = () => {
  return (
    <>
      <HeaderOptions text="Creditos" link="/perfil" />
      <div className="mt-5">
        <p className="fs-3 fw-medium">Creditos disponibles</p>
        <p>No tienes ningún crédito de aerolínea activo en tu cuenta.</p>
      </div>
    </>
  );
};

export default Credits;
