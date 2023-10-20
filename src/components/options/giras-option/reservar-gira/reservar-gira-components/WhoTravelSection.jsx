import React, { useEffect } from 'react';

import { useInfoPeople } from '../../../../../zustand/giras/giras';
import Inputs from './Inputs';

const WhoTravelSection = ({
  countPersons,
  nameAndSurname,
  setNameAndSurname,
  number,
  setNumber,
  adultosNames,
  setAdultosNames,
  countChildren,
  childrenNames,
  setChildrenNames,
  countBabies,
  bebiesNames,
  setBebiesNames,
  oldName,
  oldNumber,
}) => {
  // const { nameAndSurname, setNameAndSurname } = useInfoPeople();

  const handleChangeNombreYApellido = (e) => setNameAndSurname(e.target.value);

  const handleChangeNumber = (e) => setNumber(e.target.value);

  const handleChangeNamesAdultos = (key, value) => setAdultosNames(key, value);

  const handleChangeNamesChildren = (key, value) =>
    setChildrenNames(key, value);

  const handleChangeNamesBebies = (key, value) => setBebiesNames(key, value);

  useEffect(() => {
    console.log(oldNumber);
  }, []);

  return (
    <div className="bg-light my-3">
      <div className="border-bottom p-3">
        <p className="m-0">Quien Viaja?</p>
      </div>
      <div className="p-3">
        <p>
          Recorrido con paradas libres en Dusselford en un autobus de dos pisos
        </p>
        <p>jueves, 21 sept.</p>

        <Inputs
          id="userName"
          head="Nombre del contacto"
          placeholder="Nombre y apellidos"
          value={nameAndSurname}
          // defaultValue={oldName}
          handleChange={handleChangeNombreYApellido}
        />

        {/* <div className="my-4">
          <label className="mb-1 fw-medium" htmlFor="userName">
            Nombre del contacto
          </label>
          <input
            className="w-100 bg-transparent border border-secondary rounded-2 p-2 text-black"
            type="text"
            placeholder="Nombre y apellidos"
            id="userName"
            onChange={handleChangeNombreYApellido}
          />
        </div> */}

        <Inputs
          id="userNumber"
          minLength={9}
          type="tel"
          head="Numero de telefono"
          placeholder="Por si necesitamos contectarte"
          value={number}
          // defaultValue={oldnumber}
          handleChange={handleChangeNumber}
        />

        {/* <div className="my-4">
          <label className="mb-1 fw-medium" htmlFor="userNumber">
            Numero de telefono
          </label>
          <input
            className="w-100 bg-transparent border border-secondary rounded-2 p-2 text-black"
            type="number"
            placeholder="Por si necesitamos contectarte"
            id="userNumber"
            onChange={handleChangeNumber}
          />
        </div> */}

        <hr />

        {(() => {
          const elements = [];
          for (let i = 1; i <= countPersons; i++) {
            if (i > 1)
              elements.push(
                <Inputs
                  key={i}
                  id={`adulto adulto-${i}`}
                  head={`adulto ${i}`}
                  placeholder="Nombre y apellidos"
                  value={adultosNames[`adulto ${i}`]}
                  handleChange={(e) =>
                    handleChangeNamesAdultos(`adulto ${i}`, e.target.value)
                  }
                />,
              );
          }
          return elements;
        })()}

        {(() => {
          const elements = [];
          for (let i = 1; i <= countChildren; i++) {
            elements.push(
              <Inputs
                key={i}
                id={`child child-${i}`}
                head={`niño ${i}`}
                placeholder="Nombre y apellidos"
                value={childrenNames[`child ${i}`]}
                handleChange={(e) =>
                  handleChangeNamesChildren(`child ${i}`, e.target.value)
                }
              />,
            );
          }
          return elements;
        })()}

        {(() => {
          const elements = [];
          for (let i = 1; i <= countBabies; i++) {
            elements.push(
              <Inputs
                key={i}
                id={`bebe bebe-${i}`}
                head={`bebe ${i}`}
                placeholder="Nombre y apellidos"
                value={bebiesNames[`bebe ${i}`]}
                handleChange={(e) =>
                  handleChangeNamesBebies(`bebe ${i}`, e.target.value)
                }
              />,
            );
          }
          return elements;
        })()}

        {/* <div className="my-4">
          <p className="mb-2 fs-4">adulto 2</p>
          <label className="mb-1 fw-medium" htmlFor="userNumber">
            Nombre
          </label>
          <input
            className="w-100 bg-transparent border border-secondary rounded-2 p-2 text-black"
            type="email"
            placeholder="Nombre y apellidos"
            id="userNumber"
          />
          <hr />
        </div> */}
      </div>
    </div>
  );
};

export default WhoTravelSection;
