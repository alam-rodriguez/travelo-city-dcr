import React from 'react';

const BtnAction = ({ text, action, bg }) => {
  return (
    <input
      type="button"
      value={text}
      className={`${bg} border-0 rounded-3 p-2 w-100 fs-4 my-4`}
      onClick={action}
    />
  );
};

export default BtnAction;
