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
// import { getReservationGira } from '../../../../firebase/firestoreGiras/reservations';
import { useReservacionesGiras } from '../../../../zustand/admin/giras/giras-reservaciones/reservacionesGiras';
import ReservacionItem from './giras-reservaciones-components/ReservacionP';
import ReservacionP from './giras-reservaciones-components/ReservacionP';
import ReservationItem from './giras-reservaciones-components/ReservationItem';

const ViewReservationSelected = () => {
  const { currentId, id: idReservationSeleted } = useParams();

  const { reservacionSelecionada } = useReservacionesGiras();

  useEffect(() => {
    console.log(currentId);
    console.log(idReservationSeleted);
    console.log(reservacionSelecionada);
  }, []);

  // useEffect(() => {
  //   if (reservaciones.length > 0) return;
  //   console.log('Cargando reservaciones');
  //   const f = async () => {
  //     const res = await getReservationGira(currentId);
  //     if (res == false) return;
  //     res.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
  //     setReservaciones(res);
  //   };
  //   f();
  // }, []);

  // useEffect(() => {
  //   if (reservaciones.length == 0) return;

  //   if (currentId != reservaciones[0].giraCurrentId) {
  //     setReservaciones([]);
  //   }
  // }, [reservaciones]);

  // const navigate = useNavigate();

  // const handleClick = (id) =>
  // navigate(`/admin-options/list-giras-for-reservations/${currentId}/${id}`);

  const handleClickCancelarReservacion = () => {
    console.log('Confirmacion cancelada');
  };

  const handleClickConfirmarReservacion = () => {
    console.log('Confirmacion confirmada');
  };

  return (
    <>
      <Headers text="Reservacion seleccionada" link={-1} />
      <div
        className="border-bottom-border-danger border-5- my-5 pb-0"
        // onClick={() => handleClick(id)}
      >
        <ReservacionP
          head="Fecha:"
          value={reservacionSelecionada.dayMadeReservation}
        />
        <ReservacionP
          head="Hora:"
          value={reservacionSelecionada.hourMakeReservation}
        />
        <ReservacionP head="Nombre:" value={reservacionSelecionada.userName} />
        <ReservacionP
          head="Numero:"
          value={reservacionSelecionada.userNumber}
        />
        <ReservacionP
          head="Precio adulto:"
          value={reservacionSelecionada.adultPrice}
        />
        <ReservacionP head="Estado de reservacion:" value="confirmado" />

        {Object.keys(reservacionSelecionada.adultsNames).length > 0 ||
        Object.keys(reservacionSelecionada.childrenNames).length > 0 ||
        Object.keys(reservacionSelecionada.bebiesNames).length > 0 ? (
          <p className="m-0 text-center fw-bold">acompanantes:</p>
        ) : (
          <></>
        )}

        {Object.keys(reservacionSelecionada.adultsNames).length > 0 ? (
          <>
            <ReservacionP
              head="Adultos:"
              value={(() => {
                const elementos = Object.keys(
                  reservacionSelecionada.adultsNames,
                ).map((clave) => {
                  const valor = reservacionSelecionada.adultsNames[clave];
                  return <span key={clave}> {valor},</span>;
                });
                return elementos;
              })()}
            />
            <ReservacionP
              head="Precio cada adulto:"
              value={reservacionSelecionada.adultPrice}
            />
          </>
        ) : (
          <></>
        )}

        {Object.keys(reservacionSelecionada.childrenNames).length > 0 ? (
          <>
            <ReservacionP
              head="Ninos:"
              value={(() => {
                const elementos = Object.keys(
                  reservacionSelecionada.childrenNames,
                ).map((clave) => {
                  const valor = reservacionSelecionada.childrenNames[clave];
                  return <span key={clave}> {valor},</span>;
                });
                return elementos;
              })()}
            />
            <ReservacionP
              head="Precio cada niño:"
              value={reservacionSelecionada.childrenPrice}
            />
          </>
        ) : (
          <></>
        )}
        {Object.keys(reservacionSelecionada.bebiesNames).length > 0 ? (
          <>
            <ReservacionP
              head="Bebes:"
              value={(() => {
                const elementos = Object.keys(
                  reservacionSelecionada.bebiesNames,
                ).map((clave) => {
                  const valor = reservacionSelecionada.bebiesNames[clave];
                  return <span key={clave}> {valor},</span>;
                });
                return elementos;
              })()}
            />
            <ReservacionP
              head="Precio cada Bebe:"
              value={reservacionSelecionada.bebiesPrice}
            />
          </>
        ) : (
          <></>
        )}

        <div className="position-fixed start-0 bottom-0 mb-5 w-100 d-flex justify-content-evenly">
          <button
            className="bg-danger border-0 p-2 rounded-3 fw-medium"
            onClick={handleClickCancelarReservacion}
          >
            Cancelar reservacion
          </button>
          <button
            className="bg-color border-0 p-2 rounded-3 fw-medium"
            onClick={handleClickConfirmarReservacion}
          >
            Confirmar reservacion
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewReservationSelected;
