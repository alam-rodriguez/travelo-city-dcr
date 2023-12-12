import React from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { FaAnglesDown } from 'react-icons/fa6';
import { TbClockHour5 } from 'react-icons/tb';
import AccordinSection from './AccordinSection';
import ReservarGiraAccordingItem from './ReservarGiraAccordingItem';

const Accordings = ({
  countPersons,
  pricePerson,
  countChildren,
  priceChild,
  countBabies,
  priceBaby,
  discountInMoney,
  description,
  title,
  duracion,
  city,
  date,
  location,
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

              <p className="m-0 fw-bold">{city}</p>
              <p className="m-0" style={{ fontSize: 14 }}>
                {date}
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
            <p className="m-0">{title}</p>
            <div className="d-flex align-items-center">
              <TbClockHour5 className="" />
              <p className="m-0">{duracion}</p>
            </div>
            <p className="m-0 fw-medium">Ubicacion de la actividad</p>
            <p className="m-0">{location}</p>
          </div>
        }
      />

      <hr />

      <AccordinSection
        id={2}
        header={
          <div className="d-flex justify-content-between px-3">
            <p className="m-0 fw-medium text-decoration-underline color-1">
              Total a pagar
              <FaAnglesDown className="FaAnglesDown-2 color-1 ms-2" />
            </p>
            <p className="m-0 fw-bold fs-6">
              {countPersons * pricePerson +
                countChildren * priceChild +
                countBabies * priceBaby -
                discountInMoney}
            </p>
          </div>
        }
        content={
          <div
            className="my-2 mx-5-"
            style={{ paddingRight: 30, paddingLeft: 30 }}
          >
            {countPersons > 0 ? (
              <ReservarGiraAccordingItem
                head={`${countPersons} adultos`}
                total={'$' + countPersons * pricePerson}
              />
            ) : (
              <></>
            )}

            {countChildren > 0 ? (
              <ReservarGiraAccordingItem
                head={`${countChildren} niños`}
                total={'$' + countChildren * priceChild}
              />
            ) : (
              <></>
            )}

            {countBabies > 0 ? (
              <ReservarGiraAccordingItem
                head={`${countBabies} bebes`}
                total={'$' + countBabies * priceBaby}
              />
            ) : (
              <></>
            )}
            <ReservarGiraAccordingItem
              head="Impuestos y cargos"
              total="incluidos"
            />
          </div>
        }
      />
    </>
  );
};

export default Accordings;
