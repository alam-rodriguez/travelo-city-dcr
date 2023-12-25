// Components
import BtnOptions from '../admin-options-components/BtnOptions';
import Headers from '../admin-options-components/Headers';

const OpcionesApp = () => {
  return (
    <>
      <Headers text="Opciones de la aplicacion" link="/admin-options" />

      <div className="d-flex gap-4 my-5 flex-wrap justify-content-between">
        <BtnOptions
          text="Cambiar nombre de la app"
          link="/admin-options/opciones-app/change-name-app"
        />
        {/* <BtnOptions
          text="Opciones de puntos"
          link="/admin-options/opciones-app/opciones-puntos"
        /> */}
        <BtnOptions
          text="Configuracion de puntos y insignias"
          link="/admin-options/opciones-app/opciones-insignias-y-puntos"
        />
        <BtnOptions
          text="Configuracion de contacto y cuentas bancarias"
          link="/admin-options/opciones-app/contact-and-banks-accounts"
        />
        {/* <BtnOptions
          text="Estadisticas de giras realizadas"
          link="/admin-options/list-giras-done-for-stadisticas"
        />
        <BtnOptions
          text="Estadisticas de usuarios"
          link="/admin-options/opciones-estadisticas-giras/estadisticas-usuarios"
        />
        <BtnOptions
          text="Todas las estadisticas"
          link="/admin-options/opciones-estadisticas-giras/todas-las-estadisticas"
        />
        <BtnOptions
          text="Estadisticas de giras por grupos"
          link="/admin-options/opciones-estadisticas-giras/todas-las-estadisticas"
        /> */}
      </div>
    </>
  );
};

export default OpcionesApp;
