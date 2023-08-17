// import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";

// import { AppLoading } from "expo";

import { store } from "./redux/store";



import { useFonts } from "expo-font";
// import { db } from "./firebase/config";

import { Main } from "./components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
