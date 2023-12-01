import React from 'react';

// Icon
import { BsChevronRight } from 'react-icons/bs';

// React-router-dom
import { useNavigate } from 'react-router-dom';

const GiraInfo2 = ({ giraId, giraCurrentId, giraRate, giraOpinions }) => {
  const navigate = useNavigate();

  const seeComments = () =>
    navigate(`/giras/${giraId}/${giraCurrentId}/comments`);

  return (
    <>
      <p>
        <span className="fw-bold fs-3">{giraRate}/5</span> {giraOpinions}{' '}
        opiniciones de TraveloCity
      </p>
      <div className="d-flex align-items-center color-1" onClick={seeComments}>
        <p className="m-0">ver todas las opiniones</p>
        <BsChevronRight />
      </div>
    </>
  );
};

export default GiraInfo2;
