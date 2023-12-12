import React from 'react';
import { useInfoApp } from '../../zustand/admin/app/app';

const CopyRigthText = () => {
  const { nameAppLarge, nameAppShort } = useInfoApp();

  return (
    <p className="text-secondary my-5" style={{ fontSize: 10 }}>
      {nameAppShort} inc. no es responsable del contenido de webs externas. ©
      2024 {nameAppShort}, inc., una empresa de grupo {nameAppShort}. Todos los
      derechos reservados. {nameAppShort} y logotipos son marcas comerciales
      registradas en {nameAppShort}, inc.
    </p>
  );
};

export default CopyRigthText;
