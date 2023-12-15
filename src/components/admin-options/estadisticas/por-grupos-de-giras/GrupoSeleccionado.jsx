import React, { useEffect } from 'react';

// Components
import Headers from '../../admin-options-components/Headers';
import ListGiras from '../../giras/giras-components/giras/ListGiras';

// Firebase
import {
  getAllGiras,
  getGirasNoDone,
} from '../../../../firebase/firestoreGiras/giras';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';
import ItemOfAllEstadisticas from '../../admin-options-components/estadisticas/ItemOfAllEstadisticas';
import { getAllReservations } from '../../../../firebase/firestoreGiras/reservations/reservations';
import { useEstadisticas } from '../../../../zustand/admin/estadisticas/estadisticas';

const GrupoSeleccionado = () => {
  const navigate = useNavigate();

  const { girasActives, allGiras, setGiras, giraGroupSelected } =
    girasListForAdmin();

  const {
    setStatistics,
    amountGiras,
    amountReservations,
    amountReservationsCancelled,
    amountBabies,
    amountChildren,
    amountAdults,
    amountPeople,
    earningsWithBabies,
    earningsWithChildren,
    earningsWithAdults,
    pointsGenerated,
    pointsSpent,
    reservationsPaidWithMoney,
    reservationsPaidWithTransfer,
    earningsTotal,
  } = useEstadisticas();

  useEffect(() => {
    if (giraGroupSelected.length == 0)
      navigate('/admin-options/opciones-estadisticas-giras/giras-por-grupos');

    const f = async () => {
      const idsOfGira = giraGroupSelected.map((gira) => gira.currentId);
      const reservattions = await getAllReservations();
      console.log(reservattions);
      const reservationsForStatistics = [];
      console.log(reservattions);
      reservattions.forEach((reservation) => {
        if (idsOfGira.includes(reservation.giraCurrentId)) {
          reservationsForStatistics.push(reservation);
          console.log('first');
        }
      });
      console.log(idsOfGira);
      console.log(reservationsForStatistics);

      setStatistics(girasActives, reservationsForStatistics);
    };
    f();
  }, [girasActives]);

  const handleClick = (currentId) => {
    navigate(`/admin-options/list-giras-for-stadisticas/${currentId}`);
    // navigate(`/admin-options/list-giras-for-reservations/${currentId}`);
  };

  return (
    <>
      <Headers
        text="Estadisticas giras activas"
        link="/admin-options/opciones-estadisticas-giras/giras-por-grupos"
      />
      <div className="my-4">
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
        <div>
          <ItemOfAllEstadisticas
            head="Cantidad de giras activas:"
            value={amountGiras}
          />

          <ItemOfAllEstadisticas
            head="Cantidad de reservaciones:"
            value={amountReservations}
          />
          <ItemOfAllEstadisticas
            head="Cantidad de reservaciones canceladas:"
            value={amountReservationsCancelled}
          />
          <ItemOfAllEstadisticas
            head="Cantidad de bebes que han ido:"
            value={amountBabies}
          />
          <ItemOfAllEstadisticas
            head="Cantidad de niños que han ido:"
            value={amountChildren}
          />
          <ItemOfAllEstadisticas
            head="Cantidad de adultos que han ido:"
            value={amountAdults}
          />
          <ItemOfAllEstadisticas
            head="Cantidad total de personas que han ido:"
            value={amountPeople}
          />
          <ItemOfAllEstadisticas
            head="Ganancias con bebes:"
            value={earningsWithBabies}
          />
          <ItemOfAllEstadisticas
            head="Ganancias con niños:"
            value={earningsWithChildren}
          />
          <ItemOfAllEstadisticas
            head="Ganancias con adultos:"
            value={earningsWithAdults}
          />
          <ItemOfAllEstadisticas
            head="Puntos generados:"
            value={pointsGenerated}
          />
          <ItemOfAllEstadisticas head="Puntos gastados:" value={pointsSpent} />

          <ItemOfAllEstadisticas
            head="Reservaciones pagadas con efectivo:"
            value={reservationsPaidWithMoney}
          />
          <ItemOfAllEstadisticas
            head="Reservaciones pagadas con transferencia:"
            value={reservationsPaidWithTransfer}
          />

          <hr />

          <ItemOfAllEstadisticas
            head="Total de ganancias:"
            value={earningsTotal}
          />
        </div>
      </div>
    </>
  );
};

export default GrupoSeleccionado;
