import React from 'react';

// Components
import ItemList from './ItemList';
import ItemListChangin from './ItemListChangin';

const ListViwerInHome = ({ title, content }) => {
  return (
    <div className="my-5">
      <p className="m-0 fw-medium mb-2">{title}</p>
      <div
        className="d-flex overflow-scroll gap-3 div-content"
        style={{ height: 240 }}
      >
        {content.length > 0 ? (
          content.map((gira) => (
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
          ))
        ) : (
          <>
            <ItemListChangin />
            <ItemListChangin />
            <ItemListChangin />
            <ItemListChangin />
          </>
        )}
      </div>
    </div>
  );
};

export default ListViwerInHome;
