// import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useFonts } from 'expo-font';
// import { Navbar } from "./Screens/NavBar/Navbar";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";


export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
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
