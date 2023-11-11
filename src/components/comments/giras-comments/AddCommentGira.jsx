import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

// Components
import HeaderComments from '../comments-components/HeaderComments';

const AddCommentGira = () => {
  const [rate, setrate] = useState(5);
  const [comment, setComment] = useState('');

  const handleChangeRate = (e) => setrate(e.target.valueAsNumber);
  const handleChangeComment = (e) => setComment(e.target.value);

  const handleClickPublicarComentario = () => {
    console.log(uuid());
    const date = new Date();
    const dateReviewInMilliseconds = date.getTime();

    const dia = date.getDate();
    const mes = date.getMonth();
    const anio = date.getFullYear();

    const meses = [
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dic.',
    ];

    const comment = {
      id: uuid(),
      rate,
      // name,
      // userBadged:,
      dateComment: `${dia} ${meses[mes]} ${anio}`,
      dateCommentInMilliseconds,
      comment,
      // dateActivity,
    };
  };

  return (
    <>
      <HeaderComments />
      <div style={{ paddingTop: 70 }}>
        <p className="m-0 fw-medium fs-5">
          Gracias de antemano por tu comentario.
        </p>

        <p className="m-0 mt-4 fw-medium fs-6">
          Su comentario sera publico y estara a la vista de todos, por favor, no
          comente nada ofensivo ni despectivo ni obseno, si publica algo
          inapropiado su comentario sera borrado y su cuenta puede ser vetada.
        </p>

        <p className="m-0 mt-4 fw-medium fs-6">
          Elija la puntuacion que le da a la gira del 1 al 5
        </p>

        <p className="text-center fw-bold fs-4 mb-2 mt-4">
          puntuacion: <span className="color-1">{rate}</span>
        </p>

        <input
          className="w-100"
          type="range"
          min={1}
          max={5}
          step={0.1}
          onChange={handleChangeRate}
        />

        <p className="mb-2 mt-5 fw-medium">
          Acontinuacion ingresa el comentario que quieres compartir:
        </p>
        <textarea
          className="w-100 bg-transparent border rounded-3 text-black"
          placeholder="Ingresa aqui tu comentario"
          style={{ minHeight: 200 }}
          onChange={handleChangeComment}
          value={comment}
        ></textarea>

        <button
          className="position-fixed border rounded-3 fw-medium p-2 px-2 fs-5 bottom-0 start-50 translate-middle bg-color mb-4"
          onClick={handleClickPublicarComentario}
        >
          Publicar comentario
        </button>
      </div>
    </>
  );
};

export default AddCommentGira;
