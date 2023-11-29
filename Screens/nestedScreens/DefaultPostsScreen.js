import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useAuth } from '../../hooks/useAuth';
import {db, storage} from "../../firebase/config";
import { doc, collection, onSnapshot } from "firebase/firestore";

// const Tab = createBottomTabNavigator();

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);


  const { authState } = useAuth();
 
 

  const getAllPosts = async () => {
   await onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        
      }));
       // console.log("postsData", postsData); // Перевірка отриманих даних
      setPosts(postsData);
    });
   
    };
  

  useEffect(() => {
    getAllPosts();
    // if (route.params) {
    //   setPosts((prevState) => [...prevState, route.params]);
    // }
  }, []);
  //}, [route.params]);
  // console.log("posts", posts);

  return (
    <View style={styles.container}>
       <View style={styles.profileContainer}>
        <Image
          style={styles.profileImages}
          source={{ uri: authState.photoURL }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{authState.login}</Text>
          <Text style={styles.profileEmail}>{authState.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item: {
          id,
          photo,
          namePost,
          location,
          convertedCoordinate: { region, country },
          commentsCount,
        }, }) => (
          <View
            style={{
              marginBottom: 10,
              marginTop: 15,
              justifyContent: "center",
              marginHorizontal: 16,
              // alignItems: "center",
            }}
          >
            <Image
              source={{ uri: photo }}
              style={{
                width: 343,
                height: 240,
                borderColor: "#E8E8E8",
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
            <View>
              <Text>{namePost}</Text>
            </View>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("CommentsScreen", {postId: id, photo})}
                style={{}}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("MapScreen", {photo,
                      namePost,
                      location,})}>
              <Feather name="map-pin" size={24} color="black" />
              <Text style={[{ ...styles.text, ...styles.locationText }]}>{`${region}, ${country}`}</Text>
              </TouchableOpacity>
            </View>
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
  profileContainer: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImages: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  profileName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
  },
  profileEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
  text: {
    fontSize: 16,
    color: '#212121',
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
  },
});
