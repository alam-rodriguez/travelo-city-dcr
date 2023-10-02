import React from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { FaAnglesDown } from 'react-icons/fa6';
import { TbClockHour5 } from 'react-icons/tb';
import AccordinSection from './AccordinSection';

const Accordings = ({
  countPersons,
  countChildren,
  countBabies,
  description,
  duracion,
  place,
}) => {
  return (
    <>
      <AccordinSection
        id={1}
        header={
          <div className="d-flex p-2">
            <FaTicketAlt className="fs-2" />
            <div className="d-flex flex-column ms-2 ">
              <p className="m-0 fw-medium text-decoration-underline- color-1">
                {description}
                <FaAnglesDown className="FaAnglesDown-1 color-1 ms-2" />
              </p>

              <p className="m-0 fw-bold">{place}</p>
              <p className="m-0" style={{ fontSize: 14 }}>
                jue, 21 sept.
              </p>
              <p className="m-0" style={{ fontSize: 14 }}>
                {countPersons} adulto
                {countChildren > 0 ? `, ${countChildren} niño` : ''}
                {countBabies > 0 ? `, ${countBabies} bebe` : ''}
              </p>
            </div>
          </div>
        }
        content={
          <div className="mt-2" style={{ marginLeft: 37 }}>
            <p className="m-0">Tour Por la ciudad de Dusseldorf</p>
            <div className="d-flex align-items-center">
              <TbClockHour5 className="" />
              <p className="m-0">{duracion}</p>
            </div>
            <p className="m-0 fw-medium">Ubicacion de la actividad</p>
            <p className="m-0">{place}</p>
          </div>
        }
      />

      <hr />

      <AccordinSection
        id={2}
        header={
          // <div className="d-flex">
          //   {/* <FaTicketAlt className="fs-2" /> */}
          //   <div className="d-flex flex-column ms-2 gap-1">

          //   </div>
          // </div>
          // // <div>

          // // </div>
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
            {/* <p className="m-0">impuestos y cargos</p> */}
            {/* <div className="d-flex align-items-center">
                <TbClockHour5 className="" />
                <p className="m-0">1 h 30 min</p>
              </div> */}
            {/* <p className="m-0">Ubicacion de la actividad</p> */}
            {/* <p className="m-0">Multiple locations visited</p> */}
          </div>
        }
      />
    </>
  );
};

export default Accordings;
