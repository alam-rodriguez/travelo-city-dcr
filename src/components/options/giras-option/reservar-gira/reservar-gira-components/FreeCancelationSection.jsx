import React from 'react';

// Img
import canlendario from '../../../../../assets/images/calendario.svg';

const FreeCancelationSection = ({ freeCancellationLimit }) => {
  return (
    <div className="d-flex bg-white shadow p-2 my-3">
      <img src={canlendario} className="" style={{ width: 50 }} />
      <div>
        <p className="m-0 fw-bold">Cancelacion gratuita si cambias de planes</p>
        <p className="m-0 text-secondary" style={{ fontSize: 15 }}>
          Cancela sin cargos antes del {freeCancellationLimit}
        </p>
      </div>
    </div>
  );
};

export default FreeCancelationSection;
