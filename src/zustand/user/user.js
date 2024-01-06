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

  notisGiras: true,
  setNotisGiras: (value) => set(() => ({ notisGiras: value })),
  notisSugerencias: true,
  setNotisSugerencias: (value) => set(() => ({ notisSugerencias: value })),
  notisReservations: true,
  setNotisReservaciones: (value) => set(() => ({ notisReservations: value })),
  notisGeneral: true,
  setNotisGeneral: (value) => set(() => ({ notisGeneral: value })),

  allGiras: [],
  setAllGiras: (giras) => set(() => ({ allGiras: giras })),

  favoritesGirasId: [],
  setFavoritesGirasId: (idsGiras) =>
    set(() => ({ favoritesGirasId: idsGiras })),

  favoritesGiras: [],
  setFavoritesGiras: (giras) => set(() => ({ favoritesGiras: giras })),

  setInfoUser: (info) =>
    set(() => {
      console.log(info);
      return {
        id: info.id,
        email: info.email,
        name: info.name,
        number: info.number,
        moneySpent: info.moneySpent,
        pointsEarned: info.pointsEarned,
        pointsSpent: info.pointsSpent,
        notisGiras: info.notisGiras,
        notisSugerencias: info.notisSugerencias,
        notisReservations: info.notisReservations,
        notisGeneral: info.notisGeneral,
        favoritesGirasId: info.favoritesGiras,
        userLogged: true,
        haveUserInfo: true,
      };
    }),
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
  resetInfoUser: () =>
    set(() => ({
      moneySpent: 0,
      pointsEarned: 0,
      pointsSpent: 0,
      badge: { discountRate: 0, badge: 'Sin insignia', minMoney: 0 },
      haveUserInfo: false,
    })),

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

  searchedReservations: false,
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
        searchedReservations: true,
      };
    }),
  resetReservations: () =>
    set(() => ({
      userReservations: [],
      userReservationsNotDone: [],
      userAllReservations: [],
      searchedReservations: false,
    })),
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
  deleteReservationImage: (id) =>
    set((state) => {
      const imagesUpdated = { ...state.reservationsImages };
      delete imagesUpdated[id];
      return { reservationsImages: imagesUpdated };
    }),

  commentSelected: {},
  setCommentSeleted: (comment) => set(() => ({ commentSelected: comment })),

  type: '',
  setType: (type) => set(() => ({ type: type })),
}));
