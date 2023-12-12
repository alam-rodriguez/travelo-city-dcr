import React from 'react';

const ImageCharging = ({ mt = 4, w = 100, h = 200, bg = 'gray', r = 0 }) => {
  return (
    <div
      className={`mt-${mt} rounded-${r} `}
      style={{
        width: w + '%',
        minWidth: w + '%',
        height: h + 'px',
        background: bg,
      }}
    ></div>
  );
};

export default ImageCharging;
