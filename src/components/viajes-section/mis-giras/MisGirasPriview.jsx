import React, { useEffect, useState } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Components
import ReservacionP from '../../admin-options/giras/giras-reservaciones/giras-reservaciones-components/ReservacionP';

// Zustand
import { useInfoUser } from '../../../zustand/user/user';

const MisGirasPriview = ({
  reservation,
  reservationId,
  giraTitle,
  date,
  hour,
  GiraDateInMilliseconds,
  companions,
  pointsEarned,
  state,
  pointsUsed,
  total,
}) => {
  const { setReservationSelected } = useInfoUser();

  const navigate = useNavigate();

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const fechaActual = new Date().getTime();
    const diferenciaEnMilisegundos = GiraDateInMilliseconds - fechaActual;
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    setDaysLeft(Math.trunc(diferenciaEnDias));
  }, []);

  const handleClick = () => {
    setReservationSelected(reservation);
    navigate(`/mis-giras/${reservationId}`);
  };

  return (
    <div
      className="border-bottom- border-info- border-5- mb-5 pb-0"
      onClick={handleClick}
      style={{ borderBottom: 'rgb(0, 8, 255) 5px solid' }}
    >
      <ReservacionP head="Titulo de gira:" value={giraTitle} />
      <ReservacionP head="Fecha:" value={date} />
      <ReservacionP head="Hora:" value={hour} />
      <ReservacionP
        head="Dias retantes:"
        value={
          daysLeft > 0
            ? `${daysLeft} dias`
            : daysLeft == 0
            ? 'La gira es hoy'
            : 'La gira paso'
        }
      />

      {companions > 0 ? (
        <ReservacionP head="Acompanantes:" value={companions} />
      ) : (
        <></>
      )}

      {pointsEarned > 0 ? (
        <ReservacionP head="Puntos ganados:" value={pointsEarned} />
      ) : (
        <></>
      )}

      <ReservacionP head="Estado de reservacion:" value={state} />

      <hr />

      {pointsUsed > 0 ? (
        <ReservacionP head="Puntos utilizados:" value={pointsUsed} />
      ) : (
        <></>
      )}

      <ReservacionP head="Total:" value={total} />
    </div>
  );
};

export default MisGirasPriview;
