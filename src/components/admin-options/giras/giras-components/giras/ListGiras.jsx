import React from 'react';

const ListGiras = ({
  gira,
  currentId,
  title,
  description,
  price,
  handleClick,
}) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center border-bottom py-3"
      onClick={() => {
        console.log(gira);
        handleClick(currentId);
        console.log(currentId);
      }}
    >
      <div>
        <p className="m-0 fw-medium">{title}</p>
        <p className="m-0" style={{ fontSize: 14 }}>
          {description}
        </p>
      </div>
      <p className="m-0 fw-bold">${price}</p>
    </div>
  );
};

export default ListGiras;
