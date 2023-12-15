import { db } from '../../config/firebaseConfig';
import {
  collection,
  doc,
  getDoc,
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
      userId: reservation.userId,
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
      GiraDateInMilliseconds: reservation.GiraDateInMilliseconds,
      giraDateLimitForCancelInMilliseconds:
        reservation.giraDateLimitForCancelInMilliseconds,
      adultsNames: reservation.adultsNames,
      childrenNames: reservation.childrenNames,
      childrenPrice: reservation.childrenPrice,
      bebiesNames: reservation.bebiesNames,
      bebiesPrice: reservation.bebiesPrice,

      methodOfPay: reservation.methodOfPay,
      methodOfPayWhenUsePoints: reservation.methodOfPayWhenUsePoints,
      bankSelected: reservation.bankSelected,
      imageTransactionPath: reservation.imageTransactionPath,
      reservacionPagada: reservation.reservacionPagada,

      usePoints: reservation.usePoints,
      discountPercentWithPoints: reservation.discountPercentWithPoints,
      discountPercentWithBadge: reservation.discountPercentWithBadge,
      pointsUsed: reservation.pointsUsed,
      pointsEarned: reservation.pointsEarned,

      reservacionPagada: reservation.reservacionPagada,
      total: reservation.total,
      discountInMoney: reservation.discountInMoney,
      horaGira: reservation.horaGira,
      state: reservation.state,
      isPutInStatistics: reservation.isPutInStatistics,
      isConfirmByAdmin: reservation.isConfirmByAdmin,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getAllReservations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'reservationsGiras'));
    const reservaciones = [];
    querySnapshot.forEach((doc) => {
      reservaciones.push(doc.data());
    });
    return reservaciones;
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

export const getReservationsByEmail = async (email) => {
  try {
    const q = query(
      collection(db, 'reservationsGiras'),
      where('email', '==', email),
    );
    const querySnapshot = await getDocs(q);
    const reservations = [];
    querySnapshot.forEach((doc) => {
      reservations.push(doc.data());
    });
    return reservations;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getReservationsById = async (id) => {
  try {
    const docRef = doc(db, 'reservationsGiras', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    console.log('No se ha encontrado la reservacion');
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
