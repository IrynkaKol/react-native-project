import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity } from "react-native";
import { EvilIcons } from '@expo/vector-icons'; 

// const Tab = createBottomTabNavigator();

export const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({item}) => (
          <View style={{marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{ uri: item.photo }}
              style={{ width: 200, height: 200 }}
            />
            
      <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
        
        <EvilIcons name="comment" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}> 
        <EvilIcons name="location" size={24} color="#BDBDBD" />
        </TouchableOpacity>
          </View>
          
        )}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
