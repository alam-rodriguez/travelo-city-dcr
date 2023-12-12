import React, { useEffect } from 'react';

// image
import imageCandado from '../../assets/images/imageCandado.png';

// Firebase
import { signInWithGoogle } from '../../firebase/authentication/authWithGoogle';
import {
  existUser,
  getUserInfo,
  setUserInfo,
} from '../../firebase/users/users';
import { useInfoUser } from '../../zustand/user/user';
import ReservationItem from '../admin-options/giras/giras-reservaciones/giras-reservaciones-components/ReservationItem';
import {
  getReservationGira,
  getReservationsByEmail,
} from '../../firebase/firestoreGiras/reservations/reservations';
import { useReservacionesGiras } from '../../zustand/admin/giras/giras-reservaciones/reservacionesGiras';
import ReservacionP from '../admin-options/giras/giras-reservaciones/giras-reservaciones-components/ReservacionP';
import MisGirasPriview from './mis-giras/MisGirasPriview';
import { useNavigate } from 'react-router-dom';
import { useAlerts } from '../../zustand/alerts/alerts';

const MisViajes = () => {
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
    userAllReservations,
    userReservationsNotDone,
    setUserReservations,

    searchedReservations,
    setReservations,
    type,
    setType,
  } = useInfoUser();

  useEffect(() => {
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
        setType(res.type);
        // console.log(res);
        // setBadge(res.badge);
      }
      console.warn(res);
    };
    f();
  }, [id]);

  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const handleClickIniciarSesion = async () => {
    // const email = await signInWithGoogle();
    // console.log(email);
    waitingAlert('Iniciando sesion');
    const infoUser = await signInWithGoogle();
    const userExist = await existUser(infoUser.id);
    let resUserInfo = true;
    if (!userExist)
      resUserInfo = await setUserInfo({
        email: infoUser.email,
        id: infoUser.id,
        moneySpent: 0,
        name: '',
        number: 0,
        pointsEarned: 0,
        pointsSpent: 0,
        type: 'customer',
      });

    if (infoUser != false && resUserInfo) {
      await successAlert('Has iniciado sesion correctamente.');
      window.location.reload();
    } else errorAlert('Ha ocurrido un error al intentar iniciar sesion.');
  };

  useEffect(() => {
    if (email == '' && searchedReservations) return;
    const f = async () => {
      const fechaActual = new Date().getTime();
      console.log(email);
      const res = await getReservationsByEmail(email);
      // res.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
      setReservations(res);

      // const reservationsActives = [];
      // const reservationsNotActives = [];
      // res.forEach((reservation) => {
      //   if (reservation.GiraDateInMilliseconds > fechaActual)
      //     reservationsActives.push(reservation);
      //   else reservationsNotActives.push(reservation);
      //   console.log(reservation.GiraDateInMilliseconds);
      // });
      // console.log(res);
      // setUserReservations(reservationsActives);
      // setUserReservationsNotDone(reservationsNotActives);
      // console.log(reservationsActives);
      // console.log(reservationsNotActives);
    };
    f();
  }, [searchedReservations]);

  const handleClickViewActivitiesDone = () =>
    navigate('/mis-giras/giras-pasadas');

  if (type == '') return <></>;
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
      <p className="m-0 display-5 fw-bold pt-4">Agenda de giras</p>
      <hr />
      <div className="my-4 mt-5">
        {!searchedReservations ? (
          <p className="text-center fs-5 fw-medium">
            Cargando reservaciones...
          </p>
        ) : searchedReservations && userAllReservations.length == 0 ? (
          <p className="text-center fs-5 fw-medium">Sin reservaciones</p>
        ) : (
          <></>
        )}

        {userReservations.map((reservation) => (
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

        {userReservationsNotDone.length > 0 ? (
          <div className="d-flex justify-content-center mt-5">
            <button
              className="bg-color border-0 rounded-3 p-2 fs-6 fw-medium"
              onClick={handleClickViewActivitiesDone}
            >
              Ver actividades pasadas
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );

  // const { reservaciones, setReservaciones, setReservacionSelecionada } =
  //   useReservacionesGiras();
  // useEffect(() => {
  //   if (reservaciones.length > 0) return;
  //   console.log('Cargando reservaciones');
  //   const f = async () => {
  //     const res = await getReservationGira(currentId);
  //     if (res == false) return;
  //     res.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
  //     console.warn(res);
  //     setReservaciones(res);
  //   };
  //   f();
  // }, []);

  // if (true) {

  // }

  // return (
  //   // <div className="d-flex flex-column gap-3">
  //   //   <hr />

  //   //   {/* <div className='text-center border-bottom pb-3'></div> */}

  //   //   <h1>Viajes</h1>

  //   //   <div className="d-flex justify-content-center">
  //   //     <img className="" src={imageCandado} style={{ width: '35%' }} />
  //   //   </div>

  //   //   <input
  //   //     className="form-control bg-primary text-white rounded-5"
  //   //     type="button"
  //   //     value="Iniciar sesion o crear una cuenta"
  //   //     onClick={handleClickIniciarSesion}
  //   //   />

  //   //   <input
  //   //     className="form-control bg-transparent fw-bold py-3 rounded-3"
  //   //     type="button"
  //   //     value="No tienes una cuenta?"
  //   //   />
  //   // </div>

  //   <div className="d-flex flex-column gap-3">
  //     <p className="m-0 display-5 fw-bold mt-5">Giras</p>
  //     <img
  //       className="w-50 mx-auto mt-5"
  //       src="https://a.travel-assets.com/egds/illustrations/uds-default/baggage__large.svg"
  //     />
  //     <p className="fw-medium m-0 fs-5">
  //       Alam, no tienes ninguna gira en agenda, cual sera tu proxima aventura?
  //     </p>

  //     <input
  //       className="form-control- border-0 p-2 bg-color text-white rounded-5 fw-medium"
  //       type="button"
  //       value="Buscar aventura"
  //       onClick={handleClickIniciarSesion}
  //     />
  //   </div>
  // );
};

export default MisViajes;
