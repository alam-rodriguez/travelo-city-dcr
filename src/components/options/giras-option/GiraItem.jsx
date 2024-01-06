import React, { useEffect, useState } from 'react';

// Icons
import { HiOutlineHeart } from 'react-icons/hi';
import { TbClockHour5 } from 'react-icons/tb';
import { FaHeart } from 'react-icons/fa';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { useGiras, useImages } from '../../../zustand/giras/giras';

// Firebase
import { getImage } from '../../../firebase/firestoreGiras/imagenesGira';
import { useInfoUser } from '../../../zustand/user/user';
import useUserInfoHook from '../../../hooks/user/useUserInfoHook';

const GiraItem = ({
  giraId,
  currentId,
  imgId,
  imgPath,
  title,
  description,
  duration,
  hasVotes,
  rate,
  votes,
  canCancel,
  price,
  fechaDateInMilliseconds,
  userType,
  gira,
}) => {
  const navigate = useNavigate();

  const { images, addImage } = useImages();

  const { favoritesGirasId, userSawGiras } = useInfoUser();

  const { addOrDeleteFaboriteGira } = useUserInfoHook();

  useEffect(() => {
    // console.log(imgPath);
    const f = async () => {
      // if(images[giraId][imgId])
      // console.log(images[giraId][imgId]);
      if (images[giraId] && images[giraId][imgId]) return;
      console.log('Decargando imagen');
      // console.log(images[giraId]);
      // if(images[giraId] ) return;
      // if (images[giraId][imgId] );
      // console.log(images[giraId] [imgId]);
      const imgLink = await getImage(imgPath);
      addImage(giraId, imgId, imgLink);
      // console.log(giraId, imgId, imgLink);
      console.log(1 + 1);
    };
    f();
  }, []);

  const [giraIsDone, setGiraIsDone] = useState(false);

  useEffect(() => {
    const fechaActualInMilliseconds = new Date().getTime();
    if (fechaActualInMilliseconds > fechaDateInMilliseconds)
      setGiraIsDone(true);
    console.log(fechaDateInMilliseconds);
  }, []);

  // useEffect(() => {
  //   // if (images[giraId] != undefined) console.log(images[giraId][imgId]);
  //   // console.log(console.log(images[giraId] ?? [imgId]));
  // }, [images]);

  const { setGiraSelected } = useGiras();

  const handleClickGira = (e) => {
    // return;
    console.log(e.target.classList[0]);
    if (
      e.target.classList[0] == 'heart' ||
      e.target.classList[0] == undefined
    ) {
      addOrDeleteFaboriteGira(currentId);
      return;
    }

    // console.log(gira);
    setGiraSelected(gira);
    navigate(`/giras/${currentId}`);
  };

  const handleClickAddToFavorite = () => {
    console.log(currentId);
  };

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    let isFavorite = false;
    if (favoritesGirasId.includes(currentId)) isFavorite = true;
    else isFavorite = false;
    setIsFavorite(isFavorite);
  }, [favoritesGirasId]);

  if (!gira.showGira) return <></>;

  return (
    <div
      className={`${
        !userSawGiras ? 'scale-up-center' : ''
      } z-1 rounded-4 overflow-hidden border position-relative my-2 shadow overflow-y-scroll ${
        giraIsDone && (userType == 'admin' || userType == 'semi-admin')
          ? 'bg-danger-subtle'
          : ''
      }`}
      style={{ width: '48%', height: 390 }}
      // style={{ width: '48%', height: 300 }}
      onClick={handleClickGira}
    >
      <div
        className="bg-white position-absolute rounded-circle d-flex justify-content-center align-items-center"
        style={{ top: 10, right: 10, height: 30, width: 30 }}
        // onClick={handleClickAddToFavorite}
      >
        {!isFavorite ? (
          <HiOutlineHeart className="heart fs-3 -text-danger" />
        ) : (
          <FaHeart className="heart fs-5 text-danger" />
        )}
      </div>
      {images[giraId] != undefined && images[giraId][imgId] != undefined ? (
        <img
          src={images[giraId][imgId]}
          className="w-100 object-fit-cover "
          style={{ height: '37%' }}
          // style={{ height: '47%' }}
        />
      ) : (
        <div className="w-100" style={{ height: '37%' }}></div>
      )}
      <div className="m-2">
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
        {votes > 0 ? (
          <p className="mb-5" style={{ fontSize: 13 }}>
            <span className="fw-bold">{rate}/5</span> ({votes})
          </p>
        ) : null}
        <div className="position-absolute" style={{ bottom: 15 }}>
          {canCancel ? (
            <p className="m-0 text-success fw-medium" style={{ fontSize: 11 }}>
              Cancelacion gratuita disponible
            </p>
          ) : null}
          <p className="m-0 fw-bold fs-1">${price}</p>
          <p className="m-0" style={{ fontSize: 12 }}>
            por adulto
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiraItem;
