import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { useAuth } from "../../hooks/useAuth";
import { db, storage } from "../../firebase/config";
import { doc, collection, onSnapshot } from "firebase/firestore";

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const { authState } = useAuth();

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          commentsCount: data.comments ? data.comments.length : 0,
        };
      });
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
        renderItem={({
          item: {
            id,
            photo,
            namePost,
            location,
            convertedCoordinate: { region, country },
            commentsCount,
          },
        }) => (
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
                gap: 5 ,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CommentsScreen", { postId: id, photo })
                }
                style={styles.info}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" style={[
                      { transform: [{ rotate: '-90deg' }] },
                      commentsCount
                        ? { color: '#FF6C00' }
                        : { color: '#BDBDBD' },
                    ]}/>
                <Text style={[
                      styles.textComment,
                      commentsCount
                        ? { color: '#212121' }
                        : { color: '#BDBDBD' },
                    ]}>{commentsCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.info}>
            <Feather name="thumbs-up" size={24} color="#BDBDBD" />
            <Text style={styles.textComment}>0</Text>
            </TouchableOpacity>

              <TouchableOpacity
                style={styles.info}
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    photo,
                    namePost,
                    location,
                  })
                }
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text
                  style={[{ ...styles.text, ...styles.locationText }]}
                >{`${region}, ${country}`}</Text>
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
    flexDirection: "row",
    alignItems: "center",
  },
  profileImages: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  profileName: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
  },
  profileEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  text: {
    fontSize: 16,
    color: "#212121",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  info: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
