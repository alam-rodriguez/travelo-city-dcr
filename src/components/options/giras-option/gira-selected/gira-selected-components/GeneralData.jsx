import React from 'react';

// Icon
import { BsChevronRight } from 'react-icons/bs';

// Swal-alerts
import Swal from 'sweetalert2';

const GeneralData = ({ generalData }) => {
  const handleClickShowInfo = () => {
    const listaHTML = document.createElement('ul');
    generalData.forEach((actividad) => {
      const listItem = document.createElement('li');
      listItem.textContent = actividad;
      listaHTML.appendChild(listItem);
    });

    Swal.fire({
      title: 'Acerca de la actividad',
      html: listaHTML,
    });
  };

  return (
    <div className="overflow-scroll">
      <p className="m-0 m-2 fs-4 fw-bold">Datos generales</p>

      <ul>
        {generalData.map((data, i) => {
          if (i < 3)
            return (
              <li key={i} className="my-1">
                {data}
              </li>
            );
        })}
      </ul>
      <div
        className="text-end color-1 d-flex justify-content-end align-items-center gap-2 mb-3 mt-2"
        style={{ fontSize: 14 }}
        onClick={handleClickShowInfo}
      >
        <p className="m-0">Ver todo</p>
        <BsChevronRight />
      </div>
    </div>
  );
};

export default GeneralData;
