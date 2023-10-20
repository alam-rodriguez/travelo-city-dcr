import React from 'react';

// Components
import Cover from './sugerencias-components/Cover';

const CoversSugerencias = ({ sugerencias }) => {
  return sugerencias.map((sugerencia) => {
    return (
      <Cover
        sugerencia={sugerencia}
        key={sugerencia.id}
        id={sugerencia.id}
        imgPath={sugerencia.imagePath}
        text={sugerencia.titulo}
        secondText={sugerencia.subtitulo}
      />
    );
  });
};

export default CoversSugerencias;
