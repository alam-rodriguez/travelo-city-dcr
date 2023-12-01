import React from 'react';

const TitleAndSubtitle = ({ title, subTitle }) => {
  return (
    <div>
      <p className="m-0 fs-2 fw-medium">{title}</p>
      <p className="m-0 fw-light-" style={{ fontSize: 14 }}>
        {subTitle}
      </p>
    </div>
  );
};

export default TitleAndSubtitle;
