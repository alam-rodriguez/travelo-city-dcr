import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const getEstadisticasByCurrentId = async (currentId) => {
  try {
    const q = query(
      collection(db, 'reservationsGiras'),
      where('giraCurrentId', '==', currentId),
    );
    const querySnapshot = await getDocs(q);
    let reservaciones = [];
    querySnapshot.forEach((reservacion) => {
      reservaciones.push(reservacion.data());
    });
    return reservaciones;
  } catch (e) {
    console.log(e);
    return false;
  }
};
