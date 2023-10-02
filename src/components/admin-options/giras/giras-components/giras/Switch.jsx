import React from 'react';

const Switch = ({ id, text, checked, handleChange, fs }) => {
  return (
    <div className={`form-check form-switch my-4 ${fs}`}>
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
      <input
        checked={checked}
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={id}
        onChange={(e) => handleChange(e.target.checked)}
      />
    </div>
  );
};

export default Switch;
