import React, { useEffect } from 'react';

// React-icons
import { HiOutlineHeart } from 'react-icons/hi';
import { TbClockHour5 } from 'react-icons/tb';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { useGiras, useImages } from '../../../../zustand/giras/giras';

// Firebase
import { getImage } from '../../../../firebase/firestoreGiras/imagenesGira';

const GiraView = ({
  giraId,
  currentId,
  imgId,
  imgPath,
  title,
  duration,
  hasVotes,
  rate,
  votes,
  canCancel,
  price,
  gira,
}) => {
  const navigate = useNavigate();

  const { images, addImage } = useImages();
  const { setGiraSelected } = useGiras();

  useEffect(() => {
    if (images[giraId] && images[giraId][imgId]) return;

    const f = async () => {
      console.log('Decargando imagen');
      const imgLink = await getImage(imgPath);
      addImage(giraId, imgId, imgLink);
    };
    f();
  }, []);

  const handleClickGira = () => {
    setGiraSelected(gira);
    navigate(`/giras/${currentId}`);
  };

  return (
    <div
      className="scale-up-center rounded-4 overflow-hidden border position-relative my-2 shadow overflow-y-scroll w-100-"
      style={{ height: 370, minWidth: '80%' }}
      onClick={handleClickGira}
    >
      {images[giraId] != undefined && images[giraId][imgId] != undefined ? (
        <img
          src={images[giraId][imgId]}
          className="w-100 object-fit-cover"
          style={{ height: '45%' }}
        />
      ) : (
        <div className="w-100" style={{ height: '37%' }}></div>
      )}

      <div className="m-2">
        <div
          className="position-absolute bg-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ top: 10, right: 10, height: 30, width: 30 }}
        >
          <HiOutlineHeart className="fs-3" />
        </div>
        <p className="m-0 fw-bold mb-2" style={{ fontSize: 12 }}>
          {title}
        </p>
        <div
          className="d-flex align-items-center gap-1"
          style={{ fontSize: 13 }}
        >
          <TbClockHour5 />
          <p className="m-0">{duration}</p>
        </div>
        {hasVotes ? (
          <p className="mb-5-" style={{ fontSize: 13 }}>
            <span className="fw-bold">{rate}/5</span> ({votes})
          </p>
        ) : (
          <></>
        )}
        <div className="position-absolute" style={{ bottom: 15 }}>
          {canCancel ? (
            <p className="m-0 text-success fw-medium" style={{ fontSize: 11 }}>
              Cancelacion gratuita disponible
            </p>
          ) : (
            <></>
          )}
          <p className="m-0 fw-bold fs-1">${price}</p>
          <p className="m-0 text-secondary" style={{ fontSize: 13 }}>
            por adulto
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiraView;
