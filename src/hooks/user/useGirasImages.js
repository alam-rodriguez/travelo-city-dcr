import React from 'react';

// Zustand
import { useImages } from '../../zustand/giras/giras';

// Firebase
import { getImage } from '../../firebase/firestoreGiras/imagenesGira';

const useGirasImages = () => {
  const { images, addImage } = useImages();

  const setImgGira = async (giraId, imgId) => {
    if (images[giraId] && images[giraId][imgId]) return;
    const imgPath = `giras/${giraId}/${imgId}`;
    const imgLink = await getImage(imgPath);
    addImage(giraId, imgId, imgLink);
    console.log(imgLink);
  };

  return { setImgGira };
};

export default useGirasImages;
