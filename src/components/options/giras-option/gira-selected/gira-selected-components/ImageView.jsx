import React, { useEffect } from 'react';
import { useImages } from '../../../../../zustand/giras/giras';
import { getImage } from '../../../../../firebase/firestoreGiras/imagenesGira';

const ImageView = ({ giraId, imageId, imgPath }) => {
  const { images, addImage } = useImages();

  useEffect(() => {
    const f = async () => {
      if (images[giraId] && images[giraId][imageId]) return;
      console.log('Cargando imagen');
      // console.log(giraId);
      // console.log(imageId);
      // console.log(imgPath);
      const res = await getImage(imgPath);
      // console.log(res);
      addImage(giraId, imageId, res);
    };
    f();
  }, []);

  const click = () => {
    console.log(images);
  };

  if (images[giraId] != undefined && images[giraId][imageId])
    return (
      <img
        onClick={click}
        src={images[giraId][imageId]}
        className="w-100- h-100- object-fit-cover- "
      />
    );
};

export default ImageView;
