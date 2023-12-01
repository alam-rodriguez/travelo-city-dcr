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
// import ReservacionItem from './giras-reservaciones-components/ReservacionP';

// import ReservationItem from './giras-reservaciones-components/ReservationItem';
// import { useAlerts } from '../../../../zustand/alerts/alerts';
// import { updateReservation } from '../../../../firebase/firestoreGiras/reservations/reservations';
// import { getImage } from '../../../../firebase/firestoreGiras/imagenesGira';

const MiGiraDetailed = () => {
  const {
    reservationSelected: reservacionSelecionada,
    setReservationSelected,
    reservationsImages,
    addReservationImage,
  } = useInfoUser();

  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

  const { reservationId } = useParams();

  // const { reservacionSelecionada } = useReservacionesGiras();

  // const { reservacionesImages, addReservacionImage } = useReservacionesGiras();

  const [canCancel, setCanCancel] = useState(false);

  const setCanCancelFunc = (dateLimit) => {
    const dateActual = new Date().getTime();
    console.log(dateActual);
    console.log(dateLimit);
    if (dateActual < dateLimit) setCanCancel(true);
    else setCanCancel(false);
  };

  const getReservation = async () => {
    const res = await getReservationsById(reservationId);
    if (res != false) {
      console.log(res);
      setCanCancelFunc(res.giraDateLimitForCancelInMilliseconds);
      setReservationSelected(res);
    }
  };

  useEffect(() => {
    if (reservacionSelecionada.reservationId == undefined) getReservation();

    setCanCancelFunc(
      reservacionSelecionada.giraDateLimitForCancelInMilliseconds,
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
  }, [reservacionSelecionada]);

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

  const handleClickCancelarReservacion = async () => {
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
    const reservationUpdated = {
      reservationId: reservacionSelecionada.reservationId,
      state: 'Cancelada',
    };
    waitingAlert('Cancelando reservacion...');
    const resReser = await updateReservation(reservationUpdated);
    if (resReser)
      successAlert(
        'Reservacion actualizada',
        'La reservacion fue cancelada correctamente.',
      );
    else
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
    if (resReser)
      successAlert(
        'Reservacion actualizada',
        'La reservacion fue cancelada correctamente.',
      );
    else
      errorAlert(
        'Error',
        'Ha ocurrido un error al intentar cancelar la reservacion, por favor revisa tu conexion a internet.',
      );
  };

  const [wantUpNewImage, setWantUpNewImage] = useState(false);

  const setTrueWantUpNewImage = () => setWantUpNewImage(true);

  const setFalseWantUpNewImage = () => setWantUpNewImage(false);

  const uploadNewImage = async () => {
    const wantUploadImage = await ask({
      title: 'Confirmar reservacion',
      text: 'Estas seguro de que quieres confirmar la reservacion, esto solo debe hacerse si realmente el usuario ha pagado la reservacion.',
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

    if (res && resImage) successAlert('Imagen subida exitosamente');
    else errorAlert('Error al subir imagen, intentelo de nuevo');

    // console.log(imgTransaccion);

    // console.log();

    // console.log('hola');
  };

  if (reservacionSelecionada.reservationId == undefined)
    return <>Cargando...</>;

  return (
    <>
      <Headers text="Reservacion" link="/mis-giras" />
      <div
        className="border-bottom-border-danger border-5- my-5 pb-0"
        // onClick={() => handleClick(id)}
      >
        <ReservacionP head="Fecha Gira:" value={reservacionSelecionada.date} />
        <ReservacionP
          head="Fecha escrita:"
          value={reservacionSelecionada.horaGira}
        />

        <ReservacionP
          head="Metodo de pago:"
          value={reservacionSelecionada.methodOfPay}
        />
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
        <ReservacionP
          head="Precio cada adulto:"
          value={reservacionSelecionada.adultPrice}
        />
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
        {reservacionSelecionada.pointsUsed > 0 ? (
          <ReservacionP
            head="Puntos usados:"
            value={reservacionSelecionada.pointsUsed}
          />
        ) : (
          <></>
        )}
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
                <button
                  className="bg-success border-0 p-2 px-4 rounded-3 fw-medium"
                  onClick={setTrueWantUpNewImage}
                >
                  Cambiar imagen
                </button>
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
