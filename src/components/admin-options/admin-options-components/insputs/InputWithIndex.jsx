import React from 'react';

const InputWithIndex = ({
  id,
  label,
  type = 'text',
  i,
  value,
  placeholder,
  minLength = 3,
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
        type={type}
        value={value}
        placeholder={placeholder}
        id={id}
        onChange={(e) => {
          console.log(i);
          handleChange(i, e.target.value);
        }}
      />
    </div>
  );
};

export default InputWithIndex;
