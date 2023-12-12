import React from 'react';

const ImportantInformationSection = ({
  description,
  city,
  date,
  usefulInformation,
}) => {
  return (
    <div
      className="bg-white shadow p-3 overflow-scroll my-3"
      style={{ height: 200 }}
    >
      <p>Informacion importante sobre la actividad</p>
      <p>
        {description}({city}) - {date}
      </p>
      <ul>
        {usefulInformation.map((information) => (
          <li>{information}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImportantInformationSection;
