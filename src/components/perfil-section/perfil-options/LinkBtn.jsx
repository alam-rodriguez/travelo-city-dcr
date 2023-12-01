import React from 'react';

// Icon
import { IoIosArrowForward } from 'react-icons/io';

const LinkBtn = ({ text, icon }) => {
  return (
    <div className="d-flex justify-content-between border p-3 py-4- rounded-4 my-4">
      <div className="d-flex align-items-center gap-3">
        {icon}
        <p className="m-0 fw-medium " style={{ fontSize: 19 }}>
          {text}
        </p>
      </div>
      <IoIosArrowForward className="fs-3" />
    </div>
  );
};

export default LinkBtn;
