// Components
import BtnOptions from '../admin-options-components/BtnOptions';
import Headers from '../admin-options-components/Headers';

const OpcionesReservacionesGiras = () => {
  return (
    <>
      <Headers text="Opciones para reservaciones" link="/admin-options" />

      <div className="d-flex gap-4 my-5 flex-wrap justify-content-between">
        <BtnOptions
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
        />
        <BtnOptions
          text="Reservaciones canceladas"
          link="/admin-options/list-reservaciones-canceladas-giras-activas"
        />
        <BtnOptions
          text="Reservaciones canceladas de giras realizadas"
          link="/admin-options/list-all-giras-reservations"
        />
        <BtnOptions
          text="Reservaciones canceladas de giras archivadas"
          link="/admin-options/list-all-giras-reservations"
        />
      </div>
    </>
  );
};

export default OpcionesReservacionesGiras;
