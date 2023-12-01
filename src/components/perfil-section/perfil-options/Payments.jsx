import React from 'react';
import HeaderOptions from '../perfil-components/HeaderOptions';

const Payments = () => {
  return (
    <>
      <HeaderOptions text="Pagos" link="/perfil" />
      <div className="mt-5">
        <p>
          Los pagos realizados en ... son totalmente seguros y confiables, tu
          informacion es privada y solo nuestros administradores tienen acceso a
          ella.
        </p>
      </div>
    </>
  );
};

export default Payments;
