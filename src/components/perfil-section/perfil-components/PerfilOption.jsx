import React from 'react';

// React-router-do,
import { useNavigate } from 'react-router-dom';

// icons
import { GrFormNext } from 'react-icons/gr';

const PerfilOption = ({ icon, text, link }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(link);

  return (
    <div
      className="bg-white d-flex justify-content-between align-items-center shadow-sm rounded-4 p-3 my-3"
      onClick={handleClick}
    >
      <div className="d-flex gap-3 align-items-center">
        {icon}
        <p className="m-0">{text}</p>
      </div>
      <GrFormNext className="fs-4" />
    </div>
  );
};

export default PerfilOption;
