import React from 'react';

// Icon
import { TiDelete } from 'react-icons/ti';

const InputSelectOneImage = ({
  id,
  coverImage,
  setCoverImage,
  deleteCoverImage,
  required = false,
}) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith('image/')) setCoverImage(file);

    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    // }
  };

  return (
    <div className="w-100" style={{ height: 240 }}>
      <input
        id={id}
        required={required}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div
        className=""

        // style={{ height: 240 }}
      >
        {/* {imagesContainer.map((imageUrl, index) => ( */}
        <div className="position-relative">
          {/* {coverImage.name != undefined ? (
            <> */}
          {/* <TiDelete
            className="position-absolute display-1 end-0-top-0 "
            style={{ top: 10, right: 10 }}
            onClick={deleteCoverImage}
          /> */}
          <img
            className="h-100- w-100 object-fit-cover"
            style={{ width: '', height: 240 }}
            src={
              coverImage.name == undefined
                ? coverImage
                : URL.createObjectURL(coverImage)
            }
            alt={`Imagen de cover`}
          />
          {/* </>
          ) : (
            <></>
          )} */}
          {/* <img
            className="h-100 object-fit-cover border border-black p-2- my-1"
            style={{ width: '90vw' }}
            src={`${
              coverImage.name != undefined
                ? URL.createObjectURL(coverImage)
                : null
            }`}
            alt={`Imagen de cover`}
          /> */}
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default InputSelectOneImage;
