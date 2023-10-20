import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
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
