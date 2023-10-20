import { create } from 'zustand';

export const useEstadisticas = create((set) => ({
  // countBabies: 0,
  // incrementCountBabies: () =>
  //   set((state) => ({ countBabies: state.countBabies + 1 })),
  // countChildren: 0,
  // incrementCountChildren: () =>
  //   set((state) => ({ countChildren: state.countChildren + 1 })),
  // countAdults: 0,
  // incrementCountAdults: () =>
  //   set((state) => ({ countAdults: state.countAdults + 1 })),
  // priceBaby: 0,
  // setPriceBaby: (price) => set(() => ({ priceBaby: price })),
  // priceChild: 0,
  // setPriceChild: (price) => set(() => ({ priceChild: price })),
  // priceAdult: 0,
  // setPriceAdult: (price) => set(() => ({ priceAdult: price })),
  // total: 0,
  // setTotal: (total) => set(() => ({ total: total })),
  countBabies: 0,
  setCountBabies: (count) => set(() => ({ countBabies: count })),
  countChildren: 0,
  setCountChildren: (count) => set(() => ({ countChildren: count })),
  countAdults: 0,
  setCountAdults: (count) => set(() => ({ countAdults: count })),

  priceBaby: 0,
  setPriceBaby: (price) => set(() => ({ priceBaby: price })),
  priceChild: 0,
  setPriceChild: (price) => set(() => ({ priceChild: price })),
  priceAdult: 0,
  setPriceAdult: (price) => set(() => ({ priceAdult: price })),
  total: 0,
  setTotal: (total) => set(() => ({ total: total })),

  countReservations: 0,
  setCountReservations: (count) => set(() => ({ countReservations: count })),
}));
