import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';



export const registerDB =  ({  email, password, login }) => async (dispatch, setState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password, login);
      console.log('user', user)
    } catch (error) {
      console.log('error', error);
      console.log('error.message', error.message)

    }
  };

  const authStateChanged = async (onChange = () => {}) => {
    onAuthStateChanged((user) => {
            onChange(user);
    });
};

  export const loginDB =  ({ email, password }) => async (dispatch, setState) =>
  {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
          console.log('user', user)
    } catch (error) {
      throw error;
    }
  };

  