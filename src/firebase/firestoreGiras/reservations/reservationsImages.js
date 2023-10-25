import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';

export const uploadImageReservationGira = async (carpeta, id, imageFile) => {
  try {
    const storageRef = ref(storage, `${carpeta}/${id}`);
    await uploadBytes(storageRef, imageFile);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
