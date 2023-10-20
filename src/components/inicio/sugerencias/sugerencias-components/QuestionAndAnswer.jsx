import React from 'react';

const QuestionAndAnswer = ({ question, answer }) => {
  return (
    <div className="my-2">
      <p className="m-0 fw-medium">{question}</p>
      <p className="m-0" style={{ fontSize: 14 }}>
        {answer}
      </p>
    </div>
  );
};

export default QuestionAndAnswer;
