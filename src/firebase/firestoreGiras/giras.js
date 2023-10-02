import {
  doc,
  setDoc,
  collection,
  getDocs,
  limit,
  where,
  query,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../config/firebaseConfig';

// Create gira
export const createGiraFirestore = async (newGira) => {
  console.log(newGira);
  try {
    await setDoc(doc(db, 'giras', newGira.currentId), {
      id: newGira.id,
      currentId: newGira.currentId,
      title: newGira.title,
      description: newGira.description,
      city: newGira.city,
      country: newGira.country,
      location: newGira.location,
      locationUrl: newGira.locationUrl,
      meetingPoint: newGira.meetingPoint,
      prices: newGira.prices,
      aboutActivity: newGira.aboutActivity,
      canGo: newGira.canGo,
      canCancelFree: newGira.canCancelFree,
      instandConfirm: newGira.instandConfirm,
      HasVoucherMovil: newGira.HasVoucherMovil,
      generalData: newGira.generalData,
      includes: newGira.includes,
      noIncludes: newGira.noIncludes,
      utilInformation: newGira.utilInformation,
      date: newGira.date,
      dateDetaild: newGira.dateDetaild,
      hourInformation: newGira.hourInformation,
      dateLimitForCancel: newGira.dateLimitForCancel,
      dateLimitForCancelDetaild: newGira.dateLimitForCancelDetaild,
      duration: newGira.duration,
      durationDetaild: newGira.durationDetaild,

      coverImageId: newGira.coverImageId,
      idsImages: newGira.idsImages,

      showGira: newGira.showGira,

      hasVotes: false,
      rate: 0,
      votes: 0,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Actualizar gira
export const updateGira = async (currentId, giraUpdated) => {
  try {
    const giraRef = doc(db, 'giras', currentId);
    await updateDoc(giraRef, {
      title: giraUpdated.title,
      description: giraUpdated.description,
      city: giraUpdated.city,
      country: giraUpdated.country,
      location: giraUpdated.location,
      locationUrl: giraUpdated.locationUrl,
      meetingPoint: giraUpdated.meetingPoint,
      prices: giraUpdated.prices,
      aboutActivity: giraUpdated.aboutActivity,
      canGo: giraUpdated.canGo,
      canCancelFree: giraUpdated.canCancelFree,
      instandConfirm: giraUpdated.instandConfirm,
      HasVoucherMovil: giraUpdated.HasVoucherMovil,
      generalData: giraUpdated.generalData,
      includes: giraUpdated.includes,
      noIncludes: giraUpdated.noIncludes,
      utilInformation: giraUpdated.utilInformation,
      date: giraUpdated.date,
      dateDetaild: giraUpdated.dateDetaild,
      hourInformation: giraUpdated.hourInformation,
      dateLimitForCancel: giraUpdated.dateLimitForCancel,
      dateLimitForCancelDetaild: giraUpdated.dateLimitForCancelDetaild,
      duration: giraUpdated.duration,
      durationDetaild: giraUpdated.durationDetaild,

      idsImages: giraUpdated.idsImages,

      coverImageId: giraUpdated.coverImageId,

      showGira: giraUpdated.showGira,

      // hasVotes: false,
      // rate: 0,
      // votes: 0,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getAllGiras = async () => {
  try {
    // const q = query(collection(db, 'giras'), where('showGira', '==', true));
    // const querySnapshot = await getDocs(q);
    const querySnapshot = await getDocs(collection(db, 'giras'));
    const giras = [];
    querySnapshot.forEach((doc) => {
      giras.push(doc.data());
    });
    return giras;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getGiras = async () => {
  try {
    const q = query(collection(db, 'giras'), where('showGira', '==', true));
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(collection(db, 'giras'));
    const giras = [];
    querySnapshot.forEach((doc) => {
      giras.push(doc.data());
    });
    return giras;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getGira = async (currentId) => {
  try {
    const q = query(
      collection(db, 'giras'),
      where('currentId', '==', currentId),
    );

    const querySnapshot = await getDocs(q);
    let gira = {};
    querySnapshot.forEach((doc) => {
      gira = doc.data();
      // return doc.data();
    });
    return gira;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Obtener todas las guiras de un ID
export const getGirasById = async (id) => {
  try {
    const q = query(collection(db, 'giras'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    let giras = [];
    querySnapshot.forEach((doc) => {
      giras.push(doc.data());
    });
    return giras;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteGira = async (id) => {
  try {
    await deleteDoc(doc(db, 'giras', id));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
