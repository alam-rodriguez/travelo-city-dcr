import React from 'react';

const Inputs = ({
  idName,
  type = 'text',
  head,
  placeholder,
  value = '',
  handleChange,
}) => {
  return (
    <div className="my-4">
      <label className="mb-1 fw-medium" htmlFor={idName}>
        {head}
      </label>
      <input
        className="w-100 bg-transparent border border-secondary rounded-2 p-2 text-black"
        type={type}
        placeholder={placeholder}
        value={value}
        id={idName}
        onChange={handleChange}
      />
    </div>
  );
};

export default Inputs;
