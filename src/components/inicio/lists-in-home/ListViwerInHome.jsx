import React from 'react';
import ItemList from './ItemList';

const ListViwerInHome = ({ title, content }) => {
  return (
    <div>
      <p>{title}</p>
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
