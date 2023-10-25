// Components
import BtnOptions from '../admin-options-components/BtnOptions';
import Headers from '../admin-options-components/Headers';

const OpcionesGiras = () => {
  return (
    <>
      <Headers text="Opciones para giras" link="/admin-options" />

      <div className="d-flex gap-4 my-5 flex-wrap justify-content-between">
        <BtnOptions text="Crear gira" link="/admin-options/create-gira" />
        <BtnOptions text="Editar gira" link="/admin-options/giras-editar" />
        <BtnOptions text="Relanzar gira" link="/admin-options/giras-relanzar" />
        <BtnOptions
          text="Giras activas"
          link="/admin-options/list-giras-activas"
        />
        <BtnOptions
          text="Giras realizadas"
          link="/admin-options/list-giras-realizadas"
        />
        <BtnOptions
          text="Giras archivadas"
          link="/admin-options/list-giras-archivadas"
        />
        <BtnOptions
          text="Todos mis viajes"
          link="/admin-options/list-all-giras"
        />
      </div>
    </>
  );
};

export default OpcionesGiras;
