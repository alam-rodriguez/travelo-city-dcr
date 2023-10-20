import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const setUserInfo = async (userInfo) => {
  try {
    await setDoc(doc(db, 'users', userInfo.id), userInfo);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getUserInfo = async (id) => {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
