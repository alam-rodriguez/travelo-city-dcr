import { create } from 'zustand';

export const useGirasComments = create((set) => ({
  girasComments: {},
  addGirasComments: (id, comments) =>
    set((state) => ({
      girasComments: { ...state.girasComments, [id]: comments },
    })),
}));
