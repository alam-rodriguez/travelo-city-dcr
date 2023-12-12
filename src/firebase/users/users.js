import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const existUser = async (id) => {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return true;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const setUserInfo = async (userInfo) => {
  try {
    await setDoc(doc(db, 'users', userInfo.id), userInfo);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateUserInfo = async (userInfo) => {
  try {
    const docRef = doc(db, 'users', userInfo.id);
    await updateDoc(docRef, userInfo);
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
