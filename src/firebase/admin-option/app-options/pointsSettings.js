import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const setBadgesAndPointsOptions = async (settings) => {
  try {
    await setDoc(doc(db, 'app', 'settingsPointsAndBadges'), settings);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getBadgesAndPointsOptions = async () => {
  try {
    const docRef = doc(db, 'app', 'settingsPointsAndBadges');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    else return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
