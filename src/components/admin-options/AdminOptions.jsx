import React, { useEffect } from 'react';
import Headers from './admin-options-components/Headers';
import BtnOptions from './admin-options-components/BtnOptions';

// Zustand
import { useInfoUser } from '../../zustand/user/user';
import { useNavigate } from 'react-router-dom';

const AdminOptions = () => {
  const { type } = useInfoUser();

  return (
    <>
      <Headers text="Opciones de admin" link="/" />

      <div className="d-flex gap-4 my-5 flex-wrap justify-content-between">
        {type == 'admin' ? (
          <BtnOptions
            text="Opciones de aplicacion"
            link="/admin-options/opciones-app"
          />
        ) : null}

        {type == 'admin' ? (
          <BtnOptions
            text="Opciones para giras"
            link="/admin-options/opciones-giras"
          />
        ) : null}

        <BtnOptions
          text="Opciones para reservaciones"
          link="/admin-options/opciones-reservaciones-giras"
        />

        {type == 'admin' ? (
          <BtnOptions
            text="Opciones para sugerencias"
            link="/admin-options/opciones-sugerencias"
          />
        ) : null}

        <BtnOptions
          text="Opciones para comentarios de giras"
          link="/admin-options/opciones-comentarios-giras"
        />
        {type == 'admin' ? (
          <BtnOptions
            text="Opciones para estadisticas"
            link="/admin-options/opciones-estadisticas-giras"
          />
        ) : null}

        {/* <BtnOptions text="Crear gira" link="/admin-options/create-gira" />
        <BtnOptions text="Editar gira" link="/admin-options/giras-editar" />
        <BtnOptions text="Relanzar gira" link="/admin-options/giras-editar" /> */}
        {/* <BtnOptions
          text="Reservaciones giras"
          link="/admin-options/list-giras-for-reservations"
        />

        <BtnOptions
          text="Reservaciones giras realizadas"
          link="/admin-options/list-giras-done-for-reservations"
        />
        <BtnOptions
          text="Todas las reservaciones"
          link="/admin-options/list-all-giras-reservations"
        /> */}
        {/* <BtnOptions
          text="Giras archivadas"
          link="/admin-options/list-giras-archivadas"
        />
        <BtnOptions
          text="Todos mis viajes"
          link="/admin-options/giras-editar"
        /> */}

        {/* <BtnOptions
          text="Crear sugerencia"
          link="/admin-options/crear-sugerencia"
        /> */}

        {/* <BtnOptions
          text="Estadisticas giras activas"
          link="/admin-options/list-giras-for-stadisticas"
        />
        <BtnOptions
          text="Estadisticas de giras realizadas"
          link="/admin-options/list-giras-done-for-stadisticas"
        />
        <BtnOptions
          text="Estadisticas de usuarios"
          link="/admin-options/crear-sugerencia"
        />
        <BtnOptions
          text="Todas las estadisticas"
          link="/admin-options/crear-sugerencia"
        /> */}
      </div>
    </>
  );
};

export default AdminOptions;
