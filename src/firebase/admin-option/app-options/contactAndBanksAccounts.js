import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const setContactAndBanksAccounts = async (info) => {
  try {
    await setDoc(doc(db, 'app', 'contactAndBankAccounts'), info);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getContactAndBanksAccounts = async () => {
  try {
    const docRef = doc(db, 'app', 'contactAndBankAccounts');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
