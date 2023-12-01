import React, { useEffect, useState } from 'react';

// Components
import Headers from '../../admin-options/admin-options-components/Headers';
import Input from '../admin-options-components/insputs/Input';
import BtnAction from '../admin-options-components/insputs/BtnAction';

// Firebase
import {
  getAppNames,
  setAppNames,
} from '../../../firebase/admin-option/app-options/appName';

const ChangeAppName = () => {
  const [nombreCorto, setNombreCorto] = useState('');
  const [nombreLargo, setNombreLargo] = useState('');

  useEffect(() => {
    const f = async () => {
      const res = await getAppNames();
      console.log(res);

      if (res) {
        console.log('first');
        setNombreCorto(res.nombreCorto);
        setNombreLargo(res.nombreLargo);
      }
    };
    f();
  }, []);

  const handleClickGuardarNombres = async () => {
    if (nombreCorto.length <= 3 || nombreLargo.length <= 3) {
      alert('Los nombres deben de tener por lo menos 3 caracteres');
      return;
    }

    const res = await setAppNames({ nombreCorto, nombreLargo });
    if (res) alert('Nombres actualizados');
    else alert('Ha ocurrido un error');
  };

  return (
    <>
      <Headers text="Giras Realizadas" link={-1} />
      <div className="my-4">
        {/* <div className="d-flex flex-column gap-2">
          <label className="fw-medium" htmlFor="nombre-largo">
            Nombre largo:
          </label>
          <input
            id="nombre-largo"
            placeholder="Nombre completo de la app"
            className="bg-transparent border rounded-3 p-2 text-black"
            type="text"
          />
        </div> */}
        <Input
          id="nombre-corto"
          label="Nombre corto de app"
          value={nombreCorto}
          placeholder="Cambiar nombre corto de app"
          handleChange={(value) => setNombreCorto(value)}
        />
        <Input
          id="nombre-largo"
          label="Nombre largo de app"
          value={nombreLargo}
          placeholder="Cambiar nombre largo de app"
          handleChange={(value) => setNombreLargo(value)}
        />

        <BtnAction
          text="Guardar configuracion"
          action={handleClickGuardarNombres}
        />
        {/* Input = ({
  id,
  label,
  type = 'text',
  i,
  value,
  placeholder,
  minLength = 3,
  handleChange,
}) */}
      </div>
    </>
  );
};

export default ChangeAppName;
