import React from 'react';

const PreviewEstadisticasUser = ({
  nombre,
  email,
  telefono,
  dineroGastado,
  reservacionesActivas,
  reservacionesPasadas,
  puntos,
  insignia,
}) => {
  return (
    <div className="border-bottom py-3 my-3">
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Nombre:</p>
        <p className="m-0 fw-bold">{nombre}</p>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Email:</p>
        <p className="m-0 fw-bold">{email}</p>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Teleno:</p>
        <p className="m-0 fw-bold">{telefono}</p>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Dinero que ha gastado:</p>
        <p className="m-0 fw-bold">{dineroGastado}</p>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Reservaciones en giras activass:</p>
        <p className="m-0 fw-bold">{reservacionesActivas}</p>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Reservaciones en giras realizadas:</p>
        <p className="m-0 fw-bold">{reservacionesPasadas}</p>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Puntos:</p>
        <p className="m-0 fw-bold">{puntos}</p>
      </div>
      <div className="d-flex justify-content-between py-1">
        <p className="m-0 fw-medium">Insignia:</p>
        <p className="m-0 fw-bold">{insignia}</p>
      </div>
    </div>
  );
};

export default PreviewEstadisticasUser;
