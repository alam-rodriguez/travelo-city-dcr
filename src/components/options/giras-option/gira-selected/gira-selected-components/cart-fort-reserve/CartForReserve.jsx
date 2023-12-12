import React, { useRef, useEffect } from 'react';

// Icons
import { BiImages, BiMobile } from 'react-icons/bi';
import { FaRegHourglassHalf } from 'react-icons/fa6';
import {
  BsCalendarRange,
  BsCheck2,
  BsChevronRight,
  BsFillLightningFill,
  BsPersonFill,
} from 'react-icons/bs';
import { TbClockHour5, TbPointFilled } from 'react-icons/tb';
import { GrFormClose } from 'react-icons/gr';
import { FaImages } from 'react-icons/fa';
import { RiInformationLine } from 'react-icons/ri';

// Components
import Info from './Info';
import { IoLanguageOutline } from 'react-icons/io5';

// Zustand
import {
  useViewBtnSeleccionarEntrada,
  useViewSeleccionarPersonas,
} from '../../../../../../zustand/giras/giras';
import { useNavigate } from 'react-router-dom';
import PriceView from './PriceView';

const CartForReserve = ({
  title,
  priceAdulto,
  priceChild,
  priceBebe,
  giraDuration,
  giraSelected,
  canGoChildren,
  fecha,
  giraFecha,
  hora,
  canCancelFree,
  freeCancellationLimit,
  dateLimitForCancel,
}) => {
  const navigate = useNavigate();
  const { setViewBtnSeleccionarEntrada: setViewBtn } =
    useViewBtnSeleccionarEntrada();

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

  const miRef = useRef();

  function estaElementoEnPantalla(ref) {
    const rect = ref.current.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.bottom >= 0 && rect.top <= windowHeight;
  }

  function handleScroll() {
    if (!estaElementoEnPantalla(miRef)) setViewBtn(true);
    else setViewBtn(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClickViewSeleccionarPersonas = () => {
    setViewSeleccionarPersonas(true);
  };

  const handleClickGoToReservarGira = () => navigate('/giras/reservar-gira');

  return (
    <div
      ref={miRef}
      id="CartForReserve"
      className="border p-3 rounded-4 my-5 mx-2 bg-white"
    >
      <p className="fw-bold fs-5">{title}</p>

      <Info icon={<FaRegHourglassHalf />} text={giraSelected.duration} />

      {/* <Info icon={<BsCheck2 />} text="Crucero turistico" /> */}
      <Info icon={<IoLanguageOutline />} text="Opciones de idioma: Español" />

      <button
        className="bg-transparent d-flex align-items-center text-white w-100 border border-black rounded-3 p-2 my-3"
        onClick={handleClickViewSeleccionarPersonas}
      >
        <BsPersonFill className="text-black fs-4" />
        <div className="text-black ms-2">
          <p className="m-0 text-secondary text-start" style={{ fontSize: 10 }}>
            Personas
          </p>
          <p className="m-0" style={{ fontSize: 14 }}>
            {countPersons} adulto
            {countChildren > 0 ? `, ${countChildren} niño` : ''}
            {countBabies > 0 ? `, ${countBabies} bebe` : ''}
          </p>
        </div>
      </button>

      <Info icon={<BsCalendarRange />} text={`fecha: ${fecha}`} />

      <Info icon={<TbClockHour5 />} text={`hora: ${hora}`} />

      <p className="fw-bold mt-4 ">Detalles del precio</p>

      {countPersons ? (
        <PriceView
          head={`$${priceAdulto} x ${countPersons} adultos`}
          content={`$${priceAdulto * countPersons}`}
        />
      ) : (
        <></>
      )}

      {countChildren ? (
        <PriceView
          head={`$${priceChild} x ${countChildren} niños`}
          content={`$${priceChild * countChildren}`}
        />
      ) : (
        <></>
      )}

      {countBabies ? (
        <PriceView
          head={`$${priceBebe} x ${countBabies} bebe`}
          content={`$${priceBebe * countBabies}`}
        />
      ) : (
        <></>
      )}

      <hr />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="m-0 fw-medium">Total</p>
        <p className="m-0 fs-1 fw-bold">
          $
          {priceAdulto * countPersons +
            priceChild * countChildren +
            priceBebe * countBabies}
        </p>
      </div>

      {canCancelFree ? (
        <div className="d-flex flex-column align-items-end">
          <div className="d-flex align-items-center gap-2 mb-2">
            <RiInformationLine className="text-success" />
            <p className="m-0 w-auto" style={{ fontSize: 12 }}>
              Cancelacion gratuita
            </p>
          </div>
          <p style={{ fontSize: 12 }}>Hasta el {dateLimitForCancel}</p>
        </div>
      ) : (
        <></>
      )}

      <input
        onClick={handleClickGoToReservarGira}
        className="border-0 w-100 bg-color text-white rounded-5 p-2 fs-5 fw-medium"
        type="button"
        value="Reservar"
      />
    </div>
  );
};

export default CartForReserve;
