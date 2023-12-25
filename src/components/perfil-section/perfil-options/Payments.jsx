import React from 'react';

// Components
import HeaderOptions from '../perfil-components/HeaderOptions';

// Zustand
import { useInfoApp } from '../../../zustand/admin/app/app';

const Payments = () => {
  const { nameAppLarge } = useInfoApp();

  return (
    <>
      <HeaderOptions text="Pagos" link="/perfil" />
      <div className="mt-5">
        <p>
          Los pagos realizados en {nameAppLarge} son totalmente seguros y
          confiables, tu informacion es privada y solo nuestros administradores
          tienen acceso a ella.
        </p>
      </div>
    </>
  );
};

export default Payments;
