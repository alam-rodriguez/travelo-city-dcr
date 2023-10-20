// Components
import BtnOptions from '../admin-options-components/BtnOptions';
import Headers from '../admin-options-components/Headers';

const opcionesSugerencias = () => {
  return (
    <>
      <Headers text="Opciones para sugerencias" link="/admin-options" />

      <div className="d-flex gap-4 my-5 flex-wrap justify-content-between">
        <BtnOptions
          text="Crear sugerencia"
          link="/admin-options/crear-sugerencia"
        />
        <BtnOptions
          text="Editar sugerencia"
          link="/admin-options/editar-sugerencia"
        />
      </div>
    </>
  );
};

export default opcionesSugerencias;
