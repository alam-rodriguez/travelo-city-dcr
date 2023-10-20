import React from 'react';

// Components
import ItemList from './ItemList';

const ListViwerInHome = ({ title, content }) => {
  return (
    <div className="my-5">
      <p className="m-0 fw-medium mb-2">{title}</p>
      <div className="d-flex overflow-scroll gap-3" style={{ height: 240 }}>
        {content.map((gira) => (
          <ItemList
            key={gira.currentId}
            id={gira.id}
            giraId={gira.currentId}
            place={gira.city}
            country={gira.country}
            imgId={gira.coverImageId}
            imgPath={`giras/${gira.id}/${gira.coverImageId}`}
            gira={gira}
          />
        ))}
      </div>
    </div>
  );
};

export default ListViwerInHome;
