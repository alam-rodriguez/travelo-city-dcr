import React from 'react';
import { getGira } from '../../firebase/firestoreGiras/giras';
import { useInfoApp } from '../../zustand/admin/app/app';

const useSendEmails = () => {
  const { nameAppShort, usersCanReceiveNotisOfReservations } = useInfoApp();

  const sendEmailAboutReservations = async (giraCurrentId, reservaciones) => {
    // console.log(state.usersCanReceiveNotisOfReservations);

    console.log(giraCurrentId);
    console.log(reservaciones);

    const gira = await getGira(giraCurrentId);
    const fechaActual = new Date().getTime();
    let diferenciaEnMilisegundos = gira.dateInMilliseconds - fechaActual;
    let diferenciaEnDias = Math.trunc(
      diferenciaEnMilisegundos / (1000 * 60 * 60 * 24),
    );
    console.log(diferenciaEnDias);

    let email = [];
    reservaciones.forEach((reservacion) => {
      if (!email.includes(reservacion.email)) email.push(reservacion.email);
    });
    console.log(email);
    if (usersCanReceiveNotisOfReservations.length == 0) email = [];
    usersCanReceiveNotisOfReservations.forEach((user, i) => {
      if (!email.includes(user.email)) email.splice(i, 1);
    });

    console.log(email);
    for (const i in email) {
      console.log(email[i]);
      const response = fetch(
        'https://server-to-send-mails.vercel.app/send-email',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: email[i],
            subject: `Tu gira en ${nameAppShort} se aproxima.`,
            text:
              diferenciaEnDias > 1
                ? `Falta ${diferenciaEnDias} dias para la gira, estas listo ?`
                : diferenciaEnDias > 0
                ? 'La gira es mañana, estas listo?'
                : `La gira es hoy, a disfrutar`,
          }),
        },
      );
      response
        .then((res) => res.json())
        .then((res2) => {
          console.log('Mensaje enviado');
        })
        .catch((e) => {
          console.log('Error');
          console.log(e);
        });
    }
    return true;
  };
  return { sendEmailAboutReservations };
};

export default useSendEmails;
