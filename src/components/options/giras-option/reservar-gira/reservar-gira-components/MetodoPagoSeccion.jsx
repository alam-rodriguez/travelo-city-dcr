import React, { useRef } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { RiImageAddFill } from 'react-icons/ri';

const MetodoPagoSeccion = ({
  methodOfPay,
  setMethodOfPay,
  bankSelected,
  setBankSelected,
  banksCountsNumbers,
  imgTransaccion,
  setImgTransaccion,
}) => {
  const inputAddImage = useRef(null);

  const pagar = () => {
    console.log(methodOfPay);
    console.log(bankSelected);
  };

  const handleChangePayMethod = (e) => setMethodOfPay(e.target.value);

  const handleChangeBank = (e) => setBankSelected(e.target.value);

  const handleClickSelecImage = () => inputAddImage.current.click();

  const handleChangeImage = (e) => setImgTransaccion(e.target.files[0]);

  return (
    <>
      <div className="bg-white shadow my-3 p-3">
        <p className="m-0 fw-bold fs-4">Metodo de pago</p>
        <div className="my-3">
          <div className="d-flex align-items-center gap-2 text-success fw-medium">
            <IoMdCheckmark className="fs-4" />
            <p className="m-0" style={{ fontSize: 15 }}>
              Usamos transferencias seguras
            </p>
          </div>
          <div className="d-flex align-items-center gap-2 text-success fw-medium">
            <IoMdCheckmark className=" fs-4" />
            <p className="m-0" style={{ fontSize: 15 }}>
              Nosotros protegemos tu informacion personal
            </p>
          </div>
        </div>
        <div className="my-3">
          <p className="mb-1 fw-medium">
            Como quieres pagar, en efectivo o con tarjeta ?
          </p>
          <select
            // defaultValue="holaa"
            value={methodOfPay}
            // defaultValue={methodOfPay}
            required
            className="bg-transparent w-100 border text-black rounded-1 p-2"
            onChange={handleChangePayMethod}
          >
            {methodOfPay == '' ? (
              <option value="">Debes de seleccionar una opcion</option>
            ) : (
              <></>
            )}
            <option value="efectivo">Voy a pagar en efectivo</option>
            <option value="tarjeta">Voy a pagar con targeta de credito</option>
          </select>
        </div>

        {methodOfPay == 'tarjeta' ? (
          <>
            <div className="my-3">
              <p className="mb-1 fw-medium">
                Selecciona en banco que vas a utilizar
              </p>
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
          </>
        ) : (
          <></>
        )}

        <hr />

        {/* {methodOfPay == '' || methodOfPay == 'tarjeta' ? (
          imgTransaccion.name == undefined ? (
            <div
              className="d-flex flex-column justify-content-center align-items-center p-5 my-3"
              style={{ height: 250, border: 'dashed 3px black' }}
              onClick={handleClickSelecImage}
            >
              <p className="m-0 text-center">
                Pongo aqui una foto de tu recibo para realizar tu reservacion
              </p>
              <RiImageAddFill className="display-1" />
              <input
                ref={inputAddImage}
                onChange={handleChangeImage}
                hidden
                type="file"
              />
            </div>
          ) : (
            <img src={URL.createObjectURL(imgTransaccion)} alt="" />
          )
        ) : (
          <></>
        )} */}
        {methodOfPay == 'tarjeta' ? (
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
                className="w-100 h-100 object-fit-cover"
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
        ) : (
          <></>
        )}
        {methodOfPay == 'tarjeta' ? (
          <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
            Esta imagen solo se utilizara para comprobar que realizaste tu
            pedido, por favor asegurese de poner una imagen validad, de lo
            contrario sera contactado por uno de nuestros representantes.
          </p>
        ) : (
          <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
            En cualquier otro momento puedes confirmar tu reservacion
          </p>
        )}
      </div>
      <button type="button" onClick={pagar}>
        pagar
      </button>
    </>
  );
};

export default MetodoPagoSeccion;
