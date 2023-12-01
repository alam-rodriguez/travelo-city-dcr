import { create } from 'zustand';

export const useInfoUser = create((set) => ({
  userLogged: false,
  haveUserInfo: false,
  isAdmin: true,
  // setIsAdmin: () => set(() => ({ isAdmin: true })),
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
  badge: { discountRate: 0, badge: 'Sin insignia', minMoney: 0 },
  calcBadge: (num, badges) =>
    set(() => {
      {
        console.log(badges);
        console.log(num);
        let badgeSelected = {};
        badges.forEach((badge, i) => {
          if (num >= badge.minMoney) {
            if (i == 0) badgeSelected = badge;
            else if (i == badge.length) badgeSelected == badge;
            else badgeSelected = badges[i];
          }
          return;
        });
        console.log(badgeSelected);
        console.log(badges[4 - 1]);
        console.log(badgeSelected);
        return { badge: badgeSelected };
      }
    }),
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

  userReservations: [],
  userReservationsNotDone: [],
  userAllReservations: [],
  setReservations: (reservations) =>
    set(() => {
      reservations.sort((a, b) => b.dateInMilliseconds - a.dateInMilliseconds);
      const fechaActual = new Date().getTime();
      const reservationsActives = [];
      const reservationsDone = [];
      reservations.forEach((reservation) => {
        if (reservation.GiraDateInMilliseconds > fechaActual)
          reservationsActives.push(reservation);
        else reservationsDone.push(reservation);
      });
      return {
        userReservations: reservationsActives,
        userReservationsNotDone: reservationsDone,
        userAllReservations: reservations,
      };
    }),
  setUserReservations: (reservations) =>
    set(() => ({ userReservations: reservations })),
  setUserReservationsNotDone: (reservations) =>
    set(() => ({ userReservationsNotDone: reservations })),

  reservationSelected: {},
  setReservationSelected: (reservation) =>
    set(() => ({ reservationSelected: reservation })),
  reservationsImages: {},
  addReservationImage: (id, imgLink) =>
    set((state) => ({
      reservationsImages: { ...state.reservationsImages, [id]: imgLink },
    })),

  commentSelected: {},
  setCommentSeleted: (comment) => set(() => ({ commentSelected: comment })),

  type: '',
  setType: (type) => set(() => ({ type: type })),
}));
