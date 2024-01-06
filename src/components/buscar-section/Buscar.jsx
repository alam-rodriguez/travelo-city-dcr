import React, { useEffect } from 'react';

// Icons
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoMdSearch } from 'react-icons/io';

// Components
import OptionsApp from '../inicio/options-app/OptionsApp';
import FavoritesGiras from './FavoritesGiras';

// Hooks
import useUserInfoHook from '../../hooks/user/useUserInfoHook';

// Zustand
import { useInfoUser } from '../../zustand/user/user';

const Buscar = () => {
  return (
    <div>
      <h4 className="text-center border-bottom py-3">Buscar</h4>

      <OptionsApp />

      <div className="text-center mt-5">
        <IoMdSearch className="display-1" />
        <p className="fw-medium m-0 mt-1">Comienza a buscar</p>
        <p className="fw-normal m-0 mt-1">
          Tus busquedas recientes apareceran aqui.
        </p>
      </div>
      <FavoritesGiras />
    </div>
  );
};

export default Buscar;
