import React from 'react';

// Icon
import { AiOutlineClose } from 'react-icons/ai';

const HeaderComments = () => {
  return (
    <header className="position-fixed bg-white w-100 d-flex align-items-center gap-3 py-3">
      <AiOutlineClose className="fs-4 color-1" />
      <p className="m-0 fw-medium">Opiniones</p>
    </header>
  );
};

export default HeaderComments;
