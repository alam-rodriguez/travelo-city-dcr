import React, { useEffect, useState } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// Icons
import { GrSubtractCircle } from 'react-icons/gr';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

// Components
import HeaderSugerencia from './sugerencias-components/HeaderSugerencia';
import Input from '../admin-options-components/insputs/Input';
import Check from '../admin-options-components/insputs/Check';
import TextArea from '../admin-options-components/insputs/TextArea';

// Zustand
import { useSugerencia } from '../../../zustand/admin/sugerencias/sugerencias';
import InputWithIndex from '../admin-options-components/insputs/InputWithIndex';
import { getGirasNoDone } from '../../../firebase/firestoreGiras/giras';
import {
  createSugerenciaFirestore,
  getSugerencia,
  getSugerencias,
  updateSugerenciaFirestore,
} from '../../../firebase/sugerencias/sugerencias';
import {
  getImageSugerencia,
  uploadImageSugerencia,
} from '../../../firebase/sugerencias/imagenesSugerencias';
import { useParams } from 'react-router-dom';
import {
  useSugerenciaSelected,
  useSugerencias,
} from '../../../zustand/sugerencias/sugerencias';

const EditarSugerencia = () => {
  const { id: idOfParams } = useParams();

  // const navigate = useNavigate();
  // const { giras } = useGiras();

  const {
    searchSugerencia,
    sugerencias,
    setSugerencias,
    sugerenciasImages,
    addSugerenciaImage,
  } = useSugerencias();

  useEffect(() => {
    if (!searchSugerencia) return;
    console.log('Buscando sugerencias');
    const f = async () => {
      const res = await getSugerencias();
      if (res != false) setSugerencias(res);
    };
    f();
  }, []);

  useEffect(() => {
    console.log(id);
  }, []);

  const {
    id,
    setId,
    titulo,
    setTitulo,
    subtitulo,
    setSubtitulo,
    sugerencia,
    setSugerencia,
    imageFile,
    setImageFile,
    questionsAndAnswer,
    addQuestionsAndAnswer,
    setQuestionsAndAnswer,
    deleteLastQuestionAndAnswer,
    editQuestion,
    editAnswer,
    listIdsGiras,
    addIdGira,
    setIdGira,
    removeIdGira,

    girasRecomendadas,
    setGirasRecomendadas,
  } = useSugerencia();

  const updateSugerencia = async (e) => {
    e.preventDefault();

    let resImage = true;

    if (imageFile.name != undefined) {
      resImage = await uploadImageSugerencia('sugerencias', id, imageFile);
    }
    // const id = uuidv4();
    const sugerenciaActualizada = {
      titulo,
      subtitulo,
      info: sugerencia,
      idsGiras: listIdsGiras,
      questionsAndAnswer,
    };

    console.log(sugerenciaActualizada);

    const res = await updateSugerenciaFirestore(id, sugerenciaActualizada);

    // const resImage = await uploadImageSugerencia('sugerencias', id, imageFile);

    if (res && resImage) console.log('Sugerencia actualizada');

    // console.log(titulo);
    // console.log(subtitulo);
    // console.log(sugerencia);
    // console.log(imageFile);
    // console.log(listIdsGiras);
    // console.log(questionsAndAnswer);
  };

  const [giras, setGiras] = useState([]);

  useEffect(() => {
    const f = async () => {
      const res = await getGirasNoDone();
      setGiras(res);
      console.log(res);
    };
    f();
  }, []);

  const setInfo = async (sugerencia) => {
    console.log(sugerencia);
    setId(sugerencia.id);
    setTitulo(sugerencia.titulo);
    setSubtitulo(sugerencia.subtitulo);
    setSugerencia(sugerencia.info);
    setIdGira(sugerencia.idsGiras);
    setQuestionsAndAnswer(sugerencia.questionsAndAnswer);
    console.log(sugerencia.questionsAndAnswer);

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

  return (
    <form onSubmit={updateSugerencia}>
      <HeaderSugerencia
        link="/admin-options/list-sugerencias"
        text="Editar sugerencia"
      />

      <Input
        id="titulo-sugerencia"
        label="Titulo"
        value={titulo}
        placeholder="Titulo de la sugerencia"
        minLength={3}
        handleChange={setTitulo}
      />
      <Input
        id="subtitulo-sugerencia"
        label="subtitulo"
        value={subtitulo}
        placeholder="subtitulo de la sugerencia"
        minLength={3}
        handleChange={setSubtitulo}
      />

      <TextArea
        id="sugerencia"
        label="Sugerencia"
        value={sugerencia}
        placeholder="Sugerencia que quieres compartir"
        handleChange={setSugerencia}
      />

      <input
        type="file"
        name=""
        id=""
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      {imageFile.name != undefined ? (
        <img className="w-100" src={URL.createObjectURL(imageFile)} alt="" />
      ) : (
        <img
          className="w-100 object-fit-cover"
          style={{ height: 300 }}
          src={sugerenciasImages[id]}
        />
      )}

      <div className="my-5">
        <p className="fw-medium fs-4 mb-2">
          Lista de giras, selecciona las que quieres comparir:
        </p>

        {giras.map((gira) => (
          <Check
            // defaultChecked={listIdsGiras.includes(gira.id) ? true : false}
            checked={listIdsGiras.includes(gira.currentId) ? true : false}
            key={gira.currentId}
            id={gira.currentId}
            info={`Titulo: ${gira.title} | fecha: ${gira.date}`}
            addGira={addIdGira}
            removeGira={removeIdGira}
          />
        ))}
      </div>

      {questionsAndAnswer.map((questionAndAnswer, i) => {
        console.log(questionAndAnswer);
        return (
          <div key={i}>
            <InputWithIndex
              id="subtitulo-sugerencia"
              label="Sugerencia 1"
              i={i}
              value={questionAndAnswer.question}
              placeholder="subtitulo de la sugerencia"
              minLength={3}
              handleChange={editQuestion}
            />
            <textarea
              className="w-100 bg-transparent rounded-4 text-black"
              placeholder="Sugerencia"
              style={{ height: 200 }}
              onChange={(e) => editAnswer(i, e.target.value)}
              value={questionAndAnswer.answer}
            ></textarea>
          </div>
        );
      })}

      <button type="submit" className="bg-color rounded-4 border-0 p-2 fs-4">
        Actualizar sugerencia
      </button>

      {/* <div className="position-fixed end-0 bottom-0 d-flex flex-column m-4"> */}
      <GrSubtractCircle
        className="display-2"
        onClick={deleteLastQuestionAndAnswer}
      />
      <MdOutlineAddCircleOutline
        className="display-1"
        onClick={() => addQuestionsAndAnswer(questionsAndAnswer.length)}
      />
      {/* </div> */}
    </form>
  );
};

export default EditarSugerencia;
