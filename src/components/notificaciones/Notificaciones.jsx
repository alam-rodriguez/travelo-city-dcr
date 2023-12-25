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
    setInfoUser,

    notisGiras,
    notisSugerencias,
    notisReservations,
    notisGeneral,

    setNotisGiras,
    setNotisSugerencias,
    setNotisReservaciones,
    setNotisGeneral,
  } = useInfoUser();

  useEffect(() => {
    if (haveUserInfo || id == '') return;
    const f = async () => {
      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        setInfoUser(res);
        // setId(res.id);
        // setName(res.name);
        // setEmail(res.email);
        // setNumber(res.number);
        // setMoneySpent(res.moneySpent);
        // setPointsEarned(res.pointsEarned);
        // setPointsSpent(res.pointsSpent);
        // setNotificationsOfNewGiras(res.notisGiras);
        // setNotificationsOfNewSugerencias(res.notisSugerencias);
        // setNotificationsOfStateReservations(res.notisReservations);
      }
    };
    f();
  }, [id]);

  // const [notificationsOfNewGiras, setNotificationsOfNewGiras] = useState(true);
  // const [notificationsOfNewSugerencias, setNotificationsOfNewSugerencias] =
  //   useState(true);
  // const [
  //   notificationsOfStateReservations,
  //   setNotificationsOfStateReservations,
  // ] = useState(true);

  const handleChangeNotificationsOfNewGiras = (value) => setNotisGiras(value);

  const handleChangeNotificationsOfNewSugerencias = (value) =>
    setNotisSugerencias(value);

  const handleChangeNotificationsOfStateReservations = (value) =>
    setNotisReservaciones(value);

  const handleChangeNotificationsOfGeneral = (value) => setNotisGeneral(value);

  const saveInfo = async () => {
    const want = await ask({
      title: 'Guardar configuracion',
      text: 'Quieres guarda la configuracion de las notificaciones',
      confirmButtonText: 'Guardar configuracion',
    });
    if (!want.isConfirmed) return;
    waitingAlert('Guardando informacion...');
    const infoUser = await updateUserInfo({
      id,
      notisGiras,
      notisSugerencias,
      notisReservations,
      notisGeneral,
    });
    if (infoUser)
      successAlert(
        'Informacion guardada.',
        'la configuracion fue guardada correctamente.',
      );
    else errorAlert('Error al guardar configuracion');
  };

  // useEffect(() => {
  //   saveInfo();
  // }, [
  //   notisGiras,
  //   notisSugerencias,
  //   notisReservations,
  //   notisGeneral,
  // ]);

  return (
    <div className="pt-4">
      <NameApp />
      <hr />
      <p className="my-5">
        Puedes activar las notificaciones para que te llegen alertas sobre las
        giras, las sugerencias y tus reservaciones, de esta manera estaras
        altanto de tus adtividades y de nuestro app.
      </p>

      {haveUserInfo ? (
        <>
          <Switch
            id="notis-giras"
            text="Recibir notificaciones de nuevas giras"
            checked={notisGiras}
            handleChange={handleChangeNotificationsOfNewGiras}
          />
          <Switch
            id="notis-sugerencias"
            text="Recibir notificaciones de nuevas sugerencias"
            checked={notisSugerencias}
            handleChange={handleChangeNotificationsOfNewSugerencias}
          />
          <Switch
            id="notis-reservaciones"
            text="Recibir notificaciones de estado de reservaciones"
            checked={notisReservations}
            handleChange={handleChangeNotificationsOfStateReservations}
          />
          <Switch
            id="notis-general"
            text="Recibir notificaciones en general"
            checked={notisGeneral}
            handleChange={handleChangeNotificationsOfGeneral}
          />
        </>
      ) : null}

      {haveUserInfo ? (
        <input
          onClick={saveInfo}
          className="border-0 shadow-lg w-75 bg-color text-white rounded-5 p-2 fs-5 fw-medium position-fixed start-50 translate-middle"
          style={{ bottom: 80 }}
          type="button"
          value="Guardar configuracion"
        />
      ) : null}
    </div>
  );
};

export default Notificaciones;
