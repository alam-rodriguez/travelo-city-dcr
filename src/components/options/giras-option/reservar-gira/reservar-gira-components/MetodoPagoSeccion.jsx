import React, { useEffect, useRef } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { RiImageAddFill } from 'react-icons/ri';
import TextForDiscount from './TextForDiscount';

const MetodoPagoSeccion = ({
  total,
  totalWithDiscount,
  methodOfPay,
  setMethodOfPay,
  methodOfPayWhenUsePoints,
  setMethodOfPayWhenUsePoints,
  bankSelected,
  setBankSelected,
  banksCountsNumbers,
  imgTransaccion,
  setImgTransaccion,
  badge,
  discountPercentWithBadge,
  discountPercentWithPoints,
  activePoints,
  discount,
  calcDiscount,
}) => {
  const inputAddImage = useRef(null);

  const pagar = () => {
    console.log(methodOfPay);
    console.log(bankSelected);
  };

  const handleChangePayMethod = (e) => {
    // console.log(e.tarjet.value);
    setMethodOfPay(e.target.value);
    // calcDiscount(e.tarjet.value);
  };

  const handleChangeBank = (e) => setBankSelected(e.target.value);

  const handleClickSelecImage = () => inputAddImage.current.click();

  const handleChangeImage = (e) => setImgTransaccion(e.target.files[0]);

  const handleChangePayMethodWhenUsePoints = (e) =>
    setMethodOfPayWhenUsePoints(e.target.value);

  return (
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
          Como quieres pagar, en efectivo o con i ?
        </p>
        <select
          // defaultValue="holaa"
          value={methodOfPay}
          // defaultValue={methodOfPay}
          required={true}
          // required={discount < 100 ? true : false}
          className="bg-transparent w-100 border text-black rounded-1 p-2"
          onChange={handleChangePayMethod}
        >
          {methodOfPay == '' ? (
            <option value="">Debes de seleccionar una opcion</option>
          ) : null}
          <option value="efectivo">Voy a pagar con efectivo</option>
          <option value="tarjeta">Voy a pagar con transferencia</option>
          {discountPercentWithPoints > 0 && activePoints ? (
            <option value="points">Voy a utilizar mis puntos para pagar</option>
          ) : (
            <></>
          )}
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
          <p className="m-0 fw-medium">
            Total a pagar: <span className="fw-bold">{totalWithDiscount}</span>
          </p>
          <TextForDiscount
            discount={discountPercentWithBadge}
            text={`de descuento gracias a tu insignia de ${badge}`}
          />
        </>
      ) : methodOfPay == 'efectivo' ? (
        <>
          <p className="m-0 fw-medium">
            Total a pagar: <span className="fw-bold">{totalWithDiscount}</span>
          </p>
          <TextForDiscount
            discount={discountPercentWithBadge}
            text={`de descuento gracias a tu insignia de ${badge}`}
          />
        </>
      ) : methodOfPay == 'points' && totalWithDiscount > 0 ? (
        <>
          <div className="my-3">
            <p className="mb-1 fw-medium">
              Como quieres pagar la cantidad restante ?
            </p>
            <select
              className="bg-transparent w-100 border rounded-3 text-black rounded-1 p-2"
              onChange={handleChangePayMethodWhenUsePoints}
            >
              <option value="efectivo">Con efectivo</option>
              <option value="tarjeta">Con transferencia</option>
            </select>

            {methodOfPayWhenUsePoints == 'tarjeta' ? (
              <>
                <p className="mb-1 fw-medium">
                  Selecciona en banco que vas a utilizar
                </p>
                <select
                  className="bg-transparent w-100 border rounded-3 text-black rounded-1 p-2"
                  onChange={handleChangeBank}
                >
                  <option value="banreservas">Banco BANRESERVAS</option>
                  <option value="popular">Banco POPULAR</option>
                  <option value="bhd">Banco BHD</option>npm run
                  <option value="scotiabank">Banco SCOTIABANK</option>
                </select>
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
          </div>

          <p className="m-0 fw-medium">
            Total a pagar: <span className="fw-bold">{totalWithDiscount}</span>
          </p>

          <TextForDiscount
            discount={discountPercentWithBadge}
            text={`de descuento gracias a tu insignia de ${badge}`}
          />
          <TextForDiscount
            discount={discountPercentWithPoints}
            text="de descuento gracias a tus puntos"
          />
        </>
      ) : methodOfPay == 'points' && totalWithDiscount == 0 ? (
        <>
          <p className="m-0 fw-medium">No tienes que pagar nada</p>
          <TextForDiscount
            discount={discountPercentWithBadge}
            text="de descuento gracias a tu insignia"
          />
          <TextForDiscount
            discount={discountPercentWithPoints}
            text="de descuento gracias a tus puntos"
          />
        </>
      ) : (
        <></>
      )}

      {/* {methodOfPay == 'tarjeta' ? (
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
              {banksCountsNumbers[bankSelected]Quieres }
            </span>
          </p>
          <p className="m-0 fw-medium">
            Total a pagar:{' '}
            <span className="fw-bold">
              {total > 0 ? total : 'No tienes que pagar'}
            </span>
          </p>
        </>
      ) : (
        <p className="m-0 fw-medium">
          Total a pagar:{' '}
          <span className="fw-bold">
            {total > 0 ? total : 'No tienes que pagar'}
          </span>
        </p>
      )} */}

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
      {methodOfPay == 'tarjeta' ||
      (methodOfPay == 'points' &&
        totalWithDiscount > 0 &&
        methodOfPayWhenUsePoints == 'tarjeta') ? (
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
      {methodOfPay == 'tarjeta' ||
      (methodOfPay == 'points' && methodOfPayWhenUsePoints == 'tarjeta') ? (
        <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
          Esta imagen solo se utilizara para comprobar que realizaste tu pedido,
          por favor asegurese de poner una imagen validad, de lo contrario sera
          contactado por uno de nuestros representantes.
        </p>
      ) : (
        <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
          En cualquier otro momento puedes confirmar tu reservacion
        </p>
      )}
    </div>
  );
};

export default MetodoPagoSeccion;
