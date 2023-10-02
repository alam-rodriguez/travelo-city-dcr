import React from 'react';

// Icons
import { AiFillHome } from 'react-icons/ai';
import { FaSuitcase } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';
import { TbSearch } from 'react-icons/tb';

// Components
import NavBarItem from './NavBarItem';

import { useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  if (
    location.pathname != '/' &&
    location.pathname != '/buscar' &&
    location.pathname != '/mis-viajes' &&
    location.pathname != '/notificaciones' &&
    location.pathname != '/perfil'
  ) {
    return <></>;
  }

  return (
    <nav className="d-flex justify-content-around position-fixed start-0 bottom-0 w-100 pb-4 bg-white">
      <NavBarItem
        icon={<AiFillHome className="fs-2" />}
        text="Inicio"
        link="/"
      />
      <NavBarItem
        icon={<TbSearch className="fs-2" />}
        text="Buscar"
        link="/buscar"
      />
      <NavBarItem
        icon={<FaSuitcase className="fs-2" />}
        text="Mis viajes"
        link="/mis-viajes"
      />
      <NavBarItem
        icon={<IoMdNotifications className="fs-2" />}
        text="Notificaciones"
        link="/notificaciones"
      />
      <NavBarItem
        icon={<MdAccountCircle className="fs-2" />}
        text="Cuenta"
        link="/perfil"
      />
    </nav>
  );
};

export default NavBar;
