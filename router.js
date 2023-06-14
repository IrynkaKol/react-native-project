import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
// import { Home } from "./Screens/Home/Home";
import { PostsScreen } from "./Screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "./Screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "./Screens/mainScreen/ProfileScreen";
import { Ionicons, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const useRoute = (isAuth) => {
  const newIcon = require("./assets/icons/new.png");
  if (!isAuth) {
    return (
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
        {/* <MainStack.Screen
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
    /> */}
        <MainStack.Screen name="PostsScreen" component={PostsScreen} />
      </MainStack.Navigator>
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTitle: "Публікації",
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
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <Ionicons name="ios-grid-outline" size={20} color="#212121" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size, color }) => {
            return <Image source={newIcon} style={{ width: 70, height: 40 }} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "",
        tabBarIcon: ({ focused, size, color }) => {
            return (
                <Feather name="user" size={20} color="#212121" />
            );
          },
     }}
      />
    </Tab.Navigator>
  );
};
