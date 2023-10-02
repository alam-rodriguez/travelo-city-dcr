import React from 'react';

const PriceView = ({ head, content }) => {
  return (
    <div className="d-flex justify-content-between my-3">
      <p className="m-0">{head}</p>
      <p className="m-0">{content}</p>
    </div>
  );
};

export default PriceView;
