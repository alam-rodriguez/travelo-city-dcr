import React from 'react';

// Components
import HeaderReserveGira from './reservar-gira-components/HeaderReserveGira';

// img
import canlendario from '../../../../assets/images/calendario.svg';
import AccordinSection from './reservar-gira-components/AccordinSection';
import { FaTicketAlt } from 'react-icons/fa';
import { TbClockHour5 } from 'react-icons/tb';
import { FaAnglesDown } from 'react-icons/fa6';
import FreeCancelationSection from './reservar-gira-components/FreeCancelationSection';
import AlertDaysLeft from './reservar-gira-components/AlertDaysLeft';
import WhoTravelSection from './reservar-gira-components/WhoTravelSection';
// import ImportanInformationSection from './reservar-gira-components/ImportanInformationSection';

import ImportantInformationSection from './reservar-gira-components/ImportantInformationSection';
import CompletarReservacion from './reservar-gira-components/CompletarReservacion';
import Accordings from './reservar-gira-components/Accordings';

import {
  useGiras,
  useInfoPeople,
  useViewSeleccionarPersonas,
} from '../../../../zustand/giras/giras';

const ReservarGira = () => {
  const { giraSelected } = useGiras();

  const { countPersons, countChildren, countBabies } =
    useViewSeleccionarPersonas();

  const {
    nameAndSurname,
    setNameAndSurname,
    number,
    setNumber,
    adultosNames,
    setAdultosNames,
    childrenNames,
    setChildrenNames,
    bebiesNames,
    setBebiesNames,
    resetNames,
  } = useInfoPeople();

  return (
    <>
      <HeaderReserveGira resetNames={resetNames} />
      <div className="mb-5 bg-light" style={{ paddingTop: 90 }}>
        {/* <div className=""> */}
        <p className="m-0 fw-bold fs-3">
          Asegura tu reservacion. Solo te toma 2 minutos!
        </p>

        <FreeCancelationSection
          freeCancellationLimit={giraSelected.freeCancellationLimit}
        />

        <hr />
        {/* 
        <div className="d-flex bg-light p-2">
          <img src={canlendario} className="" style={{ width: 60 }} />
          <div>
            <p className="m-0 fw-bold">
              Cancelacion gratuita si cambias de planes
            </p>
            <p className="m-0 text-secondary" style={{ fontSize: 15 }}>
              Cancela sin cargos antes del mie., 20 sep..
            </p>
          </div>
        </div> */}

        {/*     <div className="accordion z-0" id={`accordion-1`}>
          <div className="accordion-item border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button bg-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-1`}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div>
                  <i></i>
                  <p>Visita a la cerveceria Dusseldorf (incluyendo 3 albier)</p>
                  <p>Dusserdorf</p>
                  <p>jue, 21 sept.</p>
                  <p>2 aduldos, 2 ninos, 2 bebe</p>
                </div>
              </button>
            </h2>
            <div
              id={`collapse-1`}
              className="accordion-collapse collapse show-"
              data-bs-parent={`#accordion-1`}
            >
              <div className="accordion-body">
                <div className="accordion-body p-0">
                  <div>
                    <p>Tour Por la ciudad de Dusseldorf</p>
                    <div>
                      <i></i>
                      <p>1 h 30 min</p>
                    </div>
                    <p>Ubicacion de la actividad</p>
                    <p>Multiple locations visited</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <Accordings
          countPersons={countPersons}
          countChildren={countChildren}
          countBabies={countBabies}
          description={giraSelected.description}
          duracion={giraSelected.duration}
          place={giraSelected.place}
        />

        {/* <AccordinSection
          id={1}
          header={
            <div className="d-flex p-2">
              <FaTicketAlt className="fs-2" />
              <div className="d-flex flex-column ms-2 ">
                <p className="m-0 fw-medium text-decoration-underline- color-1">
                  Visita a la cerveceria Dusseldorf (incluyendo 3 albier)
                  <FaAnglesDown className="FaAnglesDown-1 color-1 ms-2" />
                </p>

                <p className="m-0 fw-bold">Dusserdorf</p>
                <p className="m-0" style={{ fontSize: 14 }}>
                  jue, 21 sept.
                </p>
                <p className="m-0">2 aduldos, 2 ninos, 2 bebe</p>
              </div>
            </div>
          }
          content={
            <div className="mt-2" style={{ marginLeft: 37 }}>
              <p className="m-0">Tour Por la ciudad de Dusseldorf</p>
              <div className="d-flex align-items-center">
                <TbClockHour5 className="" />
                <p className="m-0">1 h 30 min</p>
              </div>
              <p className="m-0 fw-medium">Ubicacion de la actividad</p>
              <p className="m-0">Multiple locations visited</p>
            </div>
          }
        />

        <hr />

        <AccordinSection
          id={2}
          header={
            
            <div className="d-flex justify-content-between px-3">
              <p className="m-0 fw-medium text-decoration-underline color-1">
                Total a pagar hoy
                <FaAnglesDown className="FaAnglesDown-2 color-1 ms-2" />
              </p>
              <p className="m-0 fw-bold fs-6">$53.30</p>
            </div>
          }
          content={
            <div
              className="my-2 mx-5-"
              style={{ paddingRight: 30, paddingLeft: 30 }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ fontSize: 14 }}
              >
                <p className="m-0">2 adulto</p>
                <p className="m-0">$42.60</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ fontSize: 14 }}
              >
                <p className="m-0">2 niños</p>
                <p className="m-0">$10.66</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ fontSize: 14 }}
              >
                <p className="m-0">2 bebes</p>
                <p className="m-0">$0.00</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ fontSize: 14 }}
              >
                <p className="m-0">2 adulto</p>
                <p className="m-0">$0.00</p>
              </div>
              
            </div>
          }
        /> */}

        <p className="m-0 mt-3">
          Las tarifas se muestran en{' '}
          <span className="fw-bold">dolares estadounidenses.</span>
        </p>

        {/* <div>
          <i></i>
          <p>Visita a la cerveceria Dusseldorf (incluyendo 3 albier)</p>
          <p>Dusserdorf</p>
          <p>jue, 21 sept.</p>
          <p>2 aduldos, 2 ninos, 2 bebe</p>

          <p>Tour Por la ciudad de Dusseldorf</p>
          <div>
            <i></i>
            <p>1 h 30 min</p>
          </div>
          <p>Ubicacion de la actividad</p>
          <p>Multiple locations visited</p>
        </div> */}
        {/* </div> */}

        <AlertDaysLeft />

        {/* <div className="d-flex bg-light p-2 mt-3 text-danger">
          <TbClockHour5 className="fs-3" />
          <p className="m-0">
            Tu viaje cominza en 5 dias. Reserva ahora, mientras hay
            disponibilidad.
          </p>
        </div> */}

        <WhoTravelSection
          countPersons={countPersons}
          nameAndSurname={nameAndSurname}
          setNameAndSurname={setNameAndSurname}
          number={number}
          setNumber={setNumber}
          adultosNames={adultosNames}
          setAdultosNames={setAdultosNames}
          countChildren={countChildren}
          childrenNames={childrenNames}
          setChildrenNames={setChildrenNames}
          countBabies={countBabies}
          bebiesNames={bebiesNames}
          setBebiesNames={setBebiesNames}
        />

        {/* <div className="bg-light mt-4">
          <div className="border-bottom p-3">
            <p className="m-0">Quien Viaja?</p>
          </div>
          <div className="p-3">
            <p>
              Recorrido con paradas libres en Dusselford en un autobus de dos
              pisos
            </p>
            <p>jueves, 21 sept.</p>

            <div className="my-4">
              <label className="mb-1 fw-medium" htmlFor="userName">
                Nombre del contacto
              </label>
              <input
                className="w-100 bg-transparent border border-secondary rounded-2 p-2 text-black"
                type="text"
                placeholder="Nombre y apellidos"
                id="userName"
              />
            </div>
            <div className="my-4">
              <label className="mb-1 fw-medium" htmlFor="userEmail">
                Nombre del contacto
              </label>
              <input
                className="w-100 bg-transparent border border-secondary rounded-2 p-2 text-black"
                type="email"
                placeholder="Nombre y apellidos"
                id="userEmail"
              />
            </div>
            <div className="my-4">
              <label className="mb-1 fw-medium" htmlFor="userNumber">
                Numero de telefono
              </label>
              <input
                className="w-100 bg-transparent border border-secondary rounded-2 p-2 text-black"
                type="email"
                placeholder="Por si necesitamos contectarte"
                id="userNumber"
              />
            </div>
            <hr />

            <div className="my-4">
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
            </div>
          </div>
        </div> */}

        <ImportantInformationSection />

        {/* <div
          className="bg-white shadow p-3 overflow-scroll"
          style={{ height: 200 }}
        >
          <p>Informacion importante sobre la actividad</p>
          <p>
            Recorrido con paradas libres en Dusseldorf en una autobus de dos
            pisos (Dusseldorf, ) - jueves, 21 sept.
          </p>
          <ul>
            <li>
              Recorrido con paradas libres en Dusseldorf en un autobus de dos
              pisos
            </li>
            <li>Puedes cancelar sin costo hasta 24 horas antes</li>

            <li>
              Recorrido con paradas libres en Dusseldorf en un autobus de dos
              pisos
            </li>
            <li>Puedes cancelar sin costo hasta 24 horas antes</li>
          </ul>
        </div> */}

        <CompletarReservacion
          nameAndSurname={nameAndSurname}
          number={number}
          adultosNames={adultosNames}
          childrenNames={childrenNames}
          bebiesNames={bebiesNames}
        />

        {/* <div className="bg-white shadow p-3 my-3">
          <p>
            Al hacer click en el boton de abajo, acepto que revise el aviso de
            privacidad y las alestar de vieje del gobierno. Tambien acepto que
            revise y estoy de acuerdo con las normas y restricciones, y los
            terminos de uso.
          </p>
          <button className="bg-color border-0 w-100 rounded-2 fs-5 p-2 fw-medium">
            Completar reservacion
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ReservarGira;
