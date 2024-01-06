import React, { useEffect, useState } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Icons
import { FaHeart } from 'react-icons/fa';

// Zustands
import { useImages } from '../../zustand/giras/giras';

// Hooks
import useGirasImages from '../../hooks/user/useGirasImages';

const FavoriteGira = ({
  giraId,
  currentId,
  imgId,
  title,
  rate,
  votes,
  date,
  dateInMilliseconds,
}) => {
  const navigate = useNavigate();

  const { images, addImage } = useImages();

  const { setImgGira } = useGirasImages();

  const [isAvailable, setIsAvailable] = useState(true);
  useEffect(() => {
    setImgGira(giraId, imgId);
    const fechaInMilliseconds = new Date().getTime();
    if (fechaInMilliseconds > dateInMilliseconds) setIsAvailable(false);
    console.log(fechaInMilliseconds);
  }, []);

  const handleClick = () => navigate(`/giras/${currentId}`);

  return (
    <div
      className="d-flex border rounded-3 gap-3 p-2 position-relative my-3"
      style={{ height: 170 }}
      onClick={handleClick}
    >
      {images[giraId] != undefined && images[giraId][imgId] != undefined ? (
        <img
          className="object-fit-cover rounded-3"
          style={{ width: '22%' }}
          src={images[giraId][imgId]}
          alt=""
        />
      ) : (
        <div
          className="h-100 rounded-3"
          style={{ width: '22%', background: 'grey' }}
        ></div>
      )}

      <div>
        <div className="d-flex gap-1 align-items-center">
          <FaHeart className="text-danger" style={{ fontSize: 13 }} />
          <p className="m-0" style={{ fontSize: 13 }}>
            Guaradado
          </p>
        </div>
        <p className="fw-bold m-0 mt-1 fs-6">{title}</p>
        <p className="m-0">
          {rate}/5 ({votes} opiniciones)
        </p>
        <p className="m-0">{date}</p>
      </div>
      <p
        className="position-absolute end-0 bottom-0 m-3 text-secondary"
        style={{ fontSize: 13 }}
      >
        {isAvailable ? 'Disponible' : 'No disponible'}
      </p>
    </div>
  );
};

export default FavoriteGira;
