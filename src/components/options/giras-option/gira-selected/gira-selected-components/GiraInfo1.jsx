import React from 'react';

const GiraInfo1 = ({ giraDescription, giraPrice }) => {
  return (
    <>
      <h3 className="m-0" style={{ paddingTop: 320 }}>
        {giraDescription}
      </h3>

      <p className="m-0 fs-6">
        <span className="fw-bold">${giraPrice}</span> por adulto
      </p>
    </>
  );
};

export default GiraInfo1;
