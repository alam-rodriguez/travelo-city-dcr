import React from 'react';

// Zustand
import { useInfoPeople } from '../../../../../zustand/giras/giras';

const CompletarReservacion = ({
  nameAndSurname,
  number,
  adultosNames,
  childrenNames,
  bebiesNames,
  userLogged,
  registrarUser,
}) => {
  // const { personAcountInfo, setNameAndSurname } = useInfoPeople();

  return (
    <div className="bg-white shadow p-3 my-3">
      <p>
        Al hacer click en el boton de abajo, acepto que revise el aviso de
        privacidad y las alestar de vieje del gobierno. Tambien acepto que
        revise y estoy de acuerdo con las normas y restricciones, y los terminos
        de uso.
      </p>
      {!userLogged ? (
        <button
          className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
          onClick={registrarUser}
          type="submit"
        >
          Registrar usuario
        </button>
      ) : (
        <button
          className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
          // onClick={handleClickCompletarReservacion}
          type="submit"
        >
          Completar reservacion
        </button>
      )}
    </div>
  );
};

export default CompletarReservacion;
