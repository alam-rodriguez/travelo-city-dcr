import React from 'react';

const BtnAction = ({ text, action }) => {
  return (
    <button
      className="w-100 bg-color border rounded-3 fs-4 p-2 fw-medium"
      onClick={action}
    >
      {text}
    </button>
  );
};

export default BtnAction;
