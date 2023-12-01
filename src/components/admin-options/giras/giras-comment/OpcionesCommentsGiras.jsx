// Components
import BtnOptions from '../../admin-options-components/BtnOptions';
import Headers from '../../admin-options-components/Headers';

const OpcionesCommentsGiras = () => {
  return (
    <>
      <Headers text="Opciones para comentarios" link="/admin-options" />

      <div className="d-flex gap-4 my-5 flex-wrap justify-content-between">
        <BtnOptions text="Comentarios giras" link="" />
      </div>
    </>
  );
};

export default OpcionesCommentsGiras;
