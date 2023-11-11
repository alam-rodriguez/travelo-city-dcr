import { create } from 'zustand';

export const useReservacionesGiras = create((set) => ({
  reservacionSelecionada: {},
  setReservacionSelecionada: (reservacion) =>
    set(() => ({ reservacionSelecionada: reservacion })),

  reservaciones: [],
  setReservaciones: (reservaciones) =>
    set(() => ({ reservaciones: reservaciones })),
  reservacionesImages: {},
  addReservacionImage: (id, imgLink) =>
    set((state) => ({
      reservacionesImages: { ...state.reservacionesImages, [id]: imgLink },
    })),
}));
