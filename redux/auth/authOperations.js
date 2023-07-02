import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';

// const authSingInUser = () => async (dispatch, getSatte) => {} // login
// const authSingUpUser = () => async (dispatch, getSatte) => {} // register
// const authSingOutUser = () => async (dispatch, getSatte) => {} // logout

export const registerDB =  ({  email, password }) => async (dispatch, setStatte) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', user)
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message)

    }
  };

  