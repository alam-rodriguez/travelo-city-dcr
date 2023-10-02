import React from 'react';

const DurationItem = ({ id, label, minI = 0, maxI, value, onChange }) => {
  return (
    <div className="col-4 flex-column">
      <div>
        <label className="text-center" htmlFor={id}>
          {label}
        </label>
      </div>
      <select
        className="w-75 bg-white text-black border border-secondary"
        id={id}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
      >
        {(() => {
          const list = [];
          for (let i = minI; i < maxI; i++) {
            list.push(
              <option key={i} value={i}>
                {i}
              </option>,
            );
          }
          return list;
        })()}
      </select>
    </div>
  );
};

export default DurationItem;
