import React, { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

// Zustand
import {
  useGiras,
  useInfoPeople,
  useViewSeleccionarPersonas,
} from '../../../../zustand/giras/giras';
import { useAlerts } from '../../../../zustand/alerts/alerts';
import { useInfoUser } from '../../../../zustand/user/user';

// Firebase
import { createReservationGira } from '../../../../firebase/firestoreGiras/reservations/reservations';
import { signInWithGoogle } from '../../../../firebase/authentication/authWithGoogle';
import {
  existUser,
  getUserInfo,
  setUserInfo,
  updateUserInfo,
} from '../../../../firebase/users/users';
import { uploadImageReservationGira } from '../../../../firebase/firestoreGiras/reservations/reservationsImages';

// Components
import HeaderReserveGira from './reservar-gira-components/HeaderReserveGira';
import FreeCancelationSection from './reservar-gira-components/FreeCancelationSection';
import AlertDaysLeft from './reservar-gira-components/AlertDaysLeft';
import WhoTravelSection from './reservar-gira-components/WhoTravelSection';
import ImportantInformationSection from './reservar-gira-components/ImportantInformationSection';
import CompletarReservacion from './reservar-gira-components/CompletarReservacion';
import Accordings from './reservar-gira-components/Accordings';
import MetodoPagoSeccion from './reservar-gira-components/MetodoPagoSeccion';
import { getBadgesAndPointsOptions } from '../../../../firebase/admin-option/app-options/pointsSettings';
import { useInfoApp } from '../../../../zustand/admin/app/app';
import MetodoPagarConPuntos from './reservar-gira-components/MetodoPagarConPuntos';
import { useNavigate } from 'react-router-dom';
import ReservationDone from './reservar-gira-components/ReservationDone';

const ReservarGira = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (giraSelected.id == undefined) {
      navigate('/giras');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    // const points =
    //   50 *
    //   (countPersons * giraSelected.prices.adult +
    //     countChildren * giraSelected.prices.child +
    //     countBabies * giraSelected.prices.baby);

    console.log(
      countPersons * giraSelected.prices.adult +
        countChildren * giraSelected.prices.child +
        countBabies * giraSelected.prices.baby,
    );
    // console.log(points);
  }, []);

  const {
    nameAppLarge,
    hasInfo,
    activePoints,
    costo: costPoints,
    valuePoint,
    activeBadges,
    setActiveBadges,
    badges,
    addBadge,
    deleteLastBadges,
    editBadgeName,
    editBadgeMinMoney,
    editBadgeDiscountRate,
    setSettingsBadgesAndPoints,
    sendEmailToAdmins,
    numberApp,
    emailApp,
    banksAccounts,
  } = useInfoApp();

  useEffect(() => {
    console.log(badges);
    if (hasInfo) return;
    const f = async () => {
      const res = await getBadgesAndPointsOptions();
      if (res != false) {
        setSettingsBadgesAndPoints(res);
      }
      console.log(res);
    };
    f();
  }, []);

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
    moneySpent,
    setMoneySpent,
    pointsEarned,
    setPointsEarned,
    pointsSpent,
    setPointsSpent,
    badge: badgeUser,
    setBadge,

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
    resetReservations,
    setReservationSelected,
    resetInfoUser,
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
      if (id == '') return;
      const res = await getUserInfo(id);
      console.log(res);
      if (res != false) {
        setNameUser(res.name);
        setNameAndSurname(res.name);
        setNumberUser(res.number);
        setNumber(res.number);
        setMoneySpent(res.moneySpent);
        setPointsEarned(res.pointsEarned);
        setPointsSpent(res.pointsSpent);
        // console.log(res);
        // setBadge(res.badge);
      }
      console.warn(res);
    };
    f();
  }, []);

  const { giraSelected } = useGiras();
  // Alerts
  const { ask, successAlert, errorAlert, waitingAlert, warningAlert } =
    useAlerts();

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    if (!haveUserInfo) return;
    calcDiscount();
  }, [pointsEarned, pointsSpent]);
  // useEffect(
  //   () => alert(`Puesdes ahorrarte ${discountInMoney} pesos en esta gira`),
  //   [discountInMoney],
  // );

  useEffect(() => {
    console.log(discountInMoney);
  }, [discountInMoney]);

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
    console.log(fechaEspecifica);
    console.log(giraSelected.dateInMilliseconds);
    const diferenciaEnMilisegundos = fechaEspecifica - fechaActual;
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    console.log(diferenciaEnDias);
    setDaysLeft(Math.floor(diferenciaEnDias));
    console.log(`La diferencia es de ${diferenciaEnDias} días.`);
  }, []);

  const { countPersons, countChildren, countBabies, resetSeleccionarPersonas } =
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
    reset,
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

  const calcularDescuento = () => {
    let descuento = 0;
    let PointsHasToSpent = 0;
    // console.log(giraSelected.pointsAndBadgesSettings);
    // const pointsNeeded =
    //   countPersons * giraSelected.pointsAndBadgesSettings.priceAdultInPoint +
    //   countChildren * giraSelected.pointsAndBadgesSettings.priceChildInPoint +
    //   countBabies * giraSelected.pointsAndBadgesSettings.priceBabyInPoint;
    const total =
      countPersons * giraSelected.prices.adult +
      countChildren * giraSelected.prices.child +
      countBabies * giraSelected.prices.baby;

    const pointsNeeded =
      total * giraSelected.pointsAndBadgesSettings.priceInPoint;

    console.log(pointsNeeded);

    const PointsRes = pointsEarned - pointsSpent;
    // console.log(pointsEarned);
    // console.log(pointsSpent);
    // console.log(PointsRes);
    console.log(giraSelected.pointsAndBadgesSettings);
    if (!giraSelected.pointsAndBadgesSettings.activeDiscountWithPoints) {
      if (PointsRes >= pointsNeeded) {
        console.log('first');
        descuento = 100;
        PointsHasToSpent = pointsNeeded;
      }
    } else {
      if (PointsRes >= pointsNeeded) {
        descuento = 100;
        PointsHasToSpent = pointsNeeded;
      } else if (PointsRes >= (pointsNeeded / 100) * 75) {
        descuento = 75;
        PointsHasToSpent = (pointsNeeded / 100) * 75;
      } else if (PointsRes >= (pointsNeeded / 100) * 50) {
        descuento = 50;
        PointsHasToSpent = (pointsNeeded / 100) * 50;
      } else if (PointsRes >= (pointsNeeded / 100) * 25) {
        descuento = 25;
        PointsHasToSpent = (pointsNeeded / 100) * 25;
      } else {
        descuento = 0;
        PointsHasToSpent = 0;
      }
    }

    console.log({ descuento, PointsHasToSpent });
    return { descuento, PointsHasToSpent };
  };

  const calcBadge = (num, badges) => {
    console.log(badges);
    console.log(num);
    let badgeSelected = {};
    badges.forEach((badge, i) => {
      if (num >= badge.minMoney) {
        if (i == 0) badgeSelected = badge;
        else if (i == badge.length) badgeSelected == badge;
        else badgeSelected = badges[i];
        // i == 0
        //   ? (badgeSelected = badge)
        //   : i == badge.length
        //   ? badgeSelected == badge
        //   : (badgeSelected = badges[i - 1]);
        // badgeSelected = badges[i - 1];
        // console.log(badges[i - 1]);
        // console.log(badges[i]);
      }
      return;
    });
    console.log(badgeSelected);
    // console.log(badges[4 - 1]);
    return badgeSelected;
  };

  useEffect(() => {
    if (giraSelected.id == undefined) return;
    calcDiscount();
  }, [methodOfPay]);

  const calcDiscount = () => {
    const total =
      countPersons * giraSelected.prices.adult +
      countChildren * giraSelected.prices.child +
      countBabies * giraSelected.prices.baby;

    // console.log(total);

    const { descuento, PointsHasToSpent } = calcularDescuento();
    console.log(descuento);
    const badge = calcBadge(moneySpent, badges);
    setBadge(badge);
    console.log(badge);
    // console.log();
    if (activeBadges) setDiscountPercentWithBadge(badge.discountRate);
    if (activePoints) setDiscountPercentWithPoints(descuento);
    setPointsHasToSpent(PointsHasToSpent);
    // setDiscount(descuento + badge.discountRate);

    console.log(badge.discountRate);

    console.log((total / 100) * descuento + badge.discountRate);
    setDiscountInMoney(
      (total / 100) *
        (methodOfPay == 'points'
          ? descuento + badge.discountRate
          : 0 + activeBadges
          ? badge.discountRate
          : 0),
    );

    console.log(
      (total / 100) *
        (methodOfPay == 'points'
          ? descuento
          : 0 + activeBadges
          ? badge.discountRate
          : 0),
    );

    console.log(descuento + badge.discountRate);
    // setDiscount();
  };

  // const [sugerenciaId, setSugerenciaId] = useState();
  const [reservationId, setReservationId] = useState();

  const [reservationIsDone, setReservationIsDone] = useState(false);

  const handleClickCompletarReservacion = async (e) => {
    e.preventDefault();

    const total =
      countPersons * giraSelected.prices.adult +
      countChildren * giraSelected.prices.child +
      countBabies * giraSelected.prices.baby;

    const totalWithDiscount =
      countPersons * giraSelected.prices.adult +
      countChildren * giraSelected.prices.child +
      countBabies * giraSelected.prices.baby -
      discountInMoney;

    calcDiscount();

    console.log(goToUsePoints);

    // console.log(calcularDescuento());
    // console.log(calcBadge(moneySpent, badges));
    // setDiscount();

    // return;

    if (methodOfPay == 'tarjeta' && imgTransaccion.name == undefined) {
      warningAlert(
        'Imagen necesaria',
        'Tienes que poner una imagen del recibo del deposito para comprobar que pagaste.',
      );
      return;
    }

    // if (methodOfPay == '') {
    //   alert('Debes de seleccionar un metodo de pago');
    //   return;
    // }

    const date = getDay();
    const dateDetailed = new Date();
    const dateInMilliseconds = dateDetailed.getTime();
    const hour = getHour();

    const result =
      methodOfPay == 'efectivo'
        ? await ask({
            title: '¿Quieres reservar esta gira?',
            text: '¿Estas seguro de que quieres hacer esta reservar? si aceptas le avisaremos a nuestros administradores y te contactaremos para comfirmar tu reservacion.',
            confirmButtonText: 'Reservar',
          })
        : methodOfPay == 'tarjeta'
        ? await ask({
            title: '¿Quieres reservar esta gira?',
            text: '¿Estas seguro de que quieres hacer esta reservar? si aceptas le enviaremos la imagen a los administradores para que comprueven que realmente realizaste el pago.',
            confirmButtonText: 'Reservar',
          })
        : methodOfPay == 'points'
        ? await ask({
            title: '¿Quieres reservar esta gira?',
            text: '¿Estas seguro de que quieres hacer esta reservar? Esta reservacion la realizaras con algunos de tus puntos, y si luego quieres cancelar la reservacion no recuperaras tus puntos.',
            confirmButtonText: 'Reservar',
          })
        : null;

    console.log(methodOfPay);

    console.log(result);

    console.log(result.isConfirmed);
    if (!result.isConfirmed) return;
    waitingAlert(
      methodOfPay == 'tarjeta' ||
        (methodOfPay == 'points' && methodOfPayWhenUsePoints == 'tarjeta')
        ? 'Enviando reservacion y imagen de recibo...'
        : 'Enviando reservacion...',
    );

    const promise = new Promise(async (resolve, reject) => {
      console.log(date);
      // console.log(giraSelected);

      const idReservation = uuid();
      setReservationId(idReservation);

      console.log(badgeUser);

      console.log(activePoints);

      const totalGira = goToUsePoints
        ? countPersons * giraSelected.prices.adult +
          countChildren * giraSelected.prices.child +
          countBabies * giraSelected.prices.baby -
          discountInMoney
        : countPersons * giraSelected.prices.adult +
          countChildren * giraSelected.prices.child +
          countBabies * giraSelected.prices.baby;

      const pointsEarnedForThisGira = activePoints ? totalGira * costPoints : 0;

      console.log(giraSelected);

      const reserve = {
        reservationId: idReservation,
        userId: id,
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
        GiraDateInMilliseconds: giraSelected.dateInMilliseconds,
        giraDateLimitForCancelInMilliseconds:
          giraSelected.dateLimitForCancelInMilliseconds,
        horaGira: `${giraSelected.hourInformation.hour ?? 0}:${
          giraSelected.hourInformation.minute ?? 0
        } ${giraSelected.hourInformation.amORpm}`,

        adultsNames: adultosNames,
        adultPrice: giraSelected.prices.adult,

        childrenNames: childrenNames,
        childrenPrice: giraSelected.prices.child,

        bebiesNames: bebiesNames,
        bebiesPrice: giraSelected.prices.baby,

        methodOfPay,
        methodOfPayWhenUsePoints:
          methodOfPay == 'points' ? methodOfPayWhenUsePoints : '',
        bankSelected,

        usePoints: methodOfPay == 'points' ? goToUsePoints : false,
        discountPercentWithPoints:
          activePoints && methodOfPay == 'points'
            ? discountPercentWithPoints
            : 0,
        discountPercentWithBadge: activeBadges ? discountPercentWithBadge : 0,
        pointsUsed: methodOfPay == 'points' ? pointsHasToSpent : 0,

        imageTransactionPath:
          methodOfPay == 'tarjeta' ||
          (methodOfPay == 'points' && methodOfPayWhenUsePoints == 'tarjeta')
            ? `reservationsGiras/${idReservation}`
            : null,
        reservacionPagada:
          methodOfPay == 'tarjeta' ||
          (methodOfPay == 'points' && methodOfPayWhenUsePoints == 'tarjeta') ||
          (methodOfPay == 'points' && discountInMoney >= total)
            ? true
            : false,
        total: total,
        discountInMoney: discountInMoney,
        state:
          methodOfPayWhenUsePoints == 'tarjeta' &&
          discountPercentWithBadge + discountPercentWithPoints >= 100 &&
          goToUsePoints
            ? 'Pagado con puntos'
            : discountPercentWithBadge + discountPercentWithPoints > 0 &&
              goToUsePoints &&
              methodOfPayWhenUsePoints == 'tarjeta'
            ? 'Pagado con puntos y tarjeta'
            : discountPercentWithBadge + discountPercentWithPoints > 0 &&
              goToUsePoints &&
              methodOfPayWhenUsePoints == 'efectivo'
            ? 'Adelanto realizado con Puntos'
            : methodOfPay == 'tarjeta'
            ? 'Pago con tarjeta'
            : 'Pendiente',

        // discountPercentWithBadge + discountPercentWithPoints >= 100
        //   ? 'Pagado con puntos'
        //   : methodOfPay == 'tarjeta'
        //   ? 'Pago con tarjeta'
        //   : goToUsePoints && methodOfPay == 'tarjeta'
        //   ? 'Pagado con puntos y tarjeta'
        //   : 'Pendiente',

        pointsEarned: pointsEarnedForThisGira,
        isPutInStatistics: true,
        isConfirmByAdmin: false,
      };
      console.log(discountPercentWithPoints);

      const res = await createReservationGira(reserve);

      let resImage = true;
      if (imgTransaccion.name != undefined)
        resImage = await uploadImageReservationGira(
          'reservationsGiras',
          idReservation,
          imgTransaccion,
        );

      // const pointsforGira = totalGira * 50;

      const badge = {};

      if (activePoints) {
        // pointsEarnedForThisGira = totalGira * valuePoint;
        const pointsForAdult =
          giraSelected.pointsAndBadgesSettings.priceInPoint;
        const pointsForChild =
          giraSelected.pointsAndBadgesSettings.priceInPoint;
        const pointsForBaby = giraSelected.pointsAndBadgesSettings.priceInPoint;
        const pointsEarnedForThisGira =
          countPersons * pointsForAdult +
          countChildren * pointsForChild +
          countBabies * pointsForBaby;
      }

      console.log(pointsEarnedForThisGira);

      const newInfoUser = {
        email: email,
        id: id,
        name: nameAndSurname,
        number,
        moneySpent: moneySpent + totalGira,
        pointsEarned: activePoints
          ? pointsEarned + pointsEarnedForThisGira
          : pointsEarned,
        pointsSpent:
          methodOfPay == 'points'
            ? pointsSpent + pointsHasToSpent
            : pointsSpent,
        // badge: calcBadge(moneySpent + totalGira),
      };
      const gg = calcBadge(newInfoUser.moneySpent, badges);
      console.log(gg);
      console.log(newInfoUser);

      const resUserInfo = await updateUserInfo(newInfoUser);

      if (resUserInfo) {
        console.log('info actualizada');
      }
      // const res = true;
      if (res && resImage && resUserInfo) resolve();
      else reject();
    });
    promise
      .then(async () => {
        successAlert(
          'Reservacion realizada exitosamente',
          'Tu reservacion fue creada y enviada a nuestros administradores, te estaremos contactando para confirmar tu reservacion.',
        );
        setReservationSelected({});
        resetSeleccionarPersonas();
        resetReservations();
        setReservationIsDone(true);
        resetInfoUser();
        reset();

        sendEmailToAdmins(
          'Nueva reservacion de gira',
          `Hay una nueva reservacion en ${nameAppLarge}, entra a la app para la reservacion de ${nameAndSurname}`,
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
        notisGiras: true,
        notisSugerencias: true,
        notisReservations: true,
        notisGeneral: true,
      });

    if (infoUser != false) {
      setEmail(infoUser.email);
      setId(infoUser.id);
    }

    if (resUserInfo && resUserInfo)
      successAlert('Registrado', 'Te haz registrado correctamente.');
    else errorAlert('Error', 'Ha ucurrido un error al intentar registrarte');
  };

  const alertDeDescuento = () => {
    const points = pointsEarned - pointsSpent;
    alert(
      `Tienes ${points} puntos, asi que los puedes utilizar para obtener un 50% de descuento, asi que solo tendrias que pagar 2500 pesos, tu decides si utilizar tus puntos para esta gira.`,
    );
    setGoToUsePoints(true);
  };

  useEffect(() => {
    console.log(discountPercentWithBadge);
    console.log(discountPercentWithPoints);
  }, [discountPercentWithBadge, discountPercentWithPoints]);

  if (reservationIsDone)
    return (
      <ReservationDone
        tituloGira={giraSelected.title}
        reservationId={reservationId}
        fechaGira={giraSelected.date}
        horaGira={`${giraSelected.hourInformation.hour}:${giraSelected.hourInformation.minute} ${giraSelected.hourInformation.amORpm}`}
        timeGira={giraSelected.duration}
        traverlers={countPersons + countChildren + countBabies}
        lugarEncuentro={giraSelected.meetingPoint}
      />
    );

  const enviarNotificacionDePedido = () => {
    // let volver = false;

    for (const key in adminsTokens) {
      console.log(key);

      if (adminsTokens[key] == 'sin-token') {
        // volver = true;
        console.log(adminsTokens[key]);
        const response = fetch(
          'https://server-to-send-mails.vercel.app/send-email',
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: key,
              subject: 'Hay un nuevo pedido!!!!!!!!!!',
              text: 'Hay un nuevo pedido tienes que entrar a la app',
            }),
          },
        );

        response
          .then((res) => res.json())
          .then((res2) => {
            console.warn(res2);
          })
          .catch((e) => {
            console.log('Error');
            console.log(e);
          });

        // return;
      } else {
        // if(volver){
        //   return;
        // }
        // console.log(key, adminsTokens[key]);

        const notificationData = {
          notification: {
            title: 'Hay un nuevo pedido',
            body: 'Hay un nuevo pedido tienes que entrar a la app',
            click_action: 'https://example.com/URL-de-tu-sitio',
          },
          to: adminsTokens[key],
        };

        const headers = {
          Authorization: `Bearer AAAAQzkXViU:APA91bF3r-zFyoUMjw2mn5oQSbpCSF-bSakDFQ_a8avWBeul37SqSxE551h5wNnsSvzsdK6nv0XZXUWQvcn-Z-EyKBbj9v9i8PlC4vxmsCcUNBotjd2RfrSKqqmUTTxSbMZAGmP0tAiw`,
          'Content-Type': 'application/json',
        };

        fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(notificationData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Respuesta de la API:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  };

  if (giraSelected.id == undefined) return <></>;
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
          discountInMoney={discountInMoney}
          description={giraSelected.description}
          title={giraSelected.title}
          duracion={giraSelected.duration}
          city={giraSelected.city}
          date={giraSelected.date}
          location={giraSelected.location}
        />

        <p className="m-0 mt-3">
          Las tarifas se muestran en{' '}
          <span className="fw-bold">pesos dominicanos.</span>
        </p>

        <AlertDaysLeft dateInMilliseconds={giraSelected.dateInMilliseconds} />

        <WhoTravelSection
          descripcion={giraSelected.description}
          date={giraSelected.date}
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

        <MetodoPagoSeccion
          total={
            countPersons * giraSelected.prices.adult +
            countChildren * giraSelected.prices.child +
            countBabies * giraSelected.prices.baby
          }
          totalWithDiscount={
            countPersons * giraSelected.prices.adult +
            countChildren * giraSelected.prices.child +
            countBabies * giraSelected.prices.baby -
            discountInMoney
          }
          methodOfPay={methodOfPay}
          setMethodOfPay={setMethodOfPay}
          methodOfPayWhenUsePoints={methodOfPayWhenUsePoints}
          setMethodOfPayWhenUsePoints={setMethodOfPayWhenUsePoints}
          bankSelected={bankSelected}
          setBankSelected={setBankSelected}
          // banksCountsNumbers={banksCountsNumbers}
          banksCountsNumbers={banksAccounts}
          imgTransaccion={imgTransaccion}
          setImgTransaccion={setImgTransaccion}
          badge={badgeUser.badge}
          discountPercentWithBadge={discountPercentWithBadge}
          discountPercentWithPoints={discountPercentWithPoints}
          discount={discountPercentWithBadge + discountPercentWithPoints}
          activePoints={activePoints}
          calcDiscount={calcDiscount}
        />

        <ImportantInformationSection
          description={giraSelected.description}
          city={giraSelected.city}
          date={giraSelected.date}
          usefulInformation={giraSelected.utilInformation}
        />

        {methodOfPay != 'points' ? (
          <CompletarReservacion
            nameAndSurname={nameAndSurname}
            number={number}
            adultosNames={adultosNames}
            childrenNames={childrenNames}
            bebiesNames={bebiesNames}
            userLogged={userLogged}
            registrarUser={registrarUser}
            setGoToUsePoints={() => setGoToUsePoints(false)}
          />
        ) : (
          <></>
        )}

        {/* {discountPercentWithBadge + discountPercentWithPoints > 0 &&
        (activePoints || activeBadges) ? ( */}
        {methodOfPay == 'points' ? (
          <MetodoPagarConPuntos
            points={pointsEarned - pointsSpent}
            goToUsePoints={goToUsePoints}
            setGoToUsePoints={() => setGoToUsePoints(true)}
            pointsNeeded={
              (countPersons * giraSelected.prices.adult +
                countChildren * giraSelected.prices.child +
                countBabies * giraSelected.prices.baby) *
              giraSelected.pointsAndBadgesSettings.priceInPoint
            }
            calcDiscount={calcDiscount}
            discount={discountPercentWithBadge + discountPercentWithPoints}
            discountPercentWithBadge={discountPercentWithBadge}
            discountPercentWithPoints={discountPercentWithPoints}
            total={
              countPersons * giraSelected.prices.adult +
              countChildren * giraSelected.prices.child +
              countBabies * giraSelected.prices.baby -
              discountInMoney
            }
          />
        ) : (
          <></>
        )}
      </form>
    </>
  );
};

export default ReservarGira;
