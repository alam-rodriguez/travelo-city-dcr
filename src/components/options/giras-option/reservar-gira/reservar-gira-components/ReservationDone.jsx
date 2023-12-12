import React from 'react';

// Icon
import { IoIosListBox } from 'react-icons/io';

// Image
import imageReservacionExitosa from '../../../../../assets/images/imageReservacionExitosa.png';
import { useNavigate } from 'react-router-dom';

const ReservationDone = ({
  tituloGira,
  reservationId,
  fechaGira,
  timeGira,
  traverlers,
  lugarEncuentro,
  horaGira,
}) => {
  const navigate = useNavigate();

  const handleClickViewReservation = () =>
    navigate(`/mis-giras/${reservationId}`);

  const handleClickViewDiary = () => navigate('/mis-giras');

  return (
    <div className=" " style={{ paddingTop: 100 }}>
      <div className="d-flex justify-content-center">
        <img src={imageReservacionExitosa} className="w-50" />
      </div>
      <p className="m-0 display-1 fw-bold">Reservacion realizada!</p>

      <div className="mt-4">
        <p className="m-0 fs-3 fw-bold">{tituloGira}</p>
        <p className="m-0 fw-medium fs-6">Id: #{reservationId}</p>
      </div>

      <div className="mt-4">
        <hr />

        <div className="d-flex">
          <div className="w-50">
            <p className="m-0 fw-medium">Fecha de gira</p>
            <p className="m-0 fw-bold fs-6">{fechaGira}</p>
            <p className="m-0 fw-medium">{timeGira}</p>
            <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
              {traverlers == 1 ? `1 Viajero` : `${traverlers} viajeros`}
            </p>
          </div>
          <div className="w-50">
            <p className="m-0 fw-medium text-end">Lugar de encuentro</p>
            <p className="m-0 fw-bold fs-6 text-end">{lugarEncuentro}</p>
            <p className="m-0 fw-medium text-end">{horaGira}</p>
          </div>
        </div>

        <hr />
      </div>

      <div
        className="d-flex align-items-center gap-2 color-1"
        onClick={handleClickViewReservation}
      >
        <IoIosListBox className="fs-2" />
        <p className="m-0">ver detalles del precio</p>
      </div>

      <div className="position-fixed bottom-0 start-0 w-100 px-3 pb-4">
        <button
          className=" bg-color w-100 fs-5 border-0 rounded-3 p-2 fw-medium "
          onClick={handleClickViewDiary}
        >
          Ver agenda
        </button>
      </div>
    </div>
  );
};

export default ReservationDone;
