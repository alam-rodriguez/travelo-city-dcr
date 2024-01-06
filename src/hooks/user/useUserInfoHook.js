import React from 'react';
// import { useInfoUser } from '../../zustand/user/user';
import {
  existUser,
  getUserInfo,
  setUserInfo,
  updateUserInfo,
} from '../../firebase/users/users';
import { useInfoUser } from '../../zustand/user/user';
import { useAlerts } from '../../zustand/alerts/alerts';
import { signInWithGoogle } from '../../firebase/authentication/authWithGoogle';
import { getAllGiras } from '../../firebase/firestoreGiras/giras';

const useUserInfoHook = () => {
  const {
    haveUserInfo,
    setInfoUser,
    id,
    favoritesGirasId,
    setFavoritesGirasId,
    allGiras,
    setAllGiras,
    favoritesGiras,
    setFavoritesGiras,
  } = useInfoUser();

  const { waitingAlert, successAlert, errorAlert, infoAlert } = useAlerts();

  const setUserInfoFunc = async () => {
    console.log('first');
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
        favoritesGiras: [],
        notisGiras: true,
        notisSugerencias: true,
        notisReservations: true,
        notisGeneral: true,
      });

    if (infoUser != false && resUserInfo) {
      await successAlert('Has iniciado sesion correctamente.');
      // navigate('/');
      window.location.reload();
      // window.scrollTo({ top: 0, behavior: 'instant' });
    } else errorAlert('Ha ocurrido un error al intentar iniciar sesion.');

    console.log(email);
  };
  const getUserInfoFunc = async () => {
    if (haveUserInfo || id == '') return;
    const res = await getUserInfo(id);
    console.log(res);
    if (res != false) {
      setInfoUser(res);
      console.log(res);
    }
    console.warn(res);
  };

  const addOrDeleteFaboriteGira = async (currentGiraId) => {
    if (!haveUserInfo) {
      infoAlert(
        'Para agregar esta gira a favoritas debes de iniciar sesion en la app.',
      );
      return;
    }
    console.log(favoritesGirasId);
    const newIds = [...favoritesGirasId];
    if (newIds.includes(currentGiraId)) {
      let indice = newIds.findIndex((item) => item === currentGiraId);
      newIds.splice(indice, 1);
    } else newIds.push(currentGiraId);
    setFavoritesGirasId(newIds);
    console.log(newIds);
    const res = await updateUserInfo({ id, favoritesGiras: newIds });
    console.log(res);
  };

  const getFavoritesGiras = async () => {
    const giras = await getAllGiras();
    setAllGiras(giras);
    const favoritesGiras = [];
    console.log(favoritesGirasId);
    giras.forEach((gira) => {
      console.log(gira);
      if (favoritesGirasId.includes(gira.currentId)) {
        console.log('first');
        favoritesGiras.push(gira);
      }
    });
    console.log(favoritesGirasId);
    setFavoritesGiras(favoritesGiras);
    console.log(favoritesGiras);
  };

  return {
    getUserInfoFunc,
    setUserInfoFunc,
    addOrDeleteFaboriteGira,
    getFavoritesGiras,
  };
};

export default useUserInfoHook;
