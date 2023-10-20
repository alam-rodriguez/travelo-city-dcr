import { create } from 'zustand';

export const useInfoUser = create((set) => ({
  userLogged: false,
  haveUserInfo: false,
  id: '',
  setId: (id) => set(() => ({ id: id, userLogged: true })),
  email: '',
  setEmail: (email) => set(() => ({ email: email })),
  name: '',
  setName: (name) => set(() => ({ name: name, haveUserInfo: true })),
  number: '',
  setNumber: (number) => set(() => ({ number: number })),

  userSawGiras: false,
  setTrueUserSawGiras: () => set(() => ({ userSawGiras: true })),
}));
