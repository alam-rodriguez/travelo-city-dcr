import React from 'react';

import { useNavigate } from 'react-router-dom';

const useAdmin = () => {
  const navigate = useNavigate();

  const passwordForSignIn = () => {
    const pass = prompt('Contraseña');
    if (pass != '1234567890') {
      alert('Contraseña incorrecta');
      navigate('/');
    }
  };

  return { passwordForSignIn };
};

export default useAdmin;
