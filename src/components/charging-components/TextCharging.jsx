import React from 'react';

const TextCharging = ({
  mt = 0,
  center = false,
  h = 20,
  bg = 'gray',
  w = 50,
}) => {
  return (
    <div
      className={`mt-${mt} ${center ? 'mx-auto' : ''}`}
      style={{ height: h + 'px', background: bg, width: w + '%' }}
    ></div>
  );
};

export default TextCharging;
