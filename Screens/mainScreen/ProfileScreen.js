import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";


import { authSignOutUser } from "../../redux/auth/authOperations";
// import { auth } from "../../firebase/config";
import { Ionicons } from '@expo/vector-icons';

export const ProfileScreen = ({}) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      {/* <Button title="signOut" onPress={handleSignOut}>signOut</Button> */}
      <TouchableOpacity
        style={{ position: "absolute", right: 0, marginTop: 22 }}
        onPress={handleSignOut}
      >
        <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
        {/* <Ionicons name="exit-outline" size={24} color="#BDBDBD" /> */}
      </TouchableOpacity>
    </View>
  );
};
