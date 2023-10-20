import React from 'react';

// image
import imageCandado from '../../assets/images/imageCandado.png';

// Firebase
import { signInWithGoogle } from '../../firebase/authentication/authWithGoogle';

const MisViajes = () => {
  const handleClickIniciarSesion = async () => {
    const email = await signInWithGoogle();
    console.log(email);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <hr />

      {/* <div className='text-center border-bottom pb-3'></div> */}

      <h1>Viajes</h1>

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
};

export default MisViajes;
