// import { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack"; // для створення скринів 

import { DefaultPostsScreen } from "../nestedScreens/DefaultPostsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";


const NestedScreens = createStackNavigator();
export const PostsScreen = () => {
  
  return (
    <NestedScreens.Navigator>
      <NestedScreens.Screen name="DefaultPostsScreen" component={DefaultPostsScreen}  options={{headerShown: false
          }}/>
      <NestedScreens.Screen name="Comments" component={CommentsScreen }  
      />
      <NestedScreens.Screen name="Map" component={MapScreen}/>
    </NestedScreens.Navigator>
  )
}
