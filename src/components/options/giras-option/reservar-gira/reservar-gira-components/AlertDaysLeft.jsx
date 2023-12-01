import React, { useEffect, useState } from 'react';

// Icon
import { TbClockHour5 } from 'react-icons/tb';

const AlertDaysLeft = ({ dateInMilliseconds }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const fechaActual = new Date().getTime();
    const diferenciaEnMilisegundos = dateInMilliseconds - fechaActual;
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    setDaysLeft(Math.floor(diferenciaEnDias));
  }, []);

  return (
    <div className="d-flex bg-white p-3 my-3 shadow text-danger">
      <TbClockHour5 className="fs-3" />
      <p className="m-0 fw-medium">
        {daysLeft > 0
          ? `Tu viaje cominza en ${daysLeft} dias. Reserva ahora, mientras hay
        disponibilidad.`
          : 'El viaje ya es paso.'}
      </p>
    </div>
  );
};

export default AlertDaysLeft;
