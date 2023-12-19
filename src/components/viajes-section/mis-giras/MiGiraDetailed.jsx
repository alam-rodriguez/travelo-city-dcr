import React, { useEffect, useState } from 'react';

// React-router-dom
import { useNavigate, useParams } from 'react-router-dom';

// Zusttand
// import { useGiras } from '../../../../zustand/giras/giras';
// import { girasListForAdmin } from '../../../../zustand/admin/girasAdmin';

// Components
import Headers from '../../admin-options/admin-options-components/Headers';
import ReservacionP from '../../admin-options/giras/giras-reservaciones/giras-reservaciones-components/ReservacionP';
// import ListGiras from '../giras-components/giras/ListGiras';
// import { getAllGiras } from '../../../../firebase/firestoreGiras/giras';
// import { getReservationGira } from '../../../../firebase/firestoreGiras/reservations';
import { useReservacionesGiras } from '../../../zustand/admin/giras/giras-reservaciones/reservacionesGiras';
import { useInfoUser } from '../../../zustand/user/user';
import { getImage } from '../../../firebase/firestoreGiras/imagenesGira';
import { useAlerts } from '../../../zustand/alerts/alerts';
import {
  getReservationsById,
  updateReservation,
} from '../../../firebase/firestoreGiras/reservations/reservations';
import MetodoPagoSeccion from '../../options/giras-option/reservar-gira/reservar-gira-components/MetodoPagoSeccion';
import { useInfoPeople } from '../../../zustand/giras/giras';
import ChangeImage from './components/ChangeImage';
import { uploadImageReservationGira } from '../../../firebase/firestoreGiras/reservations/reservationsImages';
import MiGiraDetailedCharging from './MiGiraDetailedCharging';
import { getUserInfo, updateUserInfo } from '../../../firebase/users/users';
import { useInfoApp } from '../../../zustand/admin/app/app';
// import ReservacionItem from './giras-reservaciones-components/ReservacionP';

// import ReservationItem from './giras-reservaciones-components/ReservationItem';
// import { useAlerts } from '../../../../zustand/alerts/alerts';
// import { updateReservation } from '../../../../firebase/firestoreGiras/reservations/reservations';
// import { getImage } from '../../../../firebase/firestoreGiras/imagenesGira';

const MiGiraDetailed = () => {
  const navigate = useNavigate();

  const { badges, sendEmailToAdmins, nameAppLarge } = useInfoApp();

  const {
    reservationSelected: reservacionSelecionada,
    setReservationSelected,
    reservationsImages,
    addReservationImage,
    haveUserInfo,
    id,
    email,
    badge,
    // calcBadge,
    moneySpent,
    setEmail,
    setName,
    setNumber: setNumberBd,
    pointsEarned,
    pointsSpent,
    setMoneySpent,
    setPointsEarned,
    setPointsSpent,
    deleteReservationImage,
  } = useInfoUser();

  // useEffect(() => {
  //   console.log(reservacionSelecionada.email);
  //   console.log(email);
  //   if (!haveUserInfo) return;
  //   // console.warn(email);
  //   // console.log(reservacionSelecionada.email);
  //   if (reservacionSelecionada.email == undefined || email == '') return;
  //   if (email != reservacionSelecionada.email) navigate('/mis-giras');
  // }, [email, reservacionSelecionada]);

  useEffect(() => {
    if (haveUserInfo || id == '' || reservacionSelecionada.email == undefined)
      return;

    const f = async () => {
      console.log('obteniendo user de BD');

      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        setName(res.name);
        setEmail(res.email);
        setNumberBd(res.number);
        setMoneySpent(res.moneySpent);
        setPointsEarned(res.pointsEarned);
        setPointsSpent(res.pointsSpent);
        // console.log(reservacionSelecionada);
        // if (res.email != reservacionSelecionada.email) navigate('/mis-giras');
      }
      console.warn(res);
    };
    f();
  }, [id]);

  const {
    ask,
    successAlert,
    errorAlert,
    waitingAlert,
    infoAlert,
    warningAlert,
  } = useAlerts();

  const { reservationId } = useParams();

  // const { reservacionSelecionada } = useReservacionesGiras();

  // const { reservacionesImages, addReservacionImage } = useReservacionesGiras();

  const [canCancel, setCanCancel] = useState(false);

  const setCanCancelFunc = (dateLimit, isConfirmByAdmin, isPutInStatistics) => {
    console.log(isPutInStatistics);
    console.log(isConfirmByAdmin);
    const dateActual = new Date().getTime();
    console.log(dateActual);
    console.log(dateLimit);
    if (dateLimit < dateActual && !isConfirmByAdmin && isPutInStatistics) {
      setCanCancel(true);
    } else setCanCancel(false);
  };

  useEffect(() => {
    console.log(reservacionSelecionada);
    if (reservacionSelecionada.reservationId != undefined) return;
    const getReservation = async () => {
      const res = await getReservationsById(reservationId);
      if (res != false) {
        console.log(res);
        setCanCancelFunc(
          res.giraDateLimitForCancelInMilliseconds,
          res.isConfirmByAdmin,
          res.isPutInStatistics,
        );
        setReservationSelected(res);
      }
    };
    getReservation();
  }, [reservacionSelecionada]);

  useEffect(() => {
    setCanCancelFunc(
      reservacionSelecionada.giraDateLimitForCancelInMilliseconds,
      reservacionSelecionada.isConfirmByAdmin,
      reservacionSelecionada.isPutInStatistics,
    );

    console.log(reservationId);
    console.log(reservacionSelecionada);
    // console.log(currentId);
    // console.log(idReservationSeleted);
    // console.log(reservacionSelecionada);
    // console.log(reservacionSelecionada.imageTransactionPath);
    if (
      reservacionSelecionada.imageTransactionPath == null ||
      reservationsImages[reservationId] != undefined
    )
      return;
    console.log('buscando imagen');
    const f = async () => {
      const imgLink = await getImage(
        reservacionSelecionada.imageTransactionPath,
      );
      addReservationImage(reservationId, imgLink);
      console.log('reservationId');
      console.log(imgLink);
    };
    f();
  }, [reservacionSelecionada, reservationsImages]);

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
    // calcBadge,
    methodOfPay,
    setMethodOfPay,
    methodOfPayWhenUsePoints,
    setMethodOfPayWhenUsePoints,
    bankSelected,
    setBankSelected,
    banksCountsNumbers,
    imgTransaccion,
    setImgTransaccion,
    goToUsePoints,
    setGoToUsePoints,
  } = useInfoPeople();

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (reservacionSelecionada.GiraDateInMilliseconds == undefined) return;
    const fechaActual = new Date().getTime();
    const diferenciaEnMilisegundos =
      reservacionSelecionada.GiraDateInMilliseconds - fechaActual;
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    setDaysLeft(Math.trunc(diferenciaEnDias));
  }, [reservacionSelecionada]);

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
    console.log(badges[4 - 1]);
    return badgeSelected;
  };

  const handleClickCancelarReservacion = async () => {
    if (reservacionSelecionada.state == 'Cancelada') {
      // alert('Ya esta reservacion fue cancelada');
      infoAlert(
        'No puedes cancelar',
        'No puedes cancelar esta reservacion porque ya esta cancelada',
      );
      return;
    }

    const res = await ask({
      title: 'Cancelar reservacion',
      text:
        reservacionSelecionada.status == 'Pagado'
          ? 'Estas seguro de que quieres cancelar la reservacion. Le vamos a avisar al administrador para que te devuelva tu el dinero.'
          : 'Estas seguro de que quieres cancelar la reservacion ?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });

    if (!res.isConfirmed) return;
    waitingAlert('Cancelando reservacion...');
    const reservationUpdated = {
      reservationId: reservacionSelecionada.reservationId,
      isPutInStatistics: false,
      state: 'Cancelada',
    };
    const resReser = await updateReservation(reservationUpdated);

    // const newInfoUser = {
    //   id: id,
    //   moneySpent: moneySpent - reservacionSelecionada.total,
    //   pointsEarned: pointsEarned - reservacionSelecionada.pointsEarned,
    //   pointsSpent: pointsSpent - reservacionSelecionada.pointsUsed,
    // };

    // console.log(newInfoUser);
    // const resUserInfo = await updateUserInfo(newInfoUser);

    if (resReser) {
      await successAlert(
        'Reservacion actualizada',
        'La reservacion fue cancelada correctamente.',
      );
      setReservationSelected({});
      sendEmailToAdmins(
        'Nueva reservacion de gira',
        `Hay una nueva reservacion en ${nameAppLarge}, entra a la app para la reservacion de ${reservacionSelecionada.userName}`,
      );
    } else
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
    if (resReser) {
      await successAlert(
        'Reservacion actualizada',
        'La reservacion fue cancelada correctamente.',
      );
      setReservationSelected({});
    } else
      errorAlert(
        'Error',
        'Ha ocurrido un error al intentar cancelar la reservacion, por favor revisa tu conexion a internet.',
      );
  };

  const [wantUpNewImage, setWantUpNewImage] = useState(false);

  const setTrueWantUpNewImage = () => setWantUpNewImage(true);

  const setFalseWantUpNewImage = () => setWantUpNewImage(false);

  const uploadNewImage = async () => {
    if (imgTransaccion.name == undefined) {
      warningAlert('imagen necesaria', 'Debes de poner la imagen del recibo.');
      return;
    }
    const wantUploadImage = await ask({
      title: 'Mandar imagen',
      text: 'Estas seguro de que quieres mandar la imagen, le notificaremos a nuestros administradores para que vean el recibo.',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
    if (!wantUploadImage.isConfirmed) return;
    waitingAlert('Subiendo imagen...');

    const reservationUpdate = {
      reservationId: reservacionSelecionada.reservationId,
      bankSelected: bankSelected,
      imageTransactionPath: `reservationsGiras/${reservacionSelecionada.reservationId}`,
      reservacionPagada: true,
      state:
        reservacionSelecionada.methodOfPay != 'points'
          ? 'Pago con tarjeta'
          : 'Pagado con puntos y tarjeta',
    };
    // methodOfPayWhenUsePoints == 'tarjeta' &&
    // discountPercentWithBadge + discountPercentWithPoints >= 100 &&
    // goToUsePoints
    //   ? 'Pagado con puntos'
    //   : discountPercentWithBadge + discountPercentWithPoints > 0 &&
    //     goToUsePoints &&
    //     methodOfPayWhenUsePoints == 'tarjeta'
    //   ? 'Pagado con puntos y tarjeta'
    //   : discountPercentWithBadge + discountPercentWithPoints > 0 &&
    //     goToUsePoints &&
    //     methodOfPayWhenUsePoints == 'efectivo'
    //   ? 'Adelanto realizado con Puntos'
    //   : methodOfPay == 'tarjeta'
    //   ? 'Pago con tarjeta'
    //   : 'Pendiente',

    // const

    const res = await updateReservation(reservationUpdate);

    let resImage = true;
    if (imgTransaccion.name != undefined)
      resImage = await uploadImageReservationGira(
        'reservationsGiras',
        reservacionSelecionada.reservationId,
        imgTransaccion,
      );

    console.log(reservacionSelecionada);

    if (res && resImage) {
      await successAlert('Imagen subida exitosamente');
      deleteReservationImage(reservationId);
      setReservationSelected({});
      setWantUpNewImage(false);
      sendEmailToAdmins(
        methodOfPay == 'efectivo'
          ? 'Nueva transferencia de reservacion'
          : 'Nuevan imagen de comprobante',
        methodOfPay == 'efectivo'
          ? `${reservacionSelecionada.userName} ha pagado su reservacion con una transferencia en ${nameAppLarge}`
          : `${reservacionSelecionada.userName} ha cambiado la imagen de su reservacion en ${nameAppLarge}`,
      );
    } else errorAlert('Error al subir imagen, intentelo de nuevo');

    // console.log(imgTransaccion);

    // console.log();

    // console.log('hola');
  };

  if (reservacionSelecionada.reservationId == undefined)
    return <MiGiraDetailedCharging />;

  return (
    <>
      <Headers text="Reservacion" link="/mis-giras" />
      <div
        className="border-bottom-border-danger border-5- my-5 pb-0"
        // onClick={() => handleClick(id)}
      >
        <ReservacionP head="Fecha Gira:" value={reservacionSelecionada.date} />
        <ReservacionP head="Hora:" value={reservacionSelecionada.horaGira} />
        <ReservacionP
          head="Dias restante:"
          value={
            daysLeft > 0
              ? `${daysLeft} dias`
              : daysLeft == 0
              ? 'La gira es hoy'
              : 'La gira paso'
          }
        />
        {/* <ReservacionP
          head="Metodo de pago:"
          value={reservacionSelecionada.methodOfPay}
        /> */}
        {reservacionSelecionada.methodOfPay == 'tarjeta' ? (
          <ReservacionP
            head="Banco utilizado:"
            value={reservacionSelecionada.bankSelected}
          />
        ) : (
          <></>
        )}
        {reservacionSelecionada.pointsEarned > 0 ? (
          <ReservacionP
            head="Puntos ganados:"
            value={reservacionSelecionada.pointsEarned}
          />
        ) : (
          <></>
        )}
        <ReservacionP
          head="Pago completado:"
          value={reservacionSelecionada.reservacionPagada ? 'Si' : 'No'}
        />
        {/* <ReservacionP
          head="Precio cada adulto:"
          value={reservacionSelecionada.adultPrice}
        /> */}
        {reservacionSelecionada.pointsUsed > 0 ? (
          <ReservacionP
            head="Puntos usados:"
            value={reservacionSelecionada.pointsUsed + ' puntos'}
          />
        ) : (
          <></>
        )}
        {reservacionSelecionada.discountPercentWithBadge > 0 ? (
          <ReservacionP
            head="Porcentaje de descuento por insignia:"
            value={reservacionSelecionada.discountPercentWithBadge + ' %'}
          />
        ) : null}

        {reservacionSelecionada.discountPercentWithPoints > 0 ? (
          <ReservacionP
            head="Porcentaje de descuento por puntos:"
            value={reservacionSelecionada.discountPercentWithPoints + ' %'}
          />
        ) : null}
        {reservacionSelecionada.discountPercentWithBadge > 0 &&
        reservacionSelecionada.discountPercentWithPoints > 0 ? (
          <ReservacionP
            head="Porcentaje total de descuento:"
            value={
              reservacionSelecionada.discountPercentWithBadge +
              reservacionSelecionada.discountPercentWithPoints +
              ' %'
            }
          />
        ) : null}

        <ReservacionP
          head="Estado de reservacion:"
          value={reservacionSelecionada.state}
        />
        {Object.keys(reservacionSelecionada.adultsNames).length > 0 ||
        Object.keys(reservacionSelecionada.childrenNames).length > 0 ||
        Object.keys(reservacionSelecionada.bebiesNames).length > 0 ? (
          <p className="m-0 text-center fw-bold">acompañantes:</p>
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

        {/* <ReservacionP
          head="Descuento total:"
          value={
            reservacionSelecionada.discountPercentWithBadge +
            reservacionSelecionada.discountPercentWithPoints +
            ' %'
          }
        /> */}
        {reservacionSelecionada.discountInMoney > 0 ? (
          <ReservacionP
            head="Descuento en dinero:"
            value={reservacionSelecionada.discountInMoney}
          />
        ) : null}

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
              src={reservationsImages[reservacionSelecionada.reservationId]}
              className="w-100 object-fit-contain border border-success border-4"
              // style={{ height: '300px' }}
              alt=""
            />
          </div>
        ) : (
          <></>
        )}
        {wantUpNewImage ? (
          <ChangeImage
            total={reservacionSelecionada.total}
            banksCountsNumbers={banksCountsNumbers}
            bankSelected={bankSelected}
            setBankSelected={setBankSelected}
            imgTransaccion={imgTransaccion}
            setImgTransaccion={setImgTransaccion}
          />
        ) : (
          <></>
        )}
        {/* {wantUpNewImage ? (
          <MetodoPagoSeccion
            total={reservacionSelecionada.total}
            totalWithDiscount={
              reservacionSelecionada.total -
              reservacionSelecionada.discountInMoney
            }
            methodOfPay={methodOfPay}
            setMethodOfPay={setMethodOfPay}
            methodOfPayWhenUsePoints={methodOfPayWhenUsePoints}
            setMethodOfPayWhenUsePoints={setMethodOfPayWhenUsePoints}
            bankSelected={bankSelected}
            setBankSelected={setBankSelected}
            banksCountsNumbers={banksCountsNumbers}
            imgTransaccion={imgTransaccion}
            setImgTransaccion={setImgTransaccion}
            discount={
              reservacionSelecionada.discountPercentWithBadge +
              reservacionSelecionada.discountPercentWithPoints
            }
          />
        ) : (
          <></>
        )} */}
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
          {!wantUpNewImage ? (
            <>
              {canCancel ? (
                <button
                  className="bg-danger border-0 p-2 rounded-3 fw-medium"
                  onClick={handleClickCancelarReservacion}
                >
                  Cancelar reservacion
                </button>
              ) : (
                <></>
              )}
              {!reservacionSelecionada.isConfirmByAdmin ? (
                (reservacionSelecionada.methodOfPay == 'efectivo' &&
                  reservacionSelecionada.state != 'Cancelada') ||
                (reservacionSelecionada.methodOfPay == 'points' &&
                  reservacionSelecionada.methodOfPayWhenUsePoints ==
                    'efectivo') ? (
                  <button
                    className="bg-success border-0 p-2 px-4 rounded-3 fw-medium"
                    onClick={setTrueWantUpNewImage}
                  >
                    Realizar transferencia
                  </button>
                ) : reservacionSelecionada.discountInMoney <
                    reservacionSelecionada.total &&
                  reservacionSelecionada.state != 'Cancelada' ? (
                  <button
                    className="bg-success border-0 p-2 px-4 rounded-3 fw-medium"
                    onClick={setTrueWantUpNewImage}
                  >
                    Cambiar imagen
                  </button>
                ) : null
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <button
                className="bg-danger border-0 p-2 rounded-3 fw-medium"
                onClick={setFalseWantUpNewImage}
              >
                No subir imagen
              </button>
              <button
                className="bg-success border-0 p-2 px-4 rounded-3 fw-medium"
                onClick={uploadNewImage}
              >
                Subir imagen
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MiGiraDetailed;

{
  /* <button
  className="bg-color border-0 p-2 rounded-3 fw-medium"
  onClick={handleClickConfirmarReservacion}
>
  Confirmar reservacion
</button> */
}
