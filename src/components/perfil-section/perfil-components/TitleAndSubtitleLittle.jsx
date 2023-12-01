import React from 'react';

const TitleAndSubtitleLittle = ({ keyValue, value }) => {
  return (
    <div className="my-2">
      <p className="m-0 fw-medium" style={{ fontSize: 14 }}>
        {keyValue}
      </p>
      <p className="m-0" style={{ fontSize: 14 }}>
        {value}
      </p>
    </div>
  );
};

export default TitleAndSubtitleLittle;
