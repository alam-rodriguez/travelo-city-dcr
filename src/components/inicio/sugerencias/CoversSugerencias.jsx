import React from 'react';

// Components
import Cover from './sugerencias-components/Cover';
import CoverChargin from './sugerencias-components/CoverChargin';

const CoversSugerencias = ({ sugerencias }) => {
  if (sugerencias.length > 0)
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
  else
    return (
      <>
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
        <CoverChargin />
      </>
    );
};

export default CoversSugerencias;
