import React, { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

// Components
import HeaderReserveGira from './reservar-gira-components/HeaderReserveGira';

// img
import canlendario from '../../../../assets/images/calendario.svg';
import AccordinSection from './reservar-gira-components/AccordinSection';
import { FaTicketAlt } from 'react-icons/fa';
import { TbClockHour5 } from 'react-icons/tb';
import { FaAnglesDown } from 'react-icons/fa6';
import FreeCancelationSection from './reservar-gira-components/FreeCancelationSection';
import AlertDaysLeft from './reservar-gira-components/AlertDaysLeft';
import WhoTravelSection from './reservar-gira-components/WhoTravelSection';
// import ImportanInformationSection from './reservar-gira-components/ImportanInformationSection';

import ImportantInformationSection from './reservar-gira-components/ImportantInformationSection';
import CompletarReservacion from './reservar-gira-components/CompletarReservacion';
import Accordings from './reservar-gira-components/Accordings';

import {
  useGiras,
  useInfoPeople,
  useViewSeleccionarPersonas,
} from '../../../../zustand/giras/giras';
import { createReservationGira } from '../../../../firebase/firestoreGiras/reservations';
import { useAlerts } from '../../../../zustand/alerts/alerts';
import { signInWithGoogle } from '../../../../firebase/authentication/authWithGoogle';
import { getUserInfo, setUserInfo } from '../../../../firebase/users/users';
import { useInfoUser } from '../../../../zustand/user/user';

const ReservarGira = () => {
  // const [logUser, setLogUser] = useState(true);
  const {
    userLogged,
    haveUserInfo,
    id,
    setId,
    email,
    setEmail,
    setName: setNameUser,
    setNumber: setNumberUser,
    name: oldName,
    number: oldNumber,
  } = useInfoUser();

  useEffect(() => {
    console.log(haveUserInfo);
    console.log(oldName);
    if (haveUserInfo) {
      setNameAndSurname(oldName);
      setNumber(oldNumber);
      return;
    }
    const f = async () => {
      console.log('obteniendo user de BD');
      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        setNameUser(res.name);
        setNameAndSurname(res.name);
        setNumberUser(res.number);
        setNumber(res.number);
      }
      console.warn(res);
    };
    f();
  }, []);

  const { giraSelected } = useGiras();
  // Alerts
  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    console.log(oldName);
  }, [oldName]);

  useEffect(() => {
    console.log(giraSelected);
    const date = new Date();
    console.log(date.getDay());
    console.log(giraSelected.dateDetaild);

    const fechaActual = new Date();
    const fechaEspecifica = new Date(giraSelected.dateLimitForCancelDetaild);
    const diferenciaEnMilisegundos = fechaEspecifica - fechaActual;
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    setDaysLeft(Math.floor(diferenciaEnDias));
    console.log(`La diferencia es de ${diferenciaEnDias} días.`);
  }, []);

  const { countPersons, countChildren, countBabies } =
    useViewSeleccionarPersonas();

  const {
    nameAndSurname,
    setNameAndSurname,
    number,
    setNumber,
    adultosNames,
    setAdultosNames,
    childrenNames,
    setChildrenNames,
    bebiesNames,
    setBebiesNames,
    resetNames,
  } = useInfoPeople();

  const getDay = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    const dayMakeReservation = `${anio}-${mes}-${dia}`;
    return dayMakeReservation;
  };
  const getHour = () => {
    const fechaActual = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };

    const formato12Horas = fechaActual.toLocaleTimeString('en-US', options);
    return formato12Horas;
  };

  const handleClickCompletarReservacion = async (e) => {
    e.preventDefault();

    const date = getDay();
    const dateDetailed = new Date();
    const dateInMilliseconds = dateDetailed.getTime();
    const hour = getHour();

    const result = await ask({
      title: '¿Quieres reservar esta gira?',
      text: '¿Estas seguro de que quieres hacer esta reservar? si aceptas le avisaremos a nuestros administradores y te contactaremos para comfirmar tu reservacion.',
      confirmButtonText: 'Recervar',
    });
    if (!result.isConfirmed) return;
    waitingAlert();

    const promise = new Promise(async (resolve, reject) => {
      console.log(date);
      // console.log(giraSelected);
      const reserve = {
        reservationId: uuid(),
        email: email,
        userName: nameAndSurname,
        userNumber: number,
        giraId: giraSelected.id,
        giraCurrentId: giraSelected.currentId,
        dayMadeReservation: date,
        hourMakeReservation: hour,
        dateInMilliseconds: dateInMilliseconds,
        title: giraSelected.title,
        description: giraSelected.description,
        date: giraSelected.date,
        dateDetaild: giraSelected.dateDetaild,

        adultsNames: adultosNames,
        adultPrice: giraSelected.prices.adult,

        childrenNames: childrenNames,
        childrenPrice: giraSelected.prices.child,

        bebiesNames: bebiesNames,
        bebiesPrice: giraSelected.prices.baby,
      };

      const res = await createReservationGira(reserve);

      const newInfoUser = {
        email: email,
        id: id,
        name: nameAndSurname,
        number,
      };

      const resUserInfo = await setUserInfo(newInfoUser);

      if (resUserInfo) {
        console.log('info actualizada');
      }
      // const res = true;
      if (res) resolve();
      else reject();
    });
    promise
      .then(() => {
        successAlert(
          'Reservacion realizada exitosamente',
          'Tu reservacion fue creada y enviada a nuestros administradores, te estaremos contactando para confirmar tu reservacion.',
        );
      })
      .catch(() => {
        errorAlert(
          'Error',
          'Ha ocurrido un error al intentar crear tu reservacion, intentelo de nuevo.',
        );
      });
  };

  const registrarUser = async () => {
    const infoUser = await signInWithGoogle();

    const resUserInfo = await setUserInfo({
      email: infoUser.email,
      id: infoUser.id,
    });

    if (infoUser != false) {
      setEmail(infoUser.email);
      setId(infoUser.id);
    }
    if (resUserInfo) {
      console.log('usuario registrado');
    }
  };

  return (
    <>
      <HeaderReserveGira resetNames={resetNames} />
      <form
        onSubmit={handleClickCompletarReservacion}
        className="mb-5 bg-light"
        style={{ paddingTop: 90 }}
      >
        <p className="m-0 fw-bold fs-3">
          Asegura tu reservacion. Solo te toma 2 minutos!
        </p>

        <FreeCancelationSection
          freeCancellationLimit={giraSelected.dateLimitForCancel}
        />

        <hr />

        <Accordings
          countPersons={countPersons}
          pricePerson={giraSelected.prices.adult}
          countChildren={countChildren}
          priceChild={giraSelected.prices.child}
          countBabies={countBabies}
          priceBaby={giraSelected.prices.baby}
          description={giraSelected.description}
          title={giraSelected.title}
          duracion={giraSelected.duration}
          city={giraSelected.city}
          location={giraSelected.location}
        />

        <p className="m-0 mt-3">
          Las tarifas se muestran en{' '}
          <span className="fw-bold">dolares estadounidenses.</span>
        </p>

        <AlertDaysLeft daysLeft={daysLeft} />

        <WhoTravelSection
          countPersons={countPersons}
          nameAndSurname={nameAndSurname}
          setNameAndSurname={setNameAndSurname}
          number={number}
          setNumber={setNumber}
          adultosNames={adultosNames}
          setAdultosNames={setAdultosNames}
          countChildren={countChildren}
          childrenNames={childrenNames}
          setChildrenNames={setChildrenNames}
          countBabies={countBabies}
          bebiesNames={bebiesNames}
          setBebiesNames={setBebiesNames}
          oldName={oldName}
          oldNumber={oldNumber}
        />

        <ImportantInformationSection />

        <CompletarReservacion
          nameAndSurname={nameAndSurname}
          number={number}
          adultosNames={adultosNames}
          childrenNames={childrenNames}
          bebiesNames={bebiesNames}
          userLogged={userLogged}
          registrarUser={registrarUser}
        />
      </form>
    </>
  );
};

export default ReservarGira;
