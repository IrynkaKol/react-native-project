import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Home } from "./Screens/Home/Home";
import { PostsScreen } from "./Screens/mainScreen/PostsScreen";
import { CreatePostsScreen } from "./Screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "./Screens/mainScreen/ProfileScreen";
import { Ionicons, Feather } from "@expo/vector-icons";

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
        <MainStack.Screen name="Home" component={Home} options={{}} />
        <MainStack.Screen name="Posts" component={PostsScreen} />
      </MainStack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "#E5E5E5",
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarLabel: "",

          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitle: "Публікації",
          headerTitleAlign: "center",

          headerTitleStyle: {
            fontFamily: "Roboto-Regular",
            fontSize: 17,
            lineHeight: 22,
          },

          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10, marginBottom: 10 }}>
              <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
              {/* <MaterialIcons name="logout" size={24} color="#BDBDBD" /> */}
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View style={{ width: 24, height: 24 }}>
                <Ionicons name="ios-grid-outline" size={size} color="#212121" />
              </View>
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
            return (
              <View style={{ paddingTop: 9 }}>
                <Image source={newIcon} style={{ width: 70, height: 40 }} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View style={{ width: 24, height: 24 }}>
                <Feather name="user" size={size} color="#212121" />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIcon: {},
});

