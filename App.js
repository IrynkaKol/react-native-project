// import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { useFonts } from "expo-font";
// import { Navbar } from "./Screens/NavBar/Navbar";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Home } from "./Screens/Home/Home";
import { PostsScreen } from "./Screens/PostsScreen/PostsScreen";
import { Button, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Публікації",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTitle: "PostsScreen",
            headerTintColor: "#212121",
            headerTitleStyle: {
              fontFamily: "Roboto-Regular",
              fontSize: 17,
              lineHeight: 22,
            },
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10, marginBottom: 10 }}>
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ),
          }}
        />
        <MainStack.Screen name="PostsScreen" component={PostsScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
