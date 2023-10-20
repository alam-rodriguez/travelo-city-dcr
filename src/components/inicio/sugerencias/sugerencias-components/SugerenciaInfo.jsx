import React from 'react';

const SugerenciaInfo = ({ img, imgText, title, subTitle }) => {
  return (
    <div className="my-4">
      <div className="position-relative bg-danger- rounded-5 overflow-hidden">
        <img
          className="w-100 object-fit-cover"
          style={{ height: 300 }}
          src={img}
        />
        <div className="bg position-absolute start-0 top-0 w-100 h-100">
          <p className="m-3 fs-1 fw-bold text-white">{imgText}</p>
        </div>
      </div>

      <p className="m-0 fw-medium mt-1 display-3">{title}</p>
      <p className="m-0">{subTitle}</p>
    </div>
  );
};

export default SugerenciaInfo;
