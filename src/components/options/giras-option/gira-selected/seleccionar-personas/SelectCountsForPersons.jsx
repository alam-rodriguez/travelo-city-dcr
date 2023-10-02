import React from 'react';

// Icons
import { GrSubtractCircle } from 'react-icons/gr';
import { IoMdAddCircleOutline } from 'react-icons/io';

const SelectCountsForPersons = ({
  text,
  subtext,
  decrementFun,
  count,
  incrementFun,
  price,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div className="d-flex flex-column">
        <p className="m-0">
          {text} (${price * count})
        </p>
        <p className="m-0" style={{ fontSize: 14 }}>
          {subtext}
        </p>
      </div>
      <div className="d-flex align-items-center gap-3">
        <GrSubtractCircle className="display-4" onClick={decrementFun} />
        <p className="m-0 fs-3">{count}</p>
        <IoMdAddCircleOutline onClick={incrementFun} className="display-2" />
      </div>
    </div>
  );
};

export default SelectCountsForPersons;
