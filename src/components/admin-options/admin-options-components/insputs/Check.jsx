import React from 'react';

const Check = ({
  id,
  defaultChecked = false,
  checked = false,
  info,
  addGira,
  removeGira,
}) => {
  const handleClick = (e) => {
    if (e.target.checked) addGira(id);
    else removeGira(id);

    console.log(e.target.checked);
  };

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        checked={checked}
        // defaultChecked={defaultChecked}
        id={id}
        onChange={handleClick}
      />
      <label className="form-check-label" htmlFor={id}>
        {info}
      </label>
    </div>
  );
};

export default Check;
