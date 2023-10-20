import React from 'react';

const TextArea = ({ id, label, placeholder, value, handleChange }) => {
  return (
    <div className="my-4">
      <label className="fw-medium fs-4 mb-2" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="w-100 bg-transparent border border-secondary text-black rounded-3 p-2"
        style={{ height: 300 }}
        placeholder={placeholder}
        minLength={10}
        required
        id={id}
        onChange={(e) => handleChange(e.target.value)}
        value={value}
      ></textarea>
    </div>
  );
};

export default TextArea;
