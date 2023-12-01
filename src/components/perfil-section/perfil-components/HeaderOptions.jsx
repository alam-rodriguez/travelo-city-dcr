import React from 'react';

// Icon
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const HeaderOptions = ({ text, link = -1 }) => {
  const navigate = useNavigate();

  const goToPerfil = () => navigate(link);

  return (
    <header className="d-flex align-items-center my-1 gap-3">
      <IoMdArrowBack className="color-1 fs-3 mt-1" onClick={goToPerfil} />
      <p className="m-0 fs-1 fw-medium">{text}</p>
    </header>
  );
};

export default HeaderOptions;
