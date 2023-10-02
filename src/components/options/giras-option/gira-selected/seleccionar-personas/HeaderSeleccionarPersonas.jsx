import React from 'react';

// Icon
import { AiOutlineClose } from 'react-icons/ai';

// Zustand
import { useViewSeleccionarPersonas } from '../../../../../zustand/giras/giras';

const HeaderSeleccionarPersonas = () => {
  const {
    setViewSeleccionarPersonas,
    resetPerson,
    resetChildren,
    resetBebies,
  } = useViewSeleccionarPersonas();

  const handleClickBack = () => {
    setViewSeleccionarPersonas(false);
    resetPerson();
    resetChildren();
    resetBebies();
  };

  return (
    <header className="d-flex gap-3 align-items-center border-bottom py-3 px-3">
      <AiOutlineClose className="fs-4 color-1" onClick={handleClickBack} />
      <p className="m-0 fw-medium">Personas</p>
    </header>
  );
};

export default HeaderSeleccionarPersonas;
