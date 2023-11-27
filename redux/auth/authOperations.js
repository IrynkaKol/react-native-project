import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const {updateUserProfile, authStateChange, authSignOut} = authSlice.actions

export const registerDB =
  ({  login, email, password, photoURL, }) =>
  async (dispatch, getState) => {
    try {
      console.log("photoURL before updateUserProfile:", photoURL);
      await createUserWithEmailAndPassword(auth, email, password);
      
      const user = await auth.currentUser;

       console.log("user: ", user);

      await updateProfile(user, { displayName: login, photoURL });
      console.log("photoURL after updateUserProfile:", photoURL);
      

      await dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
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
      
      dispatch(updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      dispatch(authStateChange({stateChange: true}));
    }
  })
};


export const uploadAvatarToServer = async (photoURL) => {
  try {
    const response = await fetch(photoURL);
  const file = await response.blob();
  const uniqueAvatarId = Date.now().toString();

  const dataRef = await ref(storage, `avatarImage/${uniqueAvatarId}`);
  console.log("dataRefAvatar", dataRef);

  await uploadBytesResumable(dataRef, file);

  const avatarPhoto = await getDownloadURL(ref(storage, `avatarImage/${uniqueAvatarId}`));
  console.log(" avatarPhoto", avatarPhoto)
  return avatarPhoto;

  } catch (error) {
    console.log(error);
  }

  }
// export const updateUserProfile = () => async (dispatch, getState) => {};

export const removeUserAvatar = (photoURL) => async (dispatch, getState) => {
  try {
    const user = await auth.currentUser;

    if (user) {
      const updatedUser = {
        ...user,
        photoURL,
      };

      await updateProfile(updatedUser);
      await dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          photoURL,
        })
      );
      console.log('user: ', user);
    } else {
      console.log('Користувач не знайдений.');
    }
  } catch (error) {
    console.log('error: ', error, error.message);
  }
};
