import React, { useEffect } from 'react';

// image
// import imageCandado from '../../assets/images/imageCandado.png';

// Firebase
import { signInWithGoogle } from '../../../firebase/authentication/authWithGoogle';
import { getUserInfo } from '../../../firebase/users/users';
import { useInfoUser } from '../../../zustand/user/user';
// import ReservationItem from '....//admin-options/giras/giras-reservaciones/giras-reservaciones-components/ReservationItem';
import {
  getReservationGira,
  getReservationsByEmail,
} from '../../../firebase/firestoreGiras/reservations/reservations';
// import { useReservacionesGiras } from '../../zustand/admin/giras/giras-reservaciones/reservacionesGiras';
// import ReservacionP from '../admin-options/giras/giras-reservaciones/giras-reservaciones-components/ReservacionP';
import MisGirasPriview from '../mis-giras/MisGirasPriview';
import { useNavigate } from 'react-router-dom';

const MisGirasRealizadas = () => {
  const navigate = useNavigate();

  const {
    userLogged,
    haveUserInfo,
    id,
    setId,
    name,
    email,
    setEmail,
    setName,
    setNumber,
    name: oldName,
    number: oldNumber,
    moneySpent,
    setMoneySpent,
    pointsEarned,
    setPointsEarned,
    pointsSpent,
    setPointsSpent,
    badge,
    setBadge,
    calcBadge,

    type,

    // discount,
    // setDiscount,
    discountPercentWithPoints,
    setDiscountPercentWithPoints,
    discountPercentWithBadge,
    setDiscountPercentWithBadge,

    pointsHasToSpent,
    setPointsHasToSpent,

    discountInMoney,
    setDiscountInMoney,

    userReservations,
    setUserReservations,
    userReservationsNotDone,
    setUserReservationsNotDone,
  } = useInfoUser();

  useEffect(() => {
    if (userReservationsNotDone.length == 0) navigate('/mis-giras');

    if (haveUserInfo || id == '') return;

    const f = async () => {
      console.log('obteniendo user de BD');
      // if (id == '') return;
      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        setName(res.name);
        setEmail(res.email);
        // setNameAndSurname(res.name);
        setNumber(res.number);
        // setNumber(res.number);
        setMoneySpent(res.moneySpent);
        setPointsEarned(res.pointsEarned);
        setPointsSpent(res.pointsSpent);
        // console.log(res);
        // setBadge(res.badge);
      }
      console.warn(res);
    };
    f();
  }, [id]);

  const handleClickIniciarSesion = async () => {
    const email = await signInWithGoogle();
    console.log(email);
  };

  useEffect(() => {
    if (email == '' || userReservations.length > 0) return;
    const f = async () => {
      const fechaActual = new Date().getTime();
      console.log(email);
      const res = await getReservationsByEmail(email);
      res.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
      const reservationsActives = [];
      const reservationsNotActives = [];
      res.forEach((reservation) => {
        if (reservation.GiraDateInMilliseconds > fechaActual)
          reservationsActives.push(reservation);
        else reservationsNotActives.push(reservation);
        console.log(reservation.GiraDateInMilliseconds);
      });
      console.log(res);
      setUserReservations(reservationsActives);
      setUserReservationsNotDone(reservationsNotActives);
      console.log(reservationsActives);
      console.log(reservationsNotActives);
    };
    f();
  }, [email]);

  const handleClickViewActivities = () => navigate('/mis-giras');

  if (type == '') return;

  if (type == 'anonymous') {
    return (
      <div className="d-flex flex-column gap-3">
        <p className="m-0 display-5 fw-bold mt-5">Giras</p>
        <img
          className="w-50 mx-auto mt-5"
          src="https://a.travel-assets.com/egds/illustrations/uds-default/baggage__large.svg"
        />
        <p className="fw-bold m-0">
          Tu proxima aventura te espera, registrate!
        </p>
        <ul className="lightSpeedInLeft">
          <li className="">
            Ahorra dinero con puntos e insiginas en las tus giras favoritos
          </li>
          <li>
            Gana puntos llamados DCRPoints y ahorra un 25%, un 50%, un 75% y
            hasta el 100% en tus actividades
          </li>
          <li>
            Mira las giras y compartesa a tu grupo de amigos para disfrutar
            juntos
          </li>
        </ul>
        <input
          className="form-control bg-primary text-white rounded-5 fw-medium"
          type="button"
          value="Iniciar sesion o crear una cuenta"
          onClick={handleClickIniciarSesion}
        />
      </div>
    );
  }

  return (
    <>
      <p className="m-0 display-5 fw-bold pt-4">Lista de giras realizadas</p>
      <hr />
      <div className="my-4 mt-5">
        {userReservationsNotDone.map((reservation) => (
          <MisGirasPriview
            reservation={reservation}
            key={reservation.reservationId}
            reservationId={reservation.reservationId}
            giraTitle={reservation.title}
            date={reservation.date}
            hour={reservation.horaGira}
            GiraDateInMilliseconds={reservation.GiraDateInMilliseconds}
            companions={
              Object.entries(reservation.adultsNames).length +
              Object.entries(reservation.childrenNames).length +
              Object.entries(reservation.bebiesNames).length
            }
            pointsEarned={reservation.pointsEarned}
            state={reservation.state}
            pointsUsed={reservation.pointsUsed}
            total={reservation.total}
          />
        ))}

        <div className="d-flex justify-content-center mt-5">
          <button
            className="bg-color border-0 rounded-3 p-2 fs-6 fw-medium"
            onClick={handleClickViewActivities}
          >
            Ver actividades en agenda
          </button>
        </div>
      </div>
    </>
  );
};

export default MisGirasRealizadas;
