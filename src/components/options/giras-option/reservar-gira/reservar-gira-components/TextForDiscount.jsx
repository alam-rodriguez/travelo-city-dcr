import React from 'react';

const TextForDiscount = ({ discount, text }) => {
  if (discount == 0) return <></>;
  return (
    <p className="m-0 fw-medium text-secondary" style={{ fontSize: 12 }}>
      Has obtenido un: <span className="fw-bold">{discount} % </span>
      {text}
    </p>
  );
};

export default TextForDiscount;
