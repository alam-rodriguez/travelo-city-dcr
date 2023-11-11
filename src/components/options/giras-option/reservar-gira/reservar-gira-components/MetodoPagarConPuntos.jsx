import React from 'react';

const MetodoPagarConPuntos = ({
  points,
  goToUsePoints,
  setGoToUsePoints,
  pointsNeeded,
  calcDiscount,
  discount,
  discountPercentWithBadge,
  discountPercentWithPoints,
  total,
}) => {
  return (
    <div className="bg-white shadow p-3 my-3">
      {discount == 0 ? (
        <p>
          Haz click en "Calcular descuentos con puntos" para saber que descuento
          puedes obtener al utilizar tus puntos.
        </p>
      ) : (
        <p>
          Necesitas <span className="fw-bold">{pointsNeeded} puntos</span>, y{' '}
          <span className="fw-bold">tienes {points} puntos</span>, con esta
          cantidad de puntos puedes obtener un{' '}
          <span className="fw-bold">
            {' '}
            {discountPercentWithPoints}% de descuento
          </span>
          , y gracias a tu insignia puedes obtener un{' '}
          <span className="fw-bold">
            {discountPercentWithBadge}% de descuento
          </span>
          , en total hace un{' '}
          <span className="fw-bold">{discount}% de descuento</span>, asi que
          solo tienes que pagar <span className="fw-bold">{total} pesos</span>.
        </p>
      )}

      <div className="d-flex flex-column gap-3">
        <button
          className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
          type="submit"
          onClick={setGoToUsePoints}
        >
          Usar puntos acumulados para pagar
        </button>
        {/* {discount == 0 ? (
          <button
            className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
            onClick={calcDiscount}
            // onClick={setGoToUsePoints}
            type="button"
          >
            Calcular descuentos con puntos
          </button>
        ) : (
          <button
            className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
            type="submit"
            onClick={setGoToUsePoints}
          >
            Usar puntos acumulados
          </button>
        )} */}
        {/* <button
          className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
          // onClick={alertDeDescuento}
          type="submit"
        >
          Calcular descuentos con puntos
        </button>

        <button
          className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
          type="submit"
          onClick={setGoToUsePoints}
        >
          Usar puntos acumulados
        </button> */}
      </div>

      {/* {!userLogged ? (
            <button
              className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
              onClick={registrarUser}
              type="submit"
            >
              Registrar usuario
            </button>
          ) : (
            <div className="d-flex flex-column gap-3">
              <button
                className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
                // onClick={handleClickCompletarReservacion}
                type="submit"
              >
                Completar reservacion
              </button>
              <button
                className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium"
                type="submit"
              >
                Usar puntos acumulados
              </button>
            </div>
          )} */}
    </div>
  );
};

export default MetodoPagarConPuntos;
