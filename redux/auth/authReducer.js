import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  email: null,
  photoURL: null,
  stateChange: false, // перевіряє чи є ви власником
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  
  reducers: {
    
    updateUserProfile: (state, { payload }) => {
      console.log("login:", payload.login);
      console.log("email:", payload.email);
      console.log("photoURL:", payload.photoURL);

      return {
        ...state,
        userId: payload.userId,
        login: payload.login,
        email: payload.email,
        photoURL: payload.photoURL,
      };
      // ...state,
      // userId: payload.userId,
      // login: payload.login,
      // email: payload.email,
      // photoURL: payload.photoURL,
    },
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});

console.log("authSlice", authSlice);
