import React from 'react';

// Icon
import { BsChevronRight } from 'react-icons/bs';

const GiraInfo2 = ({ giraRate, giraOpinions }) => {
  return (
    <>
      <p>
        <span className="fw-bold fs-3">{giraRate}/5</span> {giraOpinions}
        opiniciones de TraveloCity
      </p>
      <div className="d-flex align-items-center color-1">
        <p className="m-0">ver todas las opiniones</p>
        <BsChevronRight />
      </div>
    </>
  );
};

export default GiraInfo2;
