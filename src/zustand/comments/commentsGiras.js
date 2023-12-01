import { create } from 'zustand';

export const useGirasComments = create((set) => ({
  girasComments: {},
  addGirasComments: (id, comments) =>
    set((state) => ({
      girasComments: { ...state.girasComments, [id]: comments },
    })),
  orderComments: (id, orderBy) =>
    set((state) => {
      const obj = { ...state.girasComments };
      if (orderBy == 'recientes')
        obj[id].sort(
          (a, b) => b.dateCommentInMilliseconds - a.dateCommentInMilliseconds,
        );
      else if (orderBy == 'positivos') obj[id].sort((a, b) => b.rate - a.rate);
      else if (orderBy == 'criticos') obj[id].sort((a, b) => a.rate - b.rate);
      return { girasComments: obj };
    }),
  deleteCommentsGira: (id) =>
    set((state) => {
      const objUpdated = { ...state.girasComments };
      delete objUpdated[id];
      return { girasComments: objUpdated };
    }),
}));
