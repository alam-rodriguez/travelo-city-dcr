import React, { useEffect } from 'react';

// Zustand
import { useViewBtnSeleccionarEntrada } from '../../../../../zustand/giras/giras';
import { useState } from 'react';

const BtnSeleccionarEntradas = () => {
  const { viewBtnSeleccionarEntrada } = useViewBtnSeleccionarEntrada();

  const [viewBtn, setViewBtn] = useState(false);

  useEffect(() => {
    if (viewBtnSeleccionarEntrada) setViewBtn(true);
    else
      setTimeout(() => {
        setViewBtn(false);
      }, 1000);
  }, [viewBtnSeleccionarEntrada]);

  if (viewBtn) {
    return (
      <div
        className={`animate__animated ${
          viewBtnSeleccionarEntrada ? 'animate__fadeIn' : 'animate__fadeOut'
        }   position-fixed start-0 bottom-0 pb-4 px-2 w-100 z-3`}
      >
        <a href="#CartForReserve">
          <input
            className="border-0 shadow-lg  w-100 bg-color text-white rounded-5 p-2 fs-5 fw-medium"
            type="button"
            value="Seleccionar entradas"
          />
        </a>
      </div>
    );
  } else return <></>;
};

export default BtnSeleccionarEntradas;
