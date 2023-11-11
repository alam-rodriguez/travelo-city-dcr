import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate, useParams } from 'react-router-dom';

// Zusttand
import { useGiras } from '../../../../zustand/giras/giras';
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';

// Components
import Headers from '../../admin-options-components/Headers';
import ListGiras from '../giras-components/giras/ListGiras';
import { getAllGiras } from '../../../../firebase/firestoreGiras/giras';
import { getReservationGira } from '../../../../firebase/firestoreGiras/reservations/reservations';
import { useReservacionesGiras } from '../../../../zustand/admin/giras/giras-reservaciones/reservacionesGiras';
import ReservacionItem from './giras-reservaciones-components/ReservacionP';
import ReservacionP from './giras-reservaciones-components/ReservacionP';
import ReservationItem from './giras-reservaciones-components/ReservationItem';

const ReservationsOfGira = () => {
  const { currentId } = useParams();

  const { reservaciones, setReservaciones, setReservacionSelecionada } =
    useReservacionesGiras();

  useEffect(() => {
    if (reservaciones.length > 0) return;
    console.log('Cargando reservaciones');
    const f = async () => {
      const res = await getReservationGira(currentId);
      if (res == false) return;
      res.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
      console.warn(res);
      setReservaciones(res);
    };
    f();
  }, []);

  useEffect(() => {
    if (reservaciones.length == 0) return;

    if (currentId != reservaciones[0].giraCurrentId) {
      setReservaciones([]);
    }
  }, [reservaciones]);

  const navigate = useNavigate();

  const handleClick = (reservacion) => {
    setReservacionSelecionada(reservacion);
    navigate(
      `/admin-options/list-giras-for-reservations/${currentId}/${reservacion.reservationId}`,
    );
  };

  return (
    <>
      <Headers text="Reservaciones de giras" link={-1} />
      <div className="my-4">
        {reservaciones.map((reservacion) => (
          <ReservationItem
            key={reservacion.reservationId}
            id={reservacion.reservationId}
            date={reservacion.dayMadeReservation}
            hour={reservacion.hourMakeReservation}
            userName={reservacion.userName}
            userNumber={reservacion.userNumber}
            userEmail={reservacion.email}
            stateReservation={reservacion.state}
            adultsNames={reservacion.adultsNames}
            adultPrice={reservacion.adultPrice}
            childrenNames={reservacion.childrenNames}
            childrenPrice={reservacion.childrenPrice}
            bebiesNames={reservacion.bebiesNames}
            bebiesPrice={reservacion.bebiesPrice}
            reservacion={reservacion}
            pointsUsed={reservacion.pointsUsed}
            total={reservacion.total - reservacion.discountInMoney}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default ReservationsOfGira;
