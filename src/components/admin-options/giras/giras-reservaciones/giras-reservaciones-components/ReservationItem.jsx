import React from 'react';

// Components
import ReservacionP from './ReservacionP';

const ReservationItem = ({
  id,
  date,
  hour,
  userName,
  userNumber,
  userEmail,
  stateReservation,
  adultsNames,
  adultPrice,
  childrenNames,
  childrenPrice,
  bebiesNames,
  bebiesPrice,
  pointsUsed,
  total,
  reservacion,
  handleClick,
}) => {
  return (
    <div
      className="border-bottom border-danger border-5 mb-5 pb-0"
      onClick={() => handleClick(reservacion)}
    >
      <ReservacionP head="Fecha:" value={`${date} | ${hour}`} />
      <ReservacionP head="Nombre:" value={userName} />
      <ReservacionP head="Numero:" value={userNumber} />
      <ReservacionP head="Email:" value={userEmail} />
      <ReservacionP head="Estado de reservacion:" value={stateReservation} />

      {Object.keys(adultsNames).length > 0 ||
      Object.keys(childrenNames).length > 0 ||
      Object.keys(bebiesNames).length > 0 ? (
        <p className="m-0 text-center fw-bold">acompanantes:</p>
      ) : (
        <></>
      )}

      {Object.keys(adultsNames).length > 0 ? (
        <>
          <ReservacionP
            head="Adultos:"
            value={(() => {
              const elementos = Object.keys(adultsNames).map((clave) => {
                const valor = adultsNames[clave];
                return <span key={clave}> {valor},</span>;
              });
              return elementos;
            })()}
          />
          {/* <ReservacionP head="Precio cada adulto:" value={adultPrice} /> */}
        </>
      ) : (
        <></>
      )}

      {Object.keys(childrenNames).length > 0 ? (
        <>
          <ReservacionP
            head="Ninos:"
            value={(() => {
              const elementos = Object.keys(childrenNames).map((clave) => {
                const valor = childrenNames[clave];
                return <span key={clave}> {valor},</span>;
              });
              return elementos;
            })()}
          />
          {/* <ReservacionP head="Precio cada niño:" value={childrenPrice} /> */}
        </>
      ) : (
        <></>
      )}
      {Object.keys(bebiesNames).length > 0 ? (
        <>
          <ReservacionP
            head="Bebes:"
            value={(() => {
              const elementos = Object.keys(bebiesNames).map((clave) => {
                const valor = bebiesNames[clave];
                return <span key={clave}> {valor},</span>;
              });
              return elementos;
            })()}
          />
          {/* <ReservacionP head="Precio cada Bebe:" value={bebiesPrice} /> */}
        </>
      ) : (
        <></>
      )}
      <hr />
      {pointsUsed > 0 ? (
        <ReservacionP head="Puntos utilizados:" value={pointsUsed} />
      ) : (
        <></>
      )}

      <ReservacionP head="Total:" value={total} />
    </div>
  );
};

export default ReservationItem;
