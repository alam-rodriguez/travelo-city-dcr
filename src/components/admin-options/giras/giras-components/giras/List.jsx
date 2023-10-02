import React from 'react';

// Icons
import { GrSubtractCircle } from 'react-icons/gr';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

const List = ({
  head,
  decrementFun,
  array,
  incrementFun,
  placeholder,
  onChange,
}) => {
  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="m-0 fw-medium fs-4">{head}</p>
        <div className="d-flex gap-3 align-items-center">
          <GrSubtractCircle className="display-6" onClick={decrementFun} />
          <MdOutlineAddCircleOutline
            className="display-5"
            onClick={incrementFun}
          />
        </div>
      </div>
      {array.map((data, i) => (
        <input
          id={`${head} ${i}`}
          key={i}
          value={data}
          className="w-100 my-1 bg-transparent border border-secondary rounded-3 p-2 text-black"
          required
          minLength={3}
          placeholder={placeholder}
          type="text"
          onChange={(e) => onChange(i, e.target.value)}
        />
      ))}
    </div>
  );
};

export default List;
