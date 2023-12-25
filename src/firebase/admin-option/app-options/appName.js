import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const setAppNames = async (appNames) => {
  try {
    await setDoc(doc(db, 'app', 'appNames'), appNames);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getAppNames = async () => {
  try {
    const docRef = doc(db, 'app', 'appNames');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getInfoApp = async () => {
  const querySnapshot = await getDocs(collection(db, 'app'));
  console.log(querySnapshot);
  let admins = {};
  let appNames = {};
  let contactAndBanksAccounts = [];
  let settignsPoints = {};
  let i = 1;
  querySnapshot.forEach((doc) => {
    if (i == 1) admins = doc.data();
    if (i == 2) appNames = doc.data();
    if (i == 3) contactAndBanksAccounts = doc.data();
    if (i == 4) settignsPoints = doc.data();
    console.log(i);
    console.log(doc.data());
    i++;
  });
  console.log(appNames);
  console.log(settignsPoints);
  const settings = {
    admins: admins,
    appNames: appNames,
    contactAndBanksAccounts: contactAndBanksAccounts,
    settignsPoints: settignsPoints,
  };
  return settings;
};
