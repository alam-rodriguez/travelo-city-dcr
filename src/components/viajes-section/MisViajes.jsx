import React, { useEffect } from 'react';

// image
import imageCandado from '../../assets/images/imageCandado.png';

// Firebase
import { signInWithGoogle } from '../../firebase/authentication/authWithGoogle';
import { getUserInfo } from '../../firebase/users/users';
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
    setUserReservations,
    setUserReservationsNotDone,
    setReservations,
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
  }, [email]);

  const handleClickViewActivitiesDone = () =>
    navigate('/mis-giras/giras-pasadas');

  if (!haveUserInfo) {
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
  return (
    <>
      <p className="m-0 display-5 fw-bold pt-4">Agenda de giras</p>
      <hr />
      <div className="my-4 mt-5">
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

        <div className="d-flex justify-content-center mt-5">
          <button
            className="bg-color border-0 rounded-3 p-2 fs-6 fw-medium"
            onClick={handleClickViewActivitiesDone}
          >
            Ver actividades pasadas
          </button>
        </div>
        {/* {userReservations.map((reservation) => (
              <div key={reservation.reservationId}>
                <ReservacionP
                  head="Titulo de gira:"
                  value={reservation.title}
                />
                <ReservacionP head="Fecha:" value={reservation.date} />
                <ReservacionP head="Hora:" value={reservation.horaGira} />
                <ReservacionP head="Dias retantes:" value="9 dias" />

                <ReservacionP head="Acompanantes:" value="9" />
                <ReservacionP
                  head="Puntos ganados:"
                  value={reservation.pointsEarned}
                />
                <ReservacionP
                  head="Estado de reservacion:"
                  value={reservation.state}
                />

                <hr />

                <ReservacionP head="Puntos utilizados:" value={5000} />
                <ReservacionP head="Total:" value={50000} />
              </div>
            ))} */}

        {/* <hr /> */}

        {/* {reservaciones.map((reservacion) => (
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
              handleClick={{}}
            />
          ))} */}
        {/* <div
            className="border-bottom border-danger border-5 mb-5 pb-0"
            // onClick={() => handleClick(reservacion)}
          >
            <ReservacionP head="Nombre:" value={userName} />
            <ReservacionP head="Numero:" value={userNumber} />
            <ReservacionP head="Email:" value={userEmail} />
            <ReservacionP
              head="Estado de reservacion:"
              value={stateReservation}
            />

            {Object.keys(adultsNames).length > 0 ||
            Object.keys(childrenNames).length > 0 ||
            Object.keys(bebiesNames).length > 0 ? (
              <p className="m-0 text-center fw-bold">acompanantes:</p>
            ) : (
              <></>
            )}

            {Object.keys(adultsNames).length > 0 ? (
              <>
                <ReservacionP
                  head="Adultos:"
                  value={(() => {
                    const elementos = Object.keys(adultsNames).map((clave) => {
                      const valor = adultsNames[clave];
                      return <span key={clave}> {valor},</span>;
                    });
                    return elementos;
                  })()}
                />
              </>
            ) : (
              <></>
            )}

            {Object.keys(childrenNames).length > 0 ? (
              <>
                <ReservacionP
                  head="Ninos:"
                  value={(() => {
                    const elementos = Object.keys(childrenNames).map(
                      (clave) => {
                        const valor = childrenNames[clave];
                        return <span key={clave}> {valor},</span>;
                      },
                    );
                    return elementos;
                  })()}
                />
              </>
            ) : (
              <></>
            )}
            {Object.keys(bebiesNames).length > 0 ? (
              <>
                <ReservacionP
                  head="Bebes:"
                  value={(() => {
                    const elementos = Object.keys(bebiesNames).map((clave) => {
                      const valor = bebiesNames[clave];
                      return <span key={clave}> {valor},</span>;
                    });
                    return elementos;
                  })()}
                />
              </>
            ) : (
              <></>
            )}
            <hr />
            {pointsUsed > 0 ? (
              <ReservacionP head="Puntos utilizados:" value={pointsUsed} />
            ) : (
              <></>
            )}

            <ReservacionP head="Total:" value={total} />
          </div> */}
      </div>
    </>
  );
  // }

  return (
    // <div className="d-flex flex-column gap-3">
    //   <hr />

    //   {/* <div className='text-center border-bottom pb-3'></div> */}

    //   <h1>Viajes</h1>

    //   <div className="d-flex justify-content-center">
    //     <img className="" src={imageCandado} style={{ width: '35%' }} />
    //   </div>

    //   <input
    //     className="form-control bg-primary text-white rounded-5"
    //     type="button"
    //     value="Iniciar sesion o crear una cuenta"
    //     onClick={handleClickIniciarSesion}
    //   />

    //   <input
    //     className="form-control bg-transparent fw-bold py-3 rounded-3"
    //     type="button"
    //     value="No tienes una cuenta?"
    //   />
    // </div>

    <div className="d-flex flex-column gap-3">
      <p className="m-0 display-5 fw-bold mt-5">Giras</p>
      <img
        className="w-50 mx-auto mt-5"
        src="https://a.travel-assets.com/egds/illustrations/uds-default/baggage__large.svg"
      />
      <p className="fw-medium m-0 fs-5">
        Alam, no tienes ninguna gira en agenda, cual sera tu proxima aventura?
      </p>

      <input
        className="form-control- border-0 p-2 bg-color text-white rounded-5 fw-medium"
        type="button"
        value="Buscar aventura"
        onClick={handleClickIniciarSesion}
      />
    </div>
  );
};

export default MisViajes;
