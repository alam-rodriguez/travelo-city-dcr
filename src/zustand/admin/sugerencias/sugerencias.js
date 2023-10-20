import { create } from 'zustand';

export const useSugerencia = create((set) => ({
  titulo: '',
  setTitulo: (value) => set(() => ({ titulo: value })),
  subtitulo: '',
  setSubtitulo: (value) => set(() => ({ subtitulo: value })),
  sugerencia: '',
  setSugerencia: (value) => set(() => ({ sugerencia: value })),
  imageFile: {},
  setImageFile: (imageFile) => set(() => ({ imageFile: imageFile })),
  questionsAndAnswer: [],
  addQuestionsAndAnswer: (number) =>
    set((state) => ({
      questionsAndAnswer: [
        ...state.questionsAndAnswer,
        { [number]: { question: '', answer: '' } },
      ],
    })),

  // editQuestionsAndAnswer: () =>
  //   set((state) => {
  //     return {
  //       questionsAndAnswer: { ...state.questionsAndAnswer, [key]: value },
  //     };
  //   }),
  editQuestion: (number, value) =>
    set((state) => {
      const newArr = [...state.questionsAndAnswer];
      const answer =
        newArr[number].answer != undefined ? newArr[number].answer : '';
      newArr[number] = { question: value, answer: newArr[number].answer };
      console.log(newArr[number].answer);
      return {
        questionsAndAnswer: newArr,
      };
    }),
  editAnswer: (number, value) =>
    set((state) => {
      const newArr = [...state.questionsAndAnswer];
      const question =
        newArr[number].question != undefined ? newArr[number].question : '';
      newArr[number] = { question: newArr[number].question, answer: value };
      return {
        questionsAndAnswer: newArr,
      };
    }),

  deleteLastQuestionAndAnswer: () =>
    set((state) => {
      const newArr = [...state.questionsAndAnswer];
      newArr.pop();
      return {
        questionsAndAnswer: newArr,
      };
    }),

  listIdsGiras: [],
  addIdGira: (newId) =>
    set((state) => ({ listIdsGiras: [...state.listIdsGiras, newId] })),
  removeIdGira: (idGira) =>
    set((state) => {
      const newArry = state.listIdsGiras.filter((id) => id != idGira);
      return { listIdsGiras: newArry };
    }),
}));
