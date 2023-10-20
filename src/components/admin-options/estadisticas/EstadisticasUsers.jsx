import React from 'react';

// Components
import Headers from '../admin-options-components/Headers';
import PreviewEstadisticasUser from '../admin-options-components/estadisticas/PreviewEstadisticasUser';

const EstadisticasUsers = () => {
  return (
    <>
      <Headers
        text="Estadisticas de usuarios"
        link="/admin-options/opciones-estadisticas-giras/"
      />

      <PreviewEstadisticasUser
        nombre="Alam Rodriguez"
        email="alamrd2016@gmail.com"
        telefono={123456789}
        dineroGastado="12000"
        reservacionesActivas={2}
        reservacionesPasadas={24}
        puntos={12500}
        insignia="pasajero de plata"
      />
    </>
  );
};

export default EstadisticasUsers;
