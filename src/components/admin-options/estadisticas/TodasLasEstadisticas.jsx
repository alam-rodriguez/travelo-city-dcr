import React, { useState } from 'react';

// Components
import Headers from '../admin-options-components/Headers';
import ItemOfAllEstadisticas from '../admin-options-components/estadisticas/ItemOfAllEstadisticas';

const TodasLasEstadisticas = () => {
  const [typeViewEstadisticas, setTypeViewEstadisticas] = useState('manual');

  const handleChangeTypeViewEstadistica = (e) => {
    console.log(e.target.value);
    setTypeViewEstadisticas(e.target.value);
  };

  return (
    <>
      <Headers
        text="Todas las estadisticas"
        link="/admin-options/opciones-estadisticas-giras/"
      />

      <div className="d-flex justify-content-center my-4">
        <select
          className="bg-transparent text-black border rounded-3 p-2"
          onChange={handleChangeTypeViewEstadistica}
        >
          <option value="manual">Seleccionar fecha manualmente</option>
          <option value="calendario">Seleccionar fecha con calendarios</option>
        </select>
      </div>

      {/* <p className="my-4 text-center fs-5 fw-medium">Seleccionar fecha</p> */}
      {typeViewEstadisticas == 'manual' ? (
        <div className="d-flex'justify-content-between row">
          <div className="col-4 d-flex flex-column align-items-center">
            <p className="mb-1 fw-medium">Año</p>
            <select className="bg-transparent text-black rounded-3 p-1 px-3">
              <option value="">2023</option>
              <option value="">2024</option>
              <option value="">2025</option>
            </select>
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            <p className="mb-1 fw-medium">Mes</p>
            <select className="bg-transparent text-black rounded-3 p-1 px-3">
              <option value="">2023</option>
              <option value="">2024</option>
              <option value="">2025</option>
            </select>
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            <p className="mb-1 fw-medium">Dia</p>
            <select className="bg-transparent text-black rounded-3 p-1 px-3">
              <option value="">2023</option>
              <option value="">2024</option>
              <option value="">2025</option>
            </select>
          </div>
        </div>
      ) : typeViewEstadisticas == 'calendario' ? (
        <div className="d-flex align-items-center gap-3">
          <p className="m-0 fw-medium">del</p>
          <input
            className="bg-transparent text-black rounded-3 border p-2"
            type="date"
          />
          <p className="m-0 fw-medium">al</p>
          <input
            className="bg-transparent text-black rounded-3 border p-2"
            type="date"
          />
        </div>
      ) : (
        <></>
      )}

      <button className="w-100 bg-color text-white mt-3 border-0 rounded-4 fs-4 fw-medium p-1">
        Buscar
      </button>

      <hr />

      <div>
        <ItemOfAllEstadisticas head="Cantidad de giras:" value={500} />
        <ItemOfAllEstadisticas
          head="Cantidad de giras pendientes:"
          value={43}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de giras realizadas:"
          value={257}
        />
        <ItemOfAllEstadisticas head="Cantidad de reservaciones:" value={1500} />
        <ItemOfAllEstadisticas
          head="Cantidad de reservaciones canceladas:"
          value={126}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de bebes que han ido:"
          value={300}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de niños que han ido:"
          value={700}
        />
        <ItemOfAllEstadisticas
          head="Cantidad de adultos que han ido:"
          value={1200}
        />
        <ItemOfAllEstadisticas
          head="Cantidad total que han ido:"
          value={1200}
        />
        <ItemOfAllEstadisticas head="Ganancias con bebes:" value={1200} />
        <ItemOfAllEstadisticas head="Ganancias con niños:" value={1200} />
        <ItemOfAllEstadisticas head="Ganancias con adultos:" value={1200} />
        <ItemOfAllEstadisticas head="Reservaciones canceladas:" value={1200} />

        <hr />

        <ItemOfAllEstadisticas head="Total de ganancias:" value={1234567} />
      </div>
    </>
  );
};

export default TodasLasEstadisticas;
