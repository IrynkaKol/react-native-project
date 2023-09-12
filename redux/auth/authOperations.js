import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const {updateUserProfile, authStateChange, authSignOut} = authSlice.actions

export const registerDB =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      // console.log("user: ", user);

      await updateProfile(user, { displayName: login });

      // const { displayName, uid } = await auth.currentUser;

      // const userUpdateProfile = {
      //   login: displayName,
      //   userId: uid,
      // };

      await dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
      
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

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut())
};

export const authStateChangedUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(authStateChange({stateChange: true}));
      dispatch(updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
      
    }
  })
};
// export const updateUserProfile = () => async (dispatch, getState) => {};
