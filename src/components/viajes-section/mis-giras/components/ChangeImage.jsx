import React, { useRef } from 'react';

// Icon
import { RiImageAddFill } from 'react-icons/ri';

const ChangeImage = ({
  total,
  banksCountsNumbers,
  bankSelected,
  setBankSelected,
  imgTransaccion,
  setImgTransaccion,
}) => {
  const inputAddImage = useRef(null);

  const handleClickSelecImage = () => inputAddImage.current.click();

  const handleChangeBank = (e) => setBankSelected(e.target.value);

  const handleChangeImage = (e) => setImgTransaccion(e.target.files[0]);

  return (
    <div className="bg-white shadow my-3 p-3">
      <div className="my-3">
        <p className="mb-1 fw-medium">Selecciona en banco que vas a utilizar</p>
        <select
          className="bg-transparent w-100 border rounded-3 text-black rounded-1 p-2"
          onChange={handleChangeBank}
        >
          <option value="banreservas">Banco BANRESERVAS</option>
          <option value="popular">Banco POPULAR</option>
          <option value="bhd">Banco BHD</option>
          <option value="scotiabank">Banco SCOTIABANK</option>
        </select>
      </div>
      <p className="m-0 fw-medium">
        Numero de cuenta:{' '}
        <span className="fw-bold text-decoration-underline color-1">
          {banksCountsNumbers[bankSelected]}
        </span>
      </p>
      <p className="m-0 fw-medium">
        Total a pagar: <span className="fw-bold">{total}</span>
      </p>

      <div
        className="d-flex flex-column justify-content-center align-items-center p-1 my-3"
        style={{ height: 250, border: 'dashed 3px black' }}
        onClick={handleClickSelecImage}
      >
        {imgTransaccion.name == undefined ? (
          <>
            <p className="m-0 mx-5 text-center">
              Pongo aqui una foto de tu recibo para realizar tu reservacion
            </p>
            <RiImageAddFill className="display-1" />
          </>
        ) : (
          <img
            className="w-100 h-100 object-fit-contain"
            src={URL.createObjectURL(imgTransaccion)}
          />
        )}
        <input
          ref={inputAddImage}
          onChange={handleChangeImage}
          hidden
          type="file"
        />
      </div>
      <hr />
      <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
        Esta imagen solo se utilizara para comprobar que realizaste tu pedido,
        por favor asegurese de poner una imagen validad, de lo contrario sera
        contactado por uno de nuestros representantes.
      </p>
    </div>
  );
};

export default ChangeImage;
