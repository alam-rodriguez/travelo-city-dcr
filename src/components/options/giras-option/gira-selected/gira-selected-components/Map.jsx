import React from 'react';

const Map = ({ GiraUrl }) => {
  return (
    <div className="border" style={{ height: 201 }}>
      <iframe
        className="w-100 h-100"
        src={GiraUrl}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
