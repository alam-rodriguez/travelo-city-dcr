import React, { useEffect } from 'react';

// Components
import NameApp from '../../inicio/NameApp';

// Firebase
import { signInWithGoogle } from '../../../firebase/authentication/authWithGoogle';
import { setUserInfo } from '../../../firebase/users/users';
import {
  addAdmin,
  getAdmins,
} from '../../../firebase/admin-option/app-options/signInAdmins';

// Hooks
import useAdmin from '../../../hooks/app/admin/useAdmin';

const SignInLikeSemiAdmin = () => {
  const { passwordForSignIn } = useAdmin();

  useEffect(() => {
    passwordForSignIn();
  }, []);

  const handleClickIniciarSesionLikeAdmin = async () => {
    // waitingAlert('Iniciando sesion');
    // const email = await signInWithGoogle();

    // if (email != false) {
    //   await successAlert('Has iniciado sesion correctamente.');
    //   // navigate('/');
    //   window.location.reload();
    //   // window.scrollTo({ top: 0, behavior: 'instant' });
    // } else errorAlert('Ha ocurrido un error al intentar iniciar sesion.');

    // console.log(email);

    const admins = {
      admins: [],
      semiAdmins: [],
    };

    const adminsOfBd = await getAdmins();
    if (adminsOfBd == false) {
      alert('Error');
      return;
    }
    if (adminsOfBd != 'sin-admins') {
      admins.admins = adminsOfBd.admins;
      admins.semiAdmins = adminsOfBd.semiAdmins;
    }
    if (admins.semiAdmins.length >= 5) {
      alert('No pueden haber mas semi admins');
      return;
    }

    const infoUser = await signInWithGoogle();

    let estaRegistrado = false;

    admins.admins.forEach((admin) => {
      console.log(admin);
      if (infoUser.email == admin) estaRegistrado = true;
    });
    admins.semiAdmins.forEach((admin) => {
      console.log(admin);
      console.log(infoUser.email);
      if (infoUser.email == admin) {
        console.log('s');
        estaRegistrado = true;
      }
    });

    console.log(estaRegistrado);

    if (estaRegistrado == true) {
      console.log('first');
      alert('Ya estas registrado, no puedes volverlo a hacer');
      return;
    }

    const resUserInfo = await setUserInfo({
      email: infoUser.email,
      id: infoUser.id,
      moneySpent: 0,
      name: '',
      number: 0,
      pointsEarned: 0,
      pointsSpent: 0,
      type: 'semi-admin',
      favoritesGiras: [],
      notisGiras: true,
      notisSugerencias: true,
      notisReservations: true,
      notisGeneral: true,
    });

    admins.semiAdmins = [...admins.semiAdmins, infoUser.email];

    console.log(admins);

    const res = await addAdmin(admins);

    if (resUserInfo && res) alert('Registrado como semi admin');
    else alert('Ha ocurrido un error');
  };

  return (
    <div className="pt-4">
      <NameApp />
      <p className="my-5 fw-medium fs-4">
        Esta parte de la app es totalmente privada y no debe de ser compartida
        con nadie de lo contrario estaria poniendo en peligro los datos de los
        usuarios
      </p>

      <button
        className="w-100 bg-color border-0 rounded-3 p-2 fs-4"
        onClick={handleClickIniciarSesionLikeAdmin}
      >
        Iniciar sesion como semi Admin
      </button>
    </div>
  );
};

export default SignInLikeSemiAdmin;
