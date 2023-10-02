import React from 'react';

// Icons
import { TbClockHour5 } from 'react-icons/tb';

const AlertDaysLeft = () => {
  return (
    <div className="d-flex bg-white p-3 my-3 shadow text-danger">
      <TbClockHour5 className="fs-3" />
      <p className="m-0">
        Tu viaje cominza en 5 dias. Reserva ahora, mientras hay disponibilidad.
      </p>
    </div>
  );
};

export default AlertDaysLeft;
