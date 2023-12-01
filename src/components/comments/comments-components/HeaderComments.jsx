import React from 'react';

// Icon
import { AiOutlineClose } from 'react-icons/ai';

// React-router-dom
import { useNavigate } from 'react-router-dom';

const HeaderComments = ({ setRecienteOrderBy = Function(), link = -1 }) => {
  const navigate = useNavigate();

  const back = () => {
    setRecienteOrderBy();
    navigate(link);
  };

  return (
    <header className="position-fixed bg-white w-100 d-flex align-items-center gap-3 py-3">
      <AiOutlineClose className="fs-4 color-1" onClick={back} />
      <p className="m-0 fw-medium">Opiniones</p>
    </header>
  );
};

export default HeaderComments;
