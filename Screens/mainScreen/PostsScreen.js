// import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack"; // для створення скринів

import { DefaultPostsScreen } from "../nestedScreens/DefaultPostsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Feather } from "@expo/vector-icons";

const NestedScreens = createStackNavigator();

export const PostsScreen = ({ navigation, setTabBarStyle }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  
  return (
    <NestedScreens.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "#E5E5E5",
        },
        cardStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <NestedScreens.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          headerTitle: () => (
            <Text
              style={{
                marginBottom: 10,
                fontFamily: "Roboto-Medium",
                fontSize: 17,
              }}
            >
              Публікації
            </Text>
          ),

          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16, marginBottom: 10 }}
              onPress={signOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreens.Screen
        name="CommentsScreen"
        options={{
          headerTitle: () => (
            <Text
              style={{
                marginBottom: 10,
                fontFamily: "Roboto-Medium",
                fontSize: 17,
              }}
            >
              Коментарі
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, marginBottom: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
        }}
      >
        {({ route, navigation }) => (
          <CommentsScreen
            route={route}
            navigation={navigation}
            setTabBarStyle={setTabBarStyle}
          />
        )}
      </NestedScreens.Screen>
      <NestedScreens.Screen
        name="MapScreen"
        options={{
          headerTitle: () => (
            <Text
              style={{
                marginBottom: 10,
                fontFamily: "Roboto-Medium",
                fontSize: 17,
              }}
            >
              Мапа
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, marginBottom: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
        }}
      >
        {({ route, navigation }) => (
          <MapScreen
            route={route}
            navigation={navigation}
            setTabBarStyle={setTabBarStyle}
          />
        )}
      </NestedScreens.Screen>
    </NestedScreens.Navigator>
  );
};
