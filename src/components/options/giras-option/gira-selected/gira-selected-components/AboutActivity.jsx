import React from 'react';

// Icon
import { BsChevronRight } from 'react-icons/bs';

// Swal-alerts
import Swal from 'sweetalert2';

const AboutActivity = ({ aboutActivity }) => {
  const handleClickShowInfo = () =>
    Swal.fire({
      title: 'Acerca de la actividad',
      text: aboutActivity,
    });

  return (
    <>
      <p className="mb-1 fs-4 fw-bold">Acerca de la actividad</p>
      <p className="m-0 fw-normal overflow-hidden" style={{ maxHeight: 70 }}>
        {aboutActivity}
      </p>
      <div
        className="text-end color-1 d-flex justify-content-end align-items-center gap-2 mb-3 mt-2"
        style={{ fontSize: 14 }}
        onClick={handleClickShowInfo}
      >
        <p className="m-0">Ver todo</p>
        <BsChevronRight />
      </div>
    </>
  );
};

export default AboutActivity;
