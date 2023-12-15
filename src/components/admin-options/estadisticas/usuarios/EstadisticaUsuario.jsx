import React, { useEffect, useState } from 'react';

// Components
import Headers from '../../admin-options-components/Headers';

// react-router-dom
import { useParams } from 'react-router-dom';
import PreviewEstadisticasUser from '../../admin-options-components/estadisticas/PreviewEstadisticasUser';

// Zustand
import { useEstadisticas } from '../../../../zustand/admin/estadisticas/estadisticas';
import { getUserInfo } from '../../../../firebase/users/users';
import { getAllReservations } from '../../../../firebase/firestoreGiras/reservations/reservations';
import { useInfoApp } from '../../../../zustand/admin/app/app';

// import PreviewEstadisticasUser from '../admin-options-components/estadisticas/PreviewEstadisticasUser';
// import ItemOfAllEstadisticas from '../admin-options-components/estadisticas/ItemOfAllEstadisticas';

const EstadisticaUsuario = () => {
  const { badges } = useInfoApp();
  const { id } = useParams();

  const { userSelected, setUserSelected } = useEstadisticas();

  const { reservations, setReservations } = useEstadisticas();

  useEffect(() => {
    if (userSelected.id != undefined) return;
    const f = async () => {
      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        setUserSelected({
          moneySpent: res.moneySpent,
          pointsSpent: res.pointsSpent,
          id: 'b40QBZTEnOTQJ7nTcvJNMP9FvlY2',
          email: res.email,
          type: res.type,
          pointsEarned: res.pointsEarned,
          name: res.name,
          number: res.number,
        });
      }
    };
    f();

    console.log(id);
    console.log(userSelected);
  }, []);

  const [reservacionesActivas, setReservacionesActivas] = useState(0);
  const [reservacionesCanceladas, setReservacionesCanceladas] = useState(0);
  const [userBadge, setUserBadge] = useState('Cargando...');

  useEffect(() => {
    if (userSelected.moneySpent == undefined) return;
    console.log(badges);
    const badge = calcBadge(userSelected.moneySpent, badges);
    console.log(badge);
    setUserBadge(badge.badge);
  }, [badges, userSelected]);

  useEffect(() => {
    if (reservations.length > 0) return;
    const f = async () => {
      const res = await getAllReservations();
      console.log(res);
      setReservations(res);
    };
    f();
  }, []);

  useEffect(() => {
    if (reservations.length == 0) return;
    let reservacionesActivas = 0;
    let reservacionesCanceladas = 0;
    reservations.forEach((reservation) => {
      if (reservation.state == 'Cancelada') reservacionesCanceladas++;
      else reservacionesActivas++;
    });
    setReservacionesActivas(reservacionesActivas);
    setReservacionesCanceladas(reservacionesCanceladas);
  }, [reservations]);

  const calcBadge = (num, badges) => {
    console.log(badges);
    console.log(num);
    let badgeSelected = {};
    badges.forEach((badge, i) => {
      if (num >= badge.minMoney) {
        if (i == 0) badgeSelected = badge;
        else if (i == badge.length) badgeSelected == badge;
        else badgeSelected = badges[i];
      }
      return;
    });
    console.log(badgeSelected);

    return badgeSelected;
  };

  if (userSelected.id == undefined) return <></>;

  return (
    <>
      <Headers
        text="Usuario seleccionado"
        link="/admin-options/opciones-estadisticas-giras/estadisticas-usuarios"
      />

      <div className="border-bottom py-3 my-3">
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Nombre:</p>
          <p className="m-0 fw-bold">{userSelected.name}</p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Email:</p>
          <p className="m-0 fw-bold">{userSelected.email}</p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Celular:</p>
          <p className="m-0 fw-bold">{userSelected.number}</p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Reservaciones en giras activass:</p>
          <p className="m-0 fw-bold">{reservacionesActivas}</p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Reservaciones en giras realizadas:</p>
          <p className="m-0 fw-bold">{reservacionesCanceladas}</p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Reservaciones totales:</p>
          <p className="m-0 fw-bold">
            {reservacionesActivas + reservacionesCanceladas}
          </p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Puntos ganados:</p>
          <p className="m-0 fw-bold">{userSelected.pointsEarned}</p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Puntos gastados:</p>
          <p className="m-0 fw-bold">{userSelected.pointsSpent}</p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Puntos restantes:</p>
          <p className="m-0 fw-bold">
            {userSelected.pointsEarned - userSelected.pointsSpent}
          </p>
        </div>
        <div className="d-flex justify-content-between py-1">
          <p className="m-0 fw-medium">Insignia:</p>
          <p className="m-0 fw-bold">{userBadge}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Dinero que ha gastado:</p>
        <p className="m-0 fw-bold">{userSelected.moneySpent}</p>
      </div>

      {/* <PreviewEstadisticasUser
        nombre="Alam Rodriguez"
        email="alamrd2016@gmail.com"
        telefono={123456789}
        dineroGastado="12000"
        reservacionesActivas={2}
        reservacionesPasadas={24}
        puntos={12500}
        insignia="pasajero de plata"
      /> */}
    </>
  );
};

export default EstadisticaUsuario;
