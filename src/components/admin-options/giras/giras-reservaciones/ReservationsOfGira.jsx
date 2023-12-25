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
import { useInfoApp } from '../../../../zustand/admin/app/app';
import { useAlerts } from '../../../../zustand/alerts/alerts';
import useSendEmails from '../../../../hooks/send-emails/useSendEmails';

const ReservationsOfGira = () => {
  const { currentId } = useParams();

  const { reservaciones, setReservaciones, setReservacionSelecionada } =
    useReservacionesGiras();

  const { emailsAboutReservationsWasSended, sendEmailsAboutReservations } =
    useInfoApp();

  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

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

  const { sendEmailAboutReservations } = useSendEmails();

  const sendEmails = async () => {
    // const
    // const res = await sendEmailsAboutReservations(currentId, reservaciones);
    const want = await ask({
      title: 'Quieres enviar mensajes?',
      text: 'Estas seguro de que quieres enviar mensajes sobre esta gira a tus usuarios ?',
      confirmButtonText: 'Enviar emails',
    });

    if (!want.isConfirmed) return;
    waitingAlert('Enviando emails...');
    await sendEmailAboutReservations(currentId, reservaciones);
    successAlert('Emails enviados');
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

        <input
          onClick={sendEmails}
          className="bg-secondary border-0 shadow-lg w-100 bg-color text-white rounded-5 p-2 fs-5 fw-medium"
          type="button"
          value="Enviar emails de dias faltantes"
        />
      </div>
    </>
  );
};

export default ReservationsOfGira;
