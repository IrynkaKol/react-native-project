import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

// const Tab = createBottomTabNavigator();

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  // console.log('route.params', route.params)
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
