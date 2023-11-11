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
  moneySpent: 0,
  setMoneySpent: (money) => set(() => ({ moneySpent: money })),
  pointsEarned: 0,
  setPointsEarned: (points) => set(() => ({ pointsEarned: points })),
  pointsSpent: 0,
  setPointsSpent: (points) => set(() => ({ pointsSpent: points })),
  badge: 'Viajero novato',
  setBadge: (badge) => set(() => ({ badge: badge })),

  userSawGiras: false,
  setTrueUserSawGiras: () => set(() => ({ userSawGiras: true })),

  discountPercentWithPoints: 0,
  setDiscountPercentWithPoints: (discount) =>
    set(() => ({ discountPercentWithPoints: discount })),
  discountPercentWithBadge: 0,
  setDiscountPercentWithBadge: (discount) =>
    set(() => ({ discountPercentWithBadge: discount })),
  discountInMoney: 0,
  setDiscountInMoney: (discount) => set(() => ({ discountInMoney: discount })),

  pointsHasToSpent: 0,
  setPointsHasToSpent: (points) => set(() => ({ pointsHasToSpent: points })),
}));
