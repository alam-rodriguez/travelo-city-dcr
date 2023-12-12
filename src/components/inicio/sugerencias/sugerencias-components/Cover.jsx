import React, { useEffect } from 'react';

// React-router-dom
import { useNavigate } from 'react-router-dom';

// Zustand
import { useSugerencias } from '../../../../zustand/sugerencias/sugerencias';
import { getImageSugerencia } from '../../../../firebase/sugerencias/imagenesSugerencias';

const Cover = ({ sugerencia, id, imgPath, text, secondText }) => {
  const navigate = useNavigate();

  const { sugerenciasImages, addSugerenciaImage } = useSugerencias();

  useEffect(() => {
    if (sugerenciasImages[id] != undefined) return;
    const f = async () => {
      const imgLink = await getImageSugerencia(imgPath);
      if (imgLink != false) addSugerenciaImage(id, imgLink);
    };
    f();
  }, [sugerencia]);

  const handleClick = () => {
    // console.log(id);
    navigate(`/sugerencia/${id}`);

    // navigate(`/sugerencia`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div style={{ margin: '80px 0' }} onClick={handleClick}>
      {sugerenciasImages[id] != undefined ? (
        <img
          className="w-100 object-fit-cover rounded-5"
          style={{ height: 240 }}
          src={sugerenciasImages[id]}
        />
      ) : (
        <div
          className="w-100 bg-secondary-subtle rounded"
          style={{ height: 240 }}
        ></div>
      )}

      <p className="m-0 text-secondary mt-2" style={{ fontSize: 14 }}>
        {text}
      </p>
      <p className="m-0 fw-medium mt-1">{secondText}</p>
    </div>
  );
};

export default Cover;
