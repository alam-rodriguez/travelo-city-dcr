import { db } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const getAllUser = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    querySnapshot.forEach((user) => {
      users.push(user.data());
    });
    return users;
  } catch (e) {
    console.log(e);
    return false;
  }
};
