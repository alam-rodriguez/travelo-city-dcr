import React from 'react';
import HeaderOptions from '../perfil-components/HeaderOptions';

const Coupons = () => {
  return (
    <>
      <HeaderOptions text="Cupones" link="/perfil" />
      <div className="mt-5">
        <p>
          Los cupones van a aparecer aqui tan pronto como esten disponibles.
        </p>
        <p className="fs-3 fw-medium">Cupones activos</p>
        <p>No tienes ningun cupon activo en tu cuenta</p>
      </div>
    </>
  );
};

export default Coupons;
