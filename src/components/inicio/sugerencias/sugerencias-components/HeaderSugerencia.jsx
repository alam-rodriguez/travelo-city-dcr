import React from 'react';

// Icon
import { MdArrowBackIosNew } from 'react-icons/md';

// React-router-dom
import { useNavigate } from 'react-router-dom';

const HeaderSugerencia = () => {
  const navigate = useNavigate();

  return (
    <header className="position-relative py-3 border-bottom">
      <MdArrowBackIosNew
        className="display-6 color-1"
        onClick={() => navigate('/')}
      />
      <h3 className="m-0 position-absolute start-50 top-50 translate-middle">
        Sugerencias
      </h3>
    </header>
  );
};

export default HeaderSugerencia;
