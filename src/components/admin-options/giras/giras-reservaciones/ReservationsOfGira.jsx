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
import { getReservationGira } from '../../../../firebase/firestoreGiras/reservations';
import { useReservacionesGiras } from '../../../../zustand/admin/giras/giras-reservaciones/reservacionesGiras';
import ReservacionItem from './giras-reservaciones-components/ReservacionP';
import ReservacionP from './giras-reservaciones-components/ReservacionP';
import ReservationItem from './giras-reservaciones-components/ReservationItem';

const ReservationsOfGira = () => {
  const { currentId } = useParams();

  const { reservaciones, setReservaciones } = useReservacionesGiras();

  useEffect(() => {
    console.log(currentId);
    const f = async () => {
      const res = await getReservationGira(currentId);
      res.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
      setReservaciones(res);
    };
    f();
    // if (giras.length == 0) {
    //   const f = async () => {
    //     console.log('first');
    //     const resGiras = await getAllGiras();
    //     console.log(resGiras);
    //     console.warn('Cargando giras de BD');
    //     setGiras(resGiras);
    //   };
    //   f();
    // }
  }, []);

  const { giras, setGiras } = girasListForAdmin();

  const navigate = useNavigate();

  const handleClick = (currentId) =>
    navigate(`/admin-options/giras-editar/${currentId}`);

  return (
    <>
      <Headers text="Reservaciones de giras" link={-1} />
      <div className="my-4">
        {reservaciones.map((reservacion) => (
          <ReservationItem
            key={reservacion.reservationId}
            id={reservacion.reservationId}
            date={reservacion.date}
            hour={reservacion.hourMakeReservation}
            userName={reservacion.userName}
            userNumber={reservacion.userNumber}
            adultsNames={reservacion.adultsNames}
            adultPrice={reservacion.adultPrice}
            childrenNames={reservacion.childrenNames}
            childrenPrice={reservacion.childrenPrice}
            bebiesNames={reservacion.bebiesNames}
            bebiesPrice={reservacion.bebiesPrice}
          />
        ))}
        {/* {giras.map((gira) => (
          <ListGiras
            key={gira.currentId}
            currentId={gira.currentId}
            title={gira.title}
            description={gira.description}
            price={gira.prices.adult}
            handleClick={handleClick}
          />
        ))} */}
      </div>
    </>
  );
};

export default ReservationsOfGira;
