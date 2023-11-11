import { db } from '../../config/firebaseConfig';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

export const createReservationGira = async (reservation) => {
  try {
    await setDoc(doc(db, 'reservationsGiras', reservation.reservationId), {
      reservationId: reservation.reservationId,
      email: reservation.email,
      userName: reservation.userName,
      userNumber: reservation.userNumber,
      adultPrice: reservation.adultPrice,
      giraId: reservation.giraId,
      giraCurrentId: reservation.giraCurrentId,
      dayMadeReservation: reservation.dayMadeReservation,
      hourMakeReservation: reservation.hourMakeReservation,
      dateInMilliseconds: reservation.dateInMilliseconds,
      title: reservation.title,
      description: reservation.description,
      date: reservation.date,
      dateDetaild: reservation.dateDetaild,
      adultsNames: reservation.adultsNames,
      childrenNames: reservation.childrenNames,
      childrenPrice: reservation.childrenPrice,
      bebiesNames: reservation.bebiesNames,
      bebiesPrice: reservation.bebiesPrice,

      methodOfPay: reservation.methodOfPay,
      bankSelected: reservation.bankSelected,
      imageTransactionPath: reservation.imageTransactionPath,
      reservacionPagada: reservation.reservacionPagada,

      usePoints: reservation.usePoints,
      discountPercentWithPoints: reservation.discountPercentWithPoints,
      discountPercentWithBadge: reservation.discountPercentWithBadge,
      pointsUsed: reservation.pointsUsed,

      reservacionPagada: reservation.reservacionPagada,
      total: reservation.total,
      discountInMoney: reservation.discountInMoney,
      state: reservation.state,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getReservationGira = async (id) => {
  try {
    const q = query(
      collection(db, 'reservationsGiras'),
      where('giraCurrentId', '==', id),
    );
    const reservations = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      reservations.push(doc.data());
    });
    return reservations;
  } catch (e) {
    console.log(e);
    console.warn('error');
    return false;
  }
};

export const updateReservation = async (reservationUpdated) => {
  try {
    const docRef = doc(
      db,
      'reservationsGiras',
      reservationUpdated.reservationId,
    );
    await updateDoc(docRef, reservationUpdated);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
