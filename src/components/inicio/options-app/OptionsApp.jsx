import React from 'react';

// Icons
import { FaHotel } from 'react-icons/fa';
import { GiCommercialAirplane } from 'react-icons/gi';
import { BiSolidCar, BiSolidShoppingBags } from 'react-icons/bi';
import { FaTicket } from 'react-icons/fa6';
import { RiShipFill } from 'react-icons/ri';
import { BsFillBuildingsFill } from 'react-icons/bs';

// Components
import Option from './Option';

const OptionsApp = () => {
  return (
    <section className="mt-4 d-flex gap-3 justify-content-evenly justify-content-center flex-wrap">
      {/* <Option
        icon={<BsFillBuildingsFill className="fs-3" />}
        text="Hospedaje"
      /> */}
      {/* <Option icon={<GiCommercialAirplane className="fs-3" />} text="Vuelos" /> */}
      {/* <Option icon={<BiSolidCar className="fs-3" />} text="Autos" /> */}
      <Option icon={<FaTicket className="fs-3" />} text="Giras" link="/giras" />
      {/* <Option icon={<RiShipFill className="fs-3" />} text="Cruceros" /> */}
      {/* <Option icon={<BiSolidShoppingBags className="fs-3" />} text="Paquetes" /> */}
    </section>
  );
};

export default OptionsApp;
