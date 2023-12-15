// Components
import BtnOptions from '../admin-options-components/BtnOptions';
import Headers from '../admin-options-components/Headers';

const OpcionesEstadisticasGiras = () => {
  return (
    <>
      <Headers text="Opciones para estadisticas" link="/admin-options" />

      <div className="d-flex gap-4 my-5 flex-wrap justify-content-between">
        <BtnOptions
          text="Estadisticas giras activas"
          link="/admin-options/list-giras-for-stadisticas"
        />
        <BtnOptions
          text="Estadisticas de giras realizadas"
          link="/admin-options/estadisticas-giras-realizadas"
        />
        <BtnOptions
          text="Estadisticas de giras archivadas"
          link="/admin-options/estadisticas-giras-archivadas"
        />
        <BtnOptions
          text="Estadisticas de todas las giras"
          link="/admin-options/estadisticas-all-giras"
        />
        <BtnOptions
          text="Estadisticas de usuarios"
          link="/admin-options/opciones-estadisticas-giras/estadisticas-usuarios"
        />
        <BtnOptions
          text="Estadisticas filtrada por fechas"
          link="/admin-options/opciones-estadisticas-giras/todas-las-estadisticas"
        />
        <BtnOptions
          text="Estadisticas de giras por grupos"
          link="/admin-options/opciones-estadisticas-giras/giras-por-grupos"
        />
      </div>
    </>
  );
};

export default OpcionesEstadisticasGiras;
