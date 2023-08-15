import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const registerDB =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      console.log("user: ", user);

      await updateProfile(user, { displayName: login });

      // const { displayName, uid } = await auth.currentUser;

      // const userUpdateProfile = {
      //   login: displayName,
      //   userId: uid,
      // };

      await dispatch(
        updateUserProfile({
          userId: user.uid, 
          login: user.displayName}));
      // const { user } = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      // console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

//   const authStateChanged = async (onChange = () => {}) => {
//     onAuthStateChanged((user) => {
//             onChange(user);
//     });
// };

export const loginDB =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      throw error;
    }
  };

export const logoutDB = () => async (dispatch, setState) => {};

export const authStateChanged = () => async (dispatch, setState) => {};
export const updateUserProfile = () => async (dispatch, setState) => {};
