import React from 'react';

// Icons
import { TbClockHour5 } from 'react-icons/tb';

const AlertDaysLeft = ({ daysLeft }) => {
  return (
    <div className="d-flex bg-white p-3 my-3 shadow text-danger">
      <TbClockHour5 className="fs-3" />
      <p className="m-0 fw-medium">
        Tu viaje cominza en {daysLeft} dias. Reserva ahora, mientras hay
        disponibilidad.
      </p>
    </div>
  );
};

export default AlertDaysLeft;
