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
import { useAlerts } from '../../../../zustand/alerts/alerts';
import { updateReservation } from '../../../../firebase/firestoreGiras/reservations/reservations';
import { getImage } from '../../../../firebase/firestoreGiras/imagenesGira';

const ViewReservationSelected = () => {
  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const { currentId, id: idReservationSeleted } = useParams();

  const { reservacionSelecionada } = useReservacionesGiras();

  const { reservacionesImages, addReservacionImage } = useReservacionesGiras();
  useEffect(() => {
    console.log(currentId);
    console.log(idReservationSeleted);
    console.log(reservacionSelecionada);
    console.log(reservacionSelecionada.imageTransactionPath);
    if (
      reservacionSelecionada.imageTransactionPath == null ||
      reservacionesImages[reservacionSelecionada.reservationId] != undefined
    )
      return;
    console.log('buscando imagen');
    const f = async () => {
      const imgLink = await getImage(
        reservacionSelecionada.imageTransactionPath,
      );
      addReservacionImage(reservacionSelecionada.reservationId, imgLink);
      console.log(imgLink);
    };
    f();
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

  const handleClickCancelarReservacion = async () => {
    const res = await ask({
      title: 'Cancelar reservacion',
      text: 'Estas seguro de que quieres cancelar la reservacion, esto solo debe hacerse si el usuario a cancelado la reservacion.',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (!res.isConfirmed) return;
    const reservationUpdated = {
      reservationId: reservacionSelecionada.reservationId,
      reservacionPagada: false,
      state:
        reservacionSelecionada.pointsUsed > 0
          ? 'Adelanto realizado con Puntos'
          : 'Pendiente',
    };
    waitingAlert('Cancelando reservacion...');
    const resReser = await updateReservation(reservationUpdated);
    if (resReser)
      successAlert(
        'Reservacion actualizada',
        'La reservacion fue cancelada correctamente.',
      );
    else
      errorAlert(
        'Error',
        'Ha ocurrido un error al intentar cancelar la reservacion, por favor revisa tu conexion a internet.',
      );
  };

  const handleClickConfirmarReservacion = async () => {
    const res = await ask({
      title: 'Confirmar reservacion',
      text: 'Estas seguro de que quieres confirmar la reservacion, esto solo debe hacerse si realmente el usuario ha pagado la reservacion.',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (!res.isConfirmed) return;
    const reservationUpdated = {
      reservationId: reservacionSelecionada.reservationId,
      reservacionPagada: true,
      state:
        reservacionSelecionada.pointsUsed > 0
          ? 'Pagada con puntos y dinero'
          : 'Pagada',
    };

    waitingAlert('Confirmando reservacion...');
    const resReser = await updateReservation(reservationUpdated);
    if (resReser)
      successAlert(
        'Reservacion actualizada',
        'La reservacion fue cancelada correctamente.',
      );
    else
      errorAlert(
        'Error',
        'Ha ocurrido un error al intentar cancelar la reservacion, por favor revisa tu conexion a internet.',
      );
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
          head="Fecha escrita:"
          value={reservacionSelecionada.date}
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
        <ReservacionP head="Email:" value={reservacionSelecionada.email} />
        <ReservacionP
          head="Metodo de pago:"
          value={reservacionSelecionada.methodOfPay}
        />
        {reservacionSelecionada.methodOfPay == 'tarjeta' ? (
          <ReservacionP
            head="Banco utilizado:"
            value={reservacionSelecionada.bankSelected}
          />
        ) : (
          <></>
        )}

        <ReservacionP
          head="Pago completado:"
          value={reservacionSelecionada.reservacionPagada ? 'Si' : 'No'}
        />
        <ReservacionP
          head="Precio adulto:"
          value={reservacionSelecionada.adultPrice}
        />
        <ReservacionP
          head="Estado de reservacion:"
          value={reservacionSelecionada.state}
        />
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
        <hr />
        {reservacionSelecionada.pointsUsed > 0 ? (
          <ReservacionP
            head="Puntos usados:"
            value={reservacionSelecionada.pointsUsed}
          />
        ) : (
          <></>
        )}
        <ReservacionP
          head="Total:"
          value={
            reservacionSelecionada.total -
            reservacionSelecionada.discountInMoney
          }
        />
        {reservacionSelecionada.imageTransactionPath != null ? (
          <div className=" ">
            <img
              src={reservacionesImages[reservacionSelecionada.reservationId]}
              className="w-100 object-fit-contain border border-success border-4"
              // style={{ height: '300px' }}
              alt=""
            />
          </div>
        ) : (
          <></>
        )}
        <div className="mt-5">
          <p className="mb-1 text-center fw-medium fs-5">
            Informacion de gira:
          </p>
          <p className="m-0 fw-medium">
            Titulo de Gira:{' '}
            <span className="fw-bold">{reservacionSelecionada.title}</span>
          </p>
          <p className="m-0 fw-medium">
            Descripcion Gira:{' '}
            <span className="fw-bold">
              {reservacionSelecionada.description}
            </span>
          </p>
        </div>
        <div className="position-fixed- start-0- -bottom-0 mt-4 w-100 d-flex justify-content-evenly">
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
