import React from 'react';

// React-Router-dom
import { useNavigate } from 'react-router-dom';

const Option = ({ icon, text, link }) => {
  const navigate = useNavigate();

  const handleClickOptiona = () => navigate(link);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center border rounded-4 p-4"
      // style={{ width: '30%' }}
      style={{ width: '60%' }}
      onClick={handleClickOptiona}
    >
      {icon}
      <p className="m-0 mt-2" style={{ fontSize: 12 }}>
        {text}
      </p>
    </div>
  );
};

export default Option;
