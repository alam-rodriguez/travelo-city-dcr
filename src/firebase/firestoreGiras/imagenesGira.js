import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';

import { storage } from '../config/firebaseConfig';

// uuid
import { v4 as uuidv4 } from 'uuid';

export const uploadImageGira = async (carpeta, id, imageId, imageFile) => {
  try {
    // imagesWithIds.forEach(async (imageWithId) => {
    const storageRef = ref(storage, `${carpeta}/${id}/${imageId}`);
    await uploadBytes(storageRef, imageFile);
    // });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const uploadImagesGira = async (carpeta, giraId, imagesWithIds) => {
  try {
    imagesWithIds.forEach(async (imageWithId) => {
      const storageRef = ref(
        storage,
        `${carpeta}/${giraId}/${imageWithId.imageId}`,
      );
      await uploadBytes(storageRef, imageWithId.image);
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getImage = async (path) => {
  try {
    const imgUrl = await getDownloadURL(ref(storage, path));
    return imgUrl;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteImage = async (raiz, carpetaId, paths) => {
  try {
    // paths.forEach(async (path) => {
    for (const path of paths) {
      const imageRef = ref(storage, `${raiz}/${carpetaId}/${path}`);
      await deleteObject(imageRef);
    }
    // });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getNamesOfFile = async (pathGira) => {
  try {
    const fileRef = ref(storage, pathGira);
    const ids = [];
    const res = await listAll(fileRef);
    res.items.forEach((result) => {
      ids.push(result.name);
    });
    // res.forEach((result) => {
    //   ids.push(result.name);
    // });
    return ids;
  } catch (e) {
    console.log(e);
    return false;
  }
};
