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

  amountGiras: 0,
  amountReservations: 0,
  amountReservationsCancelled: 0,
  amountBabies: 0,
  amountChildren: 0,
  amountAdults: 0,
  amountPeople: 0,
  earningsWithBabies: 0,
  earningsWithChildren: 0,
  earningsWithAdults: 0,
  pointsGenerated: 0,
  pointsSpent: 0,
  reservationsPaidWithMoney: 0,
  reservationsPaidWithTransfer: 0,
  earningsTotal: 0,
  setStatistics: (girasActives, reservationsForStatistics) =>
    set(() => {
      // console.log(girasActives);
      let amountGiras = girasActives.length;
      let amountReservations = reservationsForStatistics.length;
      let amountReservationsCancelled = 0;
      let amountBabies = 0;
      let amountChildren = 0;
      let amountAdults = 0;
      let amountPeople = 0;
      let earningsWithBabies = 0;
      let earningsWithChildren = 0;
      let earningsWithAdults = 0;
      let pointsGenerated = 0;
      let pointsSpent = 0;
      let reservationsPaidWithMoney = 0;
      let reservationsPaidWithTransfer = 0;
      let earningsTotal = 0;

      reservationsForStatistics.forEach((reservation) => {
        if (reservation.state == 'Cancelada') amountReservationsCancelled++;
        amountBabies += Object.keys(reservation.bebiesNames).length;
        amountChildren += Object.keys(reservation.childrenNames).length;
        amountAdults += Object.keys(reservation.adultsNames).length + 1;
        amountPeople +=
          Object.keys(reservation.bebiesNames).length +
          Object.keys(reservation.childrenNames).length +
          Object.keys(reservation.adultsNames).length +
          1;

        earningsWithBabies +=
          Object.keys(reservation.bebiesNames).length * reservation.bebiesPrice;
        earningsWithChildren +=
          Object.keys(reservation.childrenNames).length *
          reservation.childrenPrice;
        earningsWithAdults +=
          Object.keys(reservation.adultsNames).length +
          1 * reservation.adultPrice;
        pointsGenerated += reservation.pointsEarned;
        pointsSpent += reservation.pointsUsed;
        if (reservation.methodOfPay == 'efectivo') reservationsPaidWithMoney++;
        else if (reservation.methodOfPay == 'tarjeta')
          reservationsPaidWithTransfer++;

        earningsTotal += reservation.total - reservation.discountInMoney;

        //  amountGiras++;
      });
      return {
        amountGiras: amountGiras,
        amountReservations: amountReservations,
        amountReservationsCancelled: amountReservationsCancelled,
        amountBabies: amountBabies,
        amountChildren: amountChildren,
        amountAdults: amountAdults,
        amountPeople: amountPeople,
        earningsWithBabies: earningsWithBabies,
        earningsWithChildren: earningsWithChildren,
        earningsWithAdults: earningsWithAdults,
        pointsGenerated: pointsGenerated,
        pointsSpent: pointsSpent,
        reservationsPaidWithMoney: reservationsPaidWithMoney,
        reservationsPaidWithTransfer: reservationsPaidWithTransfer,
        earningsTotal: earningsTotal,
      };
    }),

  usersInfo: [],
  setUsersInfo: (info) => set(() => ({ usersInfo: info })),
  userSelected: {},
  setUserSelected: (user) => set(() => ({ userSelected: user })),

  reservations: [],
  setReservations: (reservations) =>
    set(() => ({ reservations: reservations })),
}));
