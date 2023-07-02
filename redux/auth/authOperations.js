import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';



export const registerDB =  ({  email, password }) => async (dispatch, setStatte) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', user)
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message)

    }
  };

  