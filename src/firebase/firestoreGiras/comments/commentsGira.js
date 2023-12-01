import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const createCommentGira = async (comment) => {
  try {
    await setDoc(doc(db, 'commentsGiras', comment.commentId), comment);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateComment = async (commentUpdate) => {
  try {
    const commentRef = doc(db, 'commentsGiras', commentUpdate.commentId);
    await updateDoc(commentRef, commentUpdate);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getCommentsByGira = async (giraId) => {
  try {
    const q = query(
      collection(db, 'commentsGiras'),
      where('giraId', '==', giraId),
    );
    const querySnapshot = await getDocs(q);
    const comments = [];
    querySnapshot.forEach((comment) => {
      comments.push(comment.data());
    });
    return comments;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateGiraInformationAboutComments = async (
  giraCurrentId,
  votes,
  rate,
) => {
  try {
    const docRef = doc(db, 'giras', giraCurrentId);
    await updateDoc(docRef, {
      votes: votes,
      rate: rate,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteComment = async (id) => {
  try {
    await deleteDoc(doc(db, 'commentsGiras', id));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
