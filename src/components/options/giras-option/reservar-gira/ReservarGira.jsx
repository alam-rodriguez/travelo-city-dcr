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
  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

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
    const pointsNeeded =
      countPersons * giraSelected.pointsAndBadgesSettings.priceAdultInPoint +
      countChildren * giraSelected.pointsAndBadgesSettings.priceChildInPoint +
      countBabies * giraSelected.pointsAndBadgesSettings.priceBabyInPoint;

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
        else badgeSelected = badges[i - 1];
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
    console.log(badges[4 - 1]);
    return badgeSelected;
  };

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
    setDiscountPercentWithBadge(badge.discountRate);
    setDiscountPercentWithPoints(descuento);
    setPointsHasToSpent(PointsHasToSpent);
    // setDiscount(descuento + badge.discountRate);

    console.log((total / 100) * descuento);
    setDiscountInMoney((total / 100) * descuento);

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

    calcDiscount();

    console.log(goToUsePoints);

    // console.log(calcularDescuento());
    // console.log(calcBadge(moneySpent, badges));
    // setDiscount();

    // return;

    if (methodOfPay == 'tarjeta' && imgTransaccion.name == undefined) {
      alert('Debes de agregar una imagen');
      return;
    }

    const date = getDay();
    const dateDetailed = new Date();
    const dateInMilliseconds = dateDetailed.getTime();
    const hour = getHour();

    const result =
      methodOfPay == 'efectivo'
        ? await ask({
            title: '¿Quieres reservar esta gira?',
            text: '¿Estas seguro de que quieres hacer esta reservar? si aceptas le avisaremos a nuestros administradores y te contactaremos para comfirmar tu reservacion.',
            confirmButtonText: 'Recervar',
          })
        : methodOfPay == 'tarjeta'
        ? await ask({
            title: '¿Quieres reservar esta gira?',
            text: '¿Estas seguro de que quieres hacer esta reservar? si aceptas le enviaremos la imagen a los administradores para que comprueven que realmente realizaste el pago.',
            confirmButtonText: 'Recervar',
          })
        : methodOfPay == 'points'
        ? await ask({
            title: '¿Quieres reservar esta gira?',
            text: '¿Estas seguro de que quieres hacer esta reservar? Esta reservacion la realizaras con algunos de tus puntos, y si luego quieres cancelar la reservacion no recuperaras tus puntos.',
            confirmButtonText: 'Recervar',
          })
        : null;

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
        bankSelected,

        usePoints: methodOfPay == 'points' ? goToUsePoints : false,
        discountPercentWithPoints: activePoints ? discountPercentWithPoints : 0,
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
        discountInMoney: goToUsePoints ? discountInMoney : 0,
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
          giraSelected.pointsAndBadgesSettings.priceAdultInPoint;
        const pointsForChild =
          giraSelected.pointsAndBadgesSettings.priceChildInPoint;
        const pointsForBaby =
          giraSelected.pointsAndBadgesSettings.priceBabyInPoint;
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
        await successAlert(
          'Reservacion realizada exitosamente',
          'Tu reservacion fue creada y enviada a nuestros administradores, te estaremos contactando para confirmar tu reservacion.',
        );
        setReservationIsDone(true);
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
      moneySpent: 0,
      name: '',
      number: 0,
      pointsEarned: 0,
      pointsSpent: 0,
      type: 'customer',
    });

    if (infoUser != false) {
      setEmail(infoUser.email);
      setId(infoUser.id);
    }
    if (resUserInfo) {
      console.log('usuario registrado');
    }
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

        <AlertDaysLeft dateInMilliseconds={giraSelected.dateInMilliseconds} />

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
          banksCountsNumbers={banksCountsNumbers}
          imgTransaccion={imgTransaccion}
          setImgTransaccion={setImgTransaccion}
          discount={discountPercentWithBadge + discountPercentWithPoints}
        />

        <ImportantInformationSection />

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
              countPersons *
                giraSelected.pointsAndBadgesSettings.priceAdultInPoint +
              countChildren *
                giraSelected.pointsAndBadgesSettings.priceChildInPoint +
              countBabies *
                giraSelected.pointsAndBadgesSettings.priceBabyInPoint
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
