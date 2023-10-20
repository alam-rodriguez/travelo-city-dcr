// import React, { useEffect, useState } from 'react';

// // uuid
// import { v4 as uuidv4 } from 'uuid';

// // Icons
// import { GrSubtractCircle } from 'react-icons/gr';
// import { MdOutlineAddCircleOutline } from 'react-icons/md';

// // Components
// import HeaderSugerencia from './sugerencias-components/HeaderSugerencia';
// import Input from '../admin-options-components/insputs/Input';
// import Check from '../admin-options-components/insputs/Check';
// import TextArea from '../admin-options-components/insputs/TextArea';

// // Zustand
// import { useSugerencia } from '../../../zustand/admin/sugerencias/sugerencias';
// import InputWithIndex from '../admin-options-components/insputs/InputWithIndex';
// import { getGirasNoDone } from '../../../firebase/firestoreGiras/giras';
// import { createSugerenciaFirestore } from '../../../firebase/sugerencias/sugerencias';
// import { uploadImageSugerencia } from '../../../firebase/sugerencias/imagenesSugerencias';

// const EditarSugerencia = () => {
//   const {
//     titulo,
//     setTitulo,
//     subtitulo,
//     setSubtitulo,
//     sugerencia,
//     setSugerencia,
//     imageFile,
//     setImageFile,
//     questionsAndAnswer,
//     addQuestionsAndAnswer,
//     deleteLastQuestionAndAnswer,
//     editQuestion,
//     editAnswer,
//     listIdsGiras,
//     addIdGira,
//     removeIdGira,
//   } = useSugerencia();

//   const createSugerencia = async (e) => {
//     e.preventDefault();

//     if (imageFile.name == undefined) {
//       console.log('Debes de seleccinar una imagen');
//       return;
//     }
//     const id = uuidv4();
//     const newSugerencia = {
//       id: id,
//       titulo,
//       subtitulo,
//       info: sugerencia,
//       imagePath: `sugerencias/${id}`,
//       idsGiras: listIdsGiras,
//       questionsAndAnswer,
//     };

//     const res = await createSugerenciaFirestore(newSugerencia);

//     const resImage = await uploadImageSugerencia('sugerencias', id, imageFile);

//     if (res && resImage) console.log('Sugerencia creada');

//     // console.log(titulo);
//     // console.log(subtitulo);
//     // console.log(sugerencia);
//     // console.log(imageFile);
//     // console.log(listIdsGiras);
//     // console.log(questionsAndAnswer);
//   };

//   const [giras, setGiras] = useState([]);

//   useEffect(() => {
//     const f = async () => {
//       const res = await getGirasNoDone();
//       setGiras(res);
//       console.log(res);
//     };
//     f();
//   }, []);

//   return (
//     <form onSubmit={createSugerencia}>
//       <HeaderSugerencia link="/admin-options" text="Crear sugerencia" />

//       <Input
//         id="titulo-sugerencia"
//         label="Titulo"
//         value={titulo}
//         placeholder="Titulo de la sugerencia"
//         minLength={3}
//         handleChange={setTitulo}
//       />
//       <Input
//         id="subtitulo-sugerencia"
//         label="subtitulo"
//         value={subtitulo}
//         placeholder="subtitulo de la sugerencia"
//         minLength={3}
//         handleChange={setSubtitulo}
//       />

//       <TextArea
//         id="sugerencia"
//         label="Sugerencia"
//         value={sugerencia}
//         placeholder="Sugerencia que quieres compartir"
//         handleChange={setSugerencia}
//       />

//       <input
//         type="file"
//         name=""
//         id=""
//         onChange={(e) => setImageFile(e.target.files[0])}
//       />

//       {imageFile.name != undefined ? (
//         <img className="w-100" src={URL.createObjectURL(imageFile)} alt="" />
//       ) : (
//         <></>
//       )}

//       <div className="my-5">
//         <p className="fw-medium fs-4 mb-2">
//           Lista de giras, selecciona las que quieres comparir:
//         </p>

//         {giras.map((gira) => (
//           <Check
//             key={gira.currentId}
//             id={gira.currentId}
//             info={`Titulo: ${gira.title} | fecha: ${gira.date}`}
//             addGira={addIdGira}
//             removeGira={removeIdGira}
//           />
//         ))}
//       </div>

//       {Object.keys(questionsAndAnswer).map((questionAndAnswer, i) => (
//         <div key={i}>
//           <InputWithIndex
//             id="subtitulo-sugerencia"
//             label="Sugerencia 1"
//             i={i}
//             value={questionAndAnswer.question}
//             placeholder="subtitulo de la sugerencia"
//             minLength={3}
//             handleChange={editQuestion}
//           />
//           <textarea
//             className="w-100 bg-transparent rounded-4 text-black"
//             placeholder="Sugerencia"
//             style={{ height: 200 }}
//             onChange={(e) => editAnswer(i, e.target.value)}
//             value={questionAndAnswer.answer}
//           ></textarea>
//         </div>
//       ))}

//       <button type="submit" className="bg-color rounded-4 border-0 p-2 fs-4">
//         Crear sugerencia
//       </button>

//       {/* <div className="position-fixed end-0 bottom-0 d-flex flex-column m-4"> */}
//       <GrSubtractCircle
//         className="display-2"
//         onClick={deleteLastQuestionAndAnswer}
//       />
//       <MdOutlineAddCircleOutline
//         className="display-1"
//         onClick={() => addQuestionsAndAnswer(questionsAndAnswer.length)}
//       />
//       {/* </div> */}
//     </form>
//   );
// };

// export default EditarSugerencia;
