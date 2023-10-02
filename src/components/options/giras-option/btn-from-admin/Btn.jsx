import React from 'react';

// React-router-dom
import { Link } from 'react-router-dom';

const Btn = ({ text, link }) => {
  return (
    <Link to={link}>
      <button className="fs-6 bg-color p-3 border-0 rounded-5 fw-medium fs-5 shadow-lg">
        {text}
      </button>
    </Link>
  );
};

export default Btn;
