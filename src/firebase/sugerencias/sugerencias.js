import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const createSugerenciaFirestore = async (sugerencia) => {
  try {
    await setDoc(doc(db, 'sugerencias', sugerencia.id), sugerencia);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateSugerenciaFirestore = async (id, sugerenciaUpdated) => {
  try {
    const docRef = doc(db, 'sugerencias', id);
    await updateDoc(docRef, sugerenciaUpdated);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getSugerencias = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'sugerencias'));
    const giras = [];
    querySnapshot.forEach((doc) => {
      giras.push(doc.data());
    });
    return giras;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getSugerencia = async (id) => {
  try {
    const docRef = doc(db, 'sugerencias', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data();
    else return {};
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteSugerencia = async (id) => {
  try {
    await deleteDoc(doc(db, 'sugerencias', id));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
