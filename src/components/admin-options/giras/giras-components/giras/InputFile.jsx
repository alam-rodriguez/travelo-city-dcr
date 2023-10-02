import React from 'react';

// Icon
import { TiDelete } from 'react-icons/ti';

const InputFile = ({
  id,
  addImages,
  imagesContainer,
  onClickToDelete,
  required = false,
}) => {
  const handleImageChange = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) addImages(file);
    }
  };

  return (
    <div className="mt-5">
      <input
        id={id}
        required={required}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div className="d-flex overflow-x-scroll gap-1" style={{ height: 240 }}>
        {imagesContainer.map((imageUrl, index) => (
          <div className="position-relative" key={index}>
            <TiDelete
              className="position-absolute display-1 end-0-top-0 "
              style={{ top: 10, right: 10 }}
              onClick={() => onClickToDelete(index)}
            />
            <img
              className="h-100 object-fit-cover border border-black p-2- my-1"
              style={{ width: '90vw' }}
              src={`${
                imageUrl.name != undefined
                  ? URL.createObjectURL(imageUrl)
                  : imageUrl
              }`}
              alt={`Imagen ${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputFile;
