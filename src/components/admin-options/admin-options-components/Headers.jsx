import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Headers = ({ text, link }) => {
  const navigate = useNavigate();

  const handleClickBack = () => navigate(link);

  return (
    <header className="position-relative border-bottom border-secondary py-3">
      <MdArrowBackIosNew
        className="display-6 color-1"
        onClick={handleClickBack}
      />
      <p className="m-0 position-absolute start-50 top-50 translate-middle fw-medium fs-3">
        {text}
      </p>
    </header>
  );
};

export default Headers;
