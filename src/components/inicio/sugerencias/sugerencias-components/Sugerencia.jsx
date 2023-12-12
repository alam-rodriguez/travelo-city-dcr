import React, { useEffect, useState } from 'react';

// Components
import HeaderSugerencia from './HeaderSugerencia';
import SugerenciaInfo from './SugerenciaInfo';
import GiraView from './GiraView';
import QuestionAndAnswer from './QuestionAndAnswer';

// React-router-dom
import { useParams } from 'react-router-dom';

// Zustand
import {
  useSugerenciaSelected,
  useSugerencias,
} from '../../../../zustand/sugerencias/sugerencias';
import { useGiras } from '../../../../zustand/giras/giras';
import { getSugerencia } from '../../../../firebase/sugerencias/sugerencias';
import { getImageSugerencia } from '../../../../firebase/sugerencias/imagenesSugerencias';
import SugerenciaCharging from './SugerenciaCharging';

const Sugerencia = () => {
  const { id: idOfParams } = useParams();
  const { giras, setGiras } = useGiras();
  const { sugerencias, setSugerencias, sugerenciasImages, addSugerenciaImage } =
    useSugerencias();

  const {
    id,
    setId,
    titulo,
    setTitulo,
    subtitulo,
    setSubtitulo,
    sugerencia,
    setSugerencia,
    girasRecomendadas,
    setGirasRecomendadas,
    questionsAndAnswer,
    setQuestionsAndAnswer,
  } = useSugerenciaSelected();

  const setInfo = async (sugerencia) => {
    setId(sugerencia.id);
    setTitulo(sugerencia.titulo);
    setSubtitulo(sugerencia.subtitulo);
    setSugerencia(sugerencia.info);
    setQuestionsAndAnswer(sugerencia.questionsAndAnswer);

    const girasOfSugerencia = [];
    giras.forEach((gira) => {
      if (sugerencia.idsGiras.includes(gira.currentId))
        girasOfSugerencia.push(gira);
    });
    setGirasRecomendadas(girasOfSugerencia);

    if (sugerenciasImages[sugerencia.id] == undefined) {
      const imgLink = await getImageSugerencia(sugerencia.imagePath);
      if (imgLink != false) addSugerenciaImage(sugerencia.id, imgLink);
    }
  };

  useEffect(() => {
    if (giras.length == 0) return;
    let existe = false;
    sugerencias.forEach((sugerencia) => {
      if (sugerencia.id == idOfParams) {
        setInfo(sugerencia);
        existe = true;
        return;
      }
    });
    if (!existe) {
      const f = async () => {
        console.log('Buscando info en BD');
        const sugerencia = await getSugerencia(idOfParams);
        setInfo(sugerencia);
      };
      f();
    }
  }, [giras]);

  if (id == '') return <SugerenciaCharging />;

  return (
    <div>
      <HeaderSugerencia />
      <SugerenciaInfo
        img={sugerenciasImages[id]}
        imgText={titulo}
        title={subtitulo}
        subTitle={sugerencia}
      />

      <p className="m-0 fs-3 fw-medium">Giras y Tours que te recomiendo:</p>

      <div className="d-flex overflow-x-scroll gap-3">
        {girasRecomendadas.map((gira) => (
          <GiraView
            key={gira.currentId}
            giraId={gira.id}
            currentId={gira.currentId}
            imgId={gira.coverImageId}
            imgPath={`giras/${gira.id}/${gira.coverImageId}`}
            title={gira.title}
            duration={gira.duration}
            hasVotes={gira.hasVotes}
            rate={gira.rate}
            votes={gira.votes}
            canCancel={gira.canCancelFree}
            price={gira.prices.adult}
            gira={gira}
          />
        ))}
      </div>

      <p className="mb-4 mt-5 fw-bold fs-2">Preguntas y respuesas:</p>

      {questionsAndAnswer.map((questionAndAnswer, i) => (
        <QuestionAndAnswer
          key={i}
          question={questionAndAnswer.question}
          answer={questionAndAnswer.answer}
        />
      ))}
    </div>
  );
};

export default Sugerencia;

{
  /* <QuestionAndAnswer
  question="How do i find the cheapest flights?"
  answer="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, omnis!
          Molestiae exercitationem corrupti modi necessitatibus impedit neque
          sapiente quibusdam voluptatem aliquid aut temporibus amet asperiores
          quis, tempora ipsum, eligendi dolore?"
/>; */
}
