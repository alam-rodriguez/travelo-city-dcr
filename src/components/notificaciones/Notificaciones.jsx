import React, { useEffect, useState } from 'react';

// Components
import NameApp from '../inicio/NameApp';
import Switch from '../admin-options/giras/giras-components/giras/Switch';
import { useInfoUser } from '../../zustand/user/user';
import { getUserInfo, updateUserInfo } from '../../firebase/users/users';
import { useAlerts } from '../../zustand/alerts/alerts';

const Notificaciones = () => {
  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

  const {
    haveUserInfo,
    id,
    setId,
    setEmail,
    setName,
    setNumber,
    setMoneySpent,
    setPointsEarned,
    setPointsSpent,
  } = useInfoUser();

  useEffect(() => {
    if (haveUserInfo || id == '') return;
    const f = async () => {
      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        setId(res.id);
        setName(res.name);
        setEmail(res.email);
        setNumber(res.number);
        setMoneySpent(res.moneySpent);
        setPointsEarned(res.pointsEarned);
        setPointsSpent(res.pointsSpent);
      }
    };
    f();
  }, [id]);

  const [notificationsOfNewGiras, setNotificationsOfNewGiras] = useState(true);
  const [notificationsOfNewSugerencias, setNotificationsOfNewSugerencias] =
    useState(true);
  const [
    notificationsOfStateReservations,
    setNotificationsOfStateReservations,
  ] = useState(true);

  const handleChangeNotificationsOfNewGiras = (value) => {
    setNotificationsOfNewGiras(value);
    saveInfo();
  };

  const handleChangeNotificationsOfNewSugerencias = (value) => {
    setNotificationsOfNewSugerencias(value);
    saveInfo();
  };

  const handleChangeNotificationsOfStateReservations = (value) => {
    setNotificationsOfStateReservations(value);
    saveInfo();
  };

  const saveInfo = async () => {
    if (!haveUserInfo) return;
    const infoUser = await updateUserInfo({
      id,
      notisGiras: notificationsOfNewGiras,
      notisSugerencias: notificationsOfNewSugerencias,
      notisReservations: notificationsOfStateReservations,
    });
    // waitingAlert('Guardando configuracion...');
    console.log(infoUser);
    if (infoUser) successAlert('Informacion guardada.');
    else errorAlert('Error al guardar configuracion');

    console.log(notificationsOfNewGiras);
    console.log(notificationsOfNewSugerencias);
    console.log(notificationsOfStateReservations);
  };

  useEffect(() => {
    saveInfo();
  }, [
    notificationsOfNewGiras,
    notificationsOfNewSugerencias,
    notificationsOfStateReservations,
  ]);

  return (
    <div className="pt-4">
      <NameApp />
      <hr />
      <p className="my-5">
        Puedes activar las notificaciones para que te llegen alertas sobre las
        giras, las sugerencias y tus reservaciones, de esta manera estaras
        altanto de tu adtividad y de nuestro app.
      </p>

      <Switch
        id="active-points"
        text="Recibir notificaciones de nuevas giras"
        checked={notificationsOfNewGiras}
        handleChange={handleChangeNotificationsOfNewGiras}
      />
      <Switch
        id="active-points"
        text="Recibir notificaciones de nuevas sugerencias"
        checked={notificationsOfNewSugerencias}
        handleChange={handleChangeNotificationsOfNewSugerencias}
      />
      <Switch
        id="active-points"
        text="Recibir notificaciones de estado de reservaciones"
        checked={notificationsOfStateReservations}
        handleChange={handleChangeNotificationsOfStateReservations}
      />
    </div>
  );
};

export default Notificaciones;
