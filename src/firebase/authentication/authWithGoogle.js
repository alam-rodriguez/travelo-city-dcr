import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return { email: result.user.email, id: result.user.uid };
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const signInAutomatically = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Esta función se ejecutará cuando haya cambios en el estado de autenticación
      if (user) {
        // El usuario está autenticado, puedes acceder a sus propiedades, como el correo electrónico
        const email = user.email;
        const id = user.uid;
        console.log(user);
        // return { email, id };
        resolve({ email, id });
      } else {
        // El usuario no está autenticado
        // reject(new Error('El usuario no está autenticado.'));
        // return false;
        console.log(user);
        reject(false);
      }
      // Detener el observador
      unsubscribe();
    });
  });
};

export const signOutFirebase = async () => {
  console.log('hola');
  try {
    await signOut(auth);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
