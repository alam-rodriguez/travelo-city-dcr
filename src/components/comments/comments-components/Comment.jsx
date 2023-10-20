import React from 'react';

const Comment = ({
  rate,
  name,
  placeReview,
  dateReview,
  countryPerson,
  comment,
  dateActivity,
}) => {
  return (
    <div className="border-bottom py-4">
      <p className="mb-1 fw-medium" style={{ fontSize: 15 }}>
        {rate}/5
      </p>
      <p className="m-0 fw-medium" style={{ fontSize: 15 }}>
        {name}
      </p>
      <p className="m-0 text-secondary" style={{ fontSize: 14 }}>
        {placeReview}
      </p>
      <p className="m-0 text-secondary" style={{ fontSize: 14 }}>
        {dateReview}
      </p>
      <p className="m-0 text-secondary" style={{ fontSize: 14 }}>
        {countryPerson}
      </p>
      <p className="mb-1" style={{ fontSize: 15 }}>
        {comment}
      </p>
      <p className="m-0 text-secondary" style={{ fontSize: 12 }}>
        Activity date: {dateActivity}
      </p>
    </div>
  );
};

export default Comment;
