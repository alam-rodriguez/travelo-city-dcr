import React from 'react';

const Input = ({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  minLength = 3,
  maxLength = 1000000,
  handleChange,
}) => {
  return (
    <div className="my-4">
      <label className="fw-medium fs-4 mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-100 bg-transparent border border-secondary text-black rounded-3 p-2"
        required
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
