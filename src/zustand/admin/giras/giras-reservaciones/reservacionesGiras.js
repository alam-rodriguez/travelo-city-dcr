import { create } from 'zustand';

export const useReservacionesGiras = create((set) => ({
  reservaciones: [],
  setReservaciones: (reservaciones) =>
    set(() => ({ reservaciones: reservaciones })),
}));
