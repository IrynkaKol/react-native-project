// import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
// import { Navbar } from "./Screens/NavBar/Navbar";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";


export default function App() {
  
  return (
    <View style={styles.container}>
      
      <RegistrationScreen />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    
  },
});
