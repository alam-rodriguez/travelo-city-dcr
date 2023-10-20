import React from 'react';

// React-router-dom
import { Route, Routes } from 'react-router-dom';

// Components
import Inicio from '../components/Inicio';
import Buscar from '../components/buscar-section/Buscar';
import MisViajes from '../components/viajes-section/MisViajes';
import GirasPage from '../components/options/giras-option/GirasPage';
import GiraSelected from '../components/options/giras-option/gira-selected/GiraSelected';
import ReservarGira from '../components/options/giras-option/reservar-gira/ReservarGira';

const RoutesForUser = () => {
  return (
    <Routes>
      <Route path="/" Component={Inicio} />
      <Route path="/buscar" Component={Buscar} />
      <Route path="/mis-viajes" Component={MisViajes} />
      <Route path="/giras" Component={GirasPage} />
      <Route path="/giras/:currentId" Component={GiraSelected} />
      <Route path="/giras/reservar-gira" Component={ReservarGira} />
    </Routes>
  );
};

export default RoutesForUser;
