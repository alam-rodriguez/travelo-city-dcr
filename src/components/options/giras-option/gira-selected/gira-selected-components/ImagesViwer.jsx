import React, { useEffect } from 'react';

// Icon
import { FaImages } from 'react-icons/fa';

// Images
import { useImages } from '../../../../../zustand/giras/giras';
import ImageView from './ImageView';

const ImagesViwer = ({ giraId, coverImageId, imagesIds }) => {
  const { images, addImage } = useImages();

  useEffect(() => {
    // if (images[giraId][i]) console.log(imagesIds);
    // console.log(images);
  }, []);

  return (
    <div className="position-absolute start-0 overflow-hidden- slider-container">
      <div
        className="img-div d-flex- overflow-x-scroll- gap-1- bg-danger- w-100- slider "
        style={{ marginTop: 70, height: 240 }}
      >
        <ImageView
          giraId={giraId}
          imageId={coverImageId}
          imgPath={`giras/${giraId}/${coverImageId}`}
        />
        {imagesIds.map((imageId) => (
          <ImageView
            key={imageId}
            giraId={giraId}
            imageId={imageId}
            imgPath={`giras/${giraId}/${imageId}`}
          />
        ))}

        <div
          className="z-1 position-absolute d-flex align-items-center text-white fs-3"
          style={{ bottom: 10, right: 10 }}
        >
          <FaImages />
          <p className="m-0">{imagesIds.length + 1}+</p>
        </div>
        <div
          className="position-absolute w-100 h-100 bg-negro"
          style={{ top: 0, right: 0 }}
        ></div>
      </div>
    </div>
  );
};

export default ImagesViwer;
