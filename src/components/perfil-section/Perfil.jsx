import React, { useEffect } from 'react';

// Icon
import { BiSolidComment, BiSolidUser } from 'react-icons/bi';
import {
  MdLocalOffer,
  MdMonetizationOn,
  MdOutlineHelp,
  MdPayment,
} from 'react-icons/md';
import { IoMdMail, IoMdNotifications } from 'react-icons/io';
import { RiSettings3Fill } from 'react-icons/ri';

// Components
import PerfilInfo from './perfil-components/PerfilInfo';
import PerfilOption from './perfil-components/PerfilOption';
import BtnSignOut from './perfil-components/BtnSignOut';
import { useInfoPeople } from '../../zustand/giras/giras';
import {
  existUser,
  getUserInfo,
  setUserInfo,
} from '../../firebase/users/users';
import { useInfoUser } from '../../zustand/user/user';
import { useInfoApp } from '../../zustand/admin/app/app';
import { getBadgesAndPointsOptions } from '../../firebase/admin-option/app-options/pointsSettings';

// image
import imageCandado from '../../assets/images/imageCandado.png';
import {
  signInWithGoogle,
  signOutFirebase,
} from '../../firebase/authentication/authWithGoogle';
import { useAlerts } from '../../zustand/alerts/alerts';
import { useNavigate } from 'react-router-dom';

// Firebase
// import { signOut } from '../../firebase/authentication/authWithGoogle';

const Perfil = () => {
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
  } = useInfoUser();

  // Alerts
  const { ask, successAlert, errorAlert, waitingAlert } = useAlerts();

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

  // useEffect(() => {
  //   console.log(badges);
  //   if (hasInfo) return;
  //   const f = async () => {
  //     const res = await getBadgesAndPointsOptions();
  //     if (res != false) {
  //       setSettingsBadgesAndPoints(res);
  //     }
  //     console.log(res);
  //   };
  //   f();
  // }, []);
  useEffect(() => {
    console.log(badge);
    if (!hasInfo || !haveUserInfo) return;

    calcBadge(moneySpent, badges);
  }, [hasInfo, haveUserInfo]);

  // const calcBadge = (num, badges) => {
  //   console.log(badges);
  //   console.log(num);
  //   let badgeSelected = {};
  //   badges.forEach((badge, i) => {
  //     if (num >= badge.minMoney) {
  //       if (i == 0) badgeSelected = badge;
  //       else if (i == badge.length) badgeSelected == badge;
  //       else badgeSelected = badges[i];
  //     }
  //     return;
  //   });
  //   console.log(badgeSelected);
  //   console.log(badges[4 - 1]);
  //   return badgeSelected;
  // };

  const handleClickIniciarSesion = async () => {
    waitingAlert('Iniciando sesion');
    // const email = await signInWithGoogle();
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
      // navigate('/');
      window.location.reload();
      // window.scrollTo({ top: 0, behavior: 'instant' });
    } else errorAlert('Ha ocurrido un error al intentar iniciar sesion.');

    console.log(email);

    // if (infoUser != false) {
    //   setEmail(infoUser.email);
    //   setId(infoUser.id);
    // }

    // if (resUserInfo)
    //   successAlert('Registrado', 'Te haz registrado correctamente.');
    // else errorAlert('Error', 'Ha ucurrido un error al intentar registrarte');
  };

  const cerrarSeccion = async () => {
    const wantCerrarSeccion = await ask({
      title: 'Quieres cerrar la sesion?',
      text: 'Estas realmente seguro de que quieres cerrar la sesion ?',
      confirmButtonText: 'Cerrar sesion',
    });
    if (!wantCerrarSeccion.isConfirmed) return;
    waitingAlert('Cerrando sesion...');
    const res = await signOutFirebase();
    if (res) {
      await successAlert('Has cerrado sesion correctamente.');
      navigate('/');
      window.location.reload();
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else errorAlert('Ha ocurrido un error al intentar cerrar sesion.');
  };

  if (type == '') return <></>;
  if (type == 'anonymous') {
    return (
      <div className="d-flex flex-column gap-3">
        <hr />

        <h1>Perfil</h1>

        <div className="d-flex justify-content-center">
          <img className="" src={imageCandado} style={{ width: '35%' }} />
        </div>

        <input
          className="form-control bg-primary text-white rounded-5"
          type="button"
          value="Iniciar sesion o crear una cuenta"
          onClick={handleClickIniciarSesion}
        />

        <input
          className="form-control bg-transparent fw-bold py-3 rounded-3"
          type="button"
          value="No tienes una cuenta?"
        />
      </div>
    );
  }

  return (
    <div className="py-5 bg-light-">
      <PerfilInfo
        name={name}
        email={email}
        points={pointsEarned - pointsSpent}
        badge={badge.badge}
      />

      <p className="my-4" style={{ fontSize: 14 }}>
        Administra tu perfil, tus recompensas y tus referencias en un solo
        lugar.
      </p>

      <PerfilOption
        icon={<BiSolidUser className="fs-3" />}
        text="Perfil"
        link="/perfil/profile"
      />

      <PerfilOption
        icon={<IoMdNotifications className="fs-3" />}
        text="Perfil"
        link="/notificaciones"
      />

      <PerfilOption
        icon={<IoMdMail className="fs-3" />}
        text="Comunicaciones"
        link="/perfil/communications"
      />

      <PerfilOption
        icon={<MdPayment className="fs-3" />}
        text="Pagos"
        link="/perfil/Payments"
      />

      <PerfilOption
        icon={<MdLocalOffer className="fs-3" />}
        text="Cupones"
        link="/perfil/coupons"
      />

      <PerfilOption
        icon={<MdMonetizationOn className="fs-3" />}
        text="Creditos"
        link="/perfil/credits"
      />
      <PerfilOption
        icon={<BiSolidComment className="fs-3" />}
        text="Opiniones"
        link="/perfil/reviews"
      />

      <PerfilOption
        icon={<RiSettings3Fill className="fs-3" />}
        text="Ajustes"
        link="/perfil/settings"
      />
      <PerfilOption
        icon={<MdOutlineHelp className="fs-3" />}
        text="Ayuda y comentarios"
        link="/perfil/help-and-feedback"
      />

      <BtnSignOut cerrarSeccion={cerrarSeccion} />

      <p
        className="text-center text-secondary fw-light"
        style={{ fontSize: 10 }}
      >
        Desarrollado por Alam Rodriguez
      </p>
    </div>
  );
};

export default Perfil;
