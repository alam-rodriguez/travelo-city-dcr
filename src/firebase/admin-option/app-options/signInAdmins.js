import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const addAdmin = async (admins) => {
  try {
    await setDoc(doc(db, 'app', 'admins'), admins);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
  // const docRef = doc(db, 'app', '');
  // await updateDoc();
};

export const getAdmins = async () => {
  try {
    const docRef = doc(db, 'app', 'admins');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    console.log('No hay admins');
    return 'sin-admins';
  } catch (e) {
    console.log(e);
    return false;
  }
};
