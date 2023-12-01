import React from 'react';

// Icon
import { MdArrowBackIosNew } from 'react-icons/md';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

const HeaderReserveGira = ({ resetNames }) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
    // resetNames();
  };

  return (
    <header className="d-flex border-bottom border-secondary justify-content-between align-items-center position-fixed start-0 w-100 py-4 bg-white z-1">
      <MdArrowBackIosNew
        className="display-6 color-1"
        onClick={handleClickBack}
      />
      <p className="m-0 fs-5 fw-medium position-fixed start-50 translate-middle-x w-50 text-center ">
        Compra segura
      </p>
    </header>
  );
};

export default HeaderReserveGira;
