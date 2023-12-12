import React, { useEffect } from 'react';

// Components
import HeaderSeleccionarPersonas from './HeaderSeleccionarPersonas';
import { GrSubtractCircle } from 'react-icons/gr';
import { IoIosAddCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiAddCircleLine } from 'react-icons/ri';

// Zustand
import { useViewSeleccionarPersonas } from '../../../../../zustand/giras/giras';
import SelectCountsForPersons from './SelectCountsForPersons';
import { useState } from 'react';

const SeleccionarPersonas = ({
  title,
  viewSeleccionarPersonas,
  priceAdulto,
  priceChild,
  priceBebe,
  price,
  canGoAdulto,
  canGoChildren,
  canGoBebes,
  deteleLastAdultoName,
  deteleLastChildName,
  deteleLastBebeName,
}) => {
  const {
    setViewSeleccionarPersonas,
    countPersons,
    inprementPersons,
    decrementPersons,
    countChildren,
    decrementCountChildren,
    incrementCountChildren,
    countBabies,
    decrementCountBabies,
    incrementCountBabies,
  } = useViewSeleccionarPersonas();

  const handleClickListo = () => {
    setViewSeleccionarPersonas(false);
  };

  const [view, setView] = useState(false);

  useEffect(() => {
    if (viewSeleccionarPersonas) setView(true);
    else
      setTimeout(() => {
        setView(false);
      }, 1000);
  }, [viewSeleccionarPersonas]);

  if (view)
    return (
      <div
        className={`animate__animated ${
          viewSeleccionarPersonas
            ? 'animate__slideInUp'
            : 'animate__slideOutDown'
        } h-100 w-100 bg-white position-fixed start-0 top-0 overflow-hidden`}
        style={{ zIndex: 10 }}
      >
        <HeaderSeleccionarPersonas />
        <div className="p-3">
          <p className="m-0 fw-bold fs-5">{title}</p>
          {canGoAdulto ? (
            <SelectCountsForPersons
              text="Adulto"
              subtext="14+ años"
              decrementFun={() => {
                decrementPersons();
                deteleLastAdultoName();
              }}
              count={countPersons}
              incrementFun={inprementPersons}
              price={priceAdulto}
            />
          ) : (
            <></>
          )}
          {canGoChildren ? (
            <SelectCountsForPersons
              text="Niño"
              subtext="de 4 a 13 años"
              decrementFun={() => {
                decrementCountChildren();
                deteleLastChildName();
              }}
              count={countChildren}
              incrementFun={incrementCountChildren}
              price={priceChild}
            />
          ) : (
            <></>
          )}
          {canGoBebes ? (
            <SelectCountsForPersons
              text="Bebe"
              subtext="de 0 a 3 años"
              decrementFun={() => {
                decrementCountBabies();
                deteleLastBebeName();
              }}
              count={countBabies}
              incrementFun={incrementCountBabies}
              price={priceBebe}
            />
          ) : (
            <></>
          )}
          <div className="position-fixed start-0 bottom-0 py-4 px-2 w-100">
            <input
              onClick={handleClickListo}
              className="border-0 w-100 bg-color text-white rounded-5 p-2 fs-5 fw-medium"
              type="button"
              value="Listo"
            />
          </div>
        </div>
      </div>
    );
  return <></>;
};

export default SeleccionarPersonas;
