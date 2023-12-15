import React, { useEffect } from 'react';

// React-Router-Dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { useGiras, useImages } from '../../../zustand/giras/giras';
import { getImage } from '../../../firebase/firestoreGiras/imagenesGira';

const ItemList = ({ id, giraId, place, country, imgId, imgPath, gira }) => {
  const navigate = useNavigate();

  const { images, addImage } = useImages();

  useEffect(() => {
    const f = async () => {
      if (images[id] && images[id][imgId]) return;
      console.log('Decargando imagen');
      const imgLink = await getImage(imgPath);
      addImage(id, imgId, imgLink);
    };
    f();
  }, []);

  const { setGiraSelected } = useGiras();

  const handleClickItem = () => {
    setGiraSelected(gira);
    navigate(`/giras/${giraId}`);
    // console.log(images[id]);
  };

  return (
    <div
      className="border rounded-4 overflow-hidden w-100 bg-white div-content-item"
      style={{ minWidth: '100%' }}
      onClick={handleClickItem}
    >
      {/* <img src={item.coverImageId} className="w-100" /> */}
      {images[id] != undefined ? (
        <img
          src={images[id][imgId]}
          className="w-100 object-fit-cover"
          style={{ height: '70%' }}
        />
      ) : (
        <div className="w-100" style={{ height: '70%' }}></div>
      )}

      <div className="my-2 mx-3">
        <p className="m-0 fw-medium" style={{ fontSize: 15 }}>
          {place}
        </p>
        <p className="m-0 mb-3 fw-normal" style={{ fontSize: 14 }}>
          {country}
        </p>
      </div>
    </div>
  );
};

export default ItemList;
