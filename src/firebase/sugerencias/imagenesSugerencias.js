import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../config/firebaseConfig';

export const uploadImageSugerencia = async (carpeta, id, imageFile) => {
  try {
    const storageRef = ref(storage, `${carpeta}/${id}`);
    await uploadBytes(storageRef, imageFile);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getImageSugerencia = async (path) => {
  try {
    const imgUrl = await getDownloadURL(ref(storage, path));
    return imgUrl;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteImageSugerencia = async (path) => {
  try {
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
