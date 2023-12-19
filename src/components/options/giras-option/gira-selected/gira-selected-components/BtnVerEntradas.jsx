import React from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { useInfoUser } from '../../../../../zustand/user/user';

const BtnVerEntradas = (currentId) => {
  const navigate = useNavigate();

  const { type } = useInfoUser();

  const handleClick = () => {
    navigate(`/admin-options/list-giras-for-reservations/${currentId}`);
    console.log('first');
  };

  if (type == 'admin' || type == 'semi-admin')
    return (
      <input
        onClick={handleClick}
        className="bg-secondary border-0 shadow-lg w-100 bg-color text-white rounded-5 p-2 fs-5 fw-medium"
        type="button"
        value="Ver reservaciones"
      />
    );
};

export default BtnVerEntradas;
