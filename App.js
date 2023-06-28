// import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import React from "react";
import {Provider} from "react-redux"
import { NavigationContainer } from "@react-navigation/native";
// import { AppLoading } from "expo";
import { useRoute } from "./router";
import {store} from './redux/store'


import { useState } from "react";
import { useFonts } from "expo-font";

// import { Navbar } from "./Screens/NavBar/Navbar";

export default function App() {
  const [iasReady, setIasReady] = useState(false);
  const routing = useRoute(true); // true null
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return <Provider store={store}>
  <NavigationContainer>{routing}</NavigationContainer>
  </Provider>
}
