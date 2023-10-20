import React from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

const BtnOptions = ({ text, link }) => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-color border-0 p-2 fs-6 rounded-2 fw-medium"
      style={{ width: '45%' }}
      onClick={() => navigate(link)}
    >
      {text}
    </button>
  );
};

export default BtnOptions;
