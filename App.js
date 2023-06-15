// import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

import { useState } from "react";
import { useFonts } from "expo-font";
// import { Navbar } from "./Screens/NavBar/Navbar";

export default function App() {
  const routing = useRoute({});
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
