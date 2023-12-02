import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Image,
  ImageBackground,
  
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import * as ImagePicker from "expo-image-picker";
import backgroundImage from "../../assets/images/background.png";
import { ImageViewer } from "../../components/ImageViewer";
import { Feather} from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import {
  authSignOutUser,
  uploadAvatarToServer,
  removeUserAvatar
  
} from "../../redux/auth/authOperations";

export const ProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  
  // const { userId } = useSelector((state) => state.auth);

  const { height, width } = useWindowDimensions();
  const { authState } = useAuth();

  useEffect(() => {
    getUsersPosts();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const photoURL = await uploadAvatarToServer(result.assets[0].uri);
      // setState((prev) => ({ ...prev, photoURL }));
      // setSelectedImage(result.assets[0].uri);
      dispatch(
      removeUserAvatar(photoURL))

    } else {
      alert("You did not select any image.");
    }
  };

  // const handleDeleteImage = () => {
  //   setState((prev) => ({ ...prev, photoURL: null }));
  //   // setSelectedImage(null);
  // };

  // const signOut = () => {
  //   dispatch(authSignOutUser());
  // };

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const photoURL = await uploadAvatarToServer(result.assets[0].uri);

  //     dispatch(removeUserAvatar(photoURL));
  //   } else {
  //     alert('You did not select any image.');
  //   }
  // };
  // useEffect(() => {
  //   console.log(userPosts); // Перевірка вмісту стану у консоль
  // }, [userPosts]);

  const getUsersPosts = async () => {
    const postsRef = collection(db, "posts");
    const queryRef = query(postsRef, where("userId", "==", authState.userId));
    onSnapshot(queryRef, (querySnapshot) => {
      const postUser = querySnapshot.docs.map((doc) => doc.data());
      setUserPosts(postUser);
      console.log(postUser); // Вивід даних в консоль
    });
  };

  const handleSignOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ position: "absolute", width: width, height: height }}
      />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.infoUserThumb}>
            <ImageViewer
              state={authState}
              onPress={pickImageAsync}
              // onDelete={handleDeleteImage}
            />
            <Text style={styles.infoUserName}>{authState.login}</Text>
            <TouchableOpacity
              style={{ position: "absolute", right: 0, marginTop: 22 }}
              onPress={handleSignOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <View style={styles.listPost}>
            <FlatList
              data={userPosts}
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
              }) => {
                return (
                  <View style={styles.subContainer}>
                    <View
                      style={styles.imageContainer}
                      // style={{
                      //   marginBottom: 10,
                      //   marginTop: 15,
                      //   justifyContent: "center",
                      //   marginHorizontal: 16,
                      //   // alignItems: "center",
                      // }}
                    >
                      <Image
                        source={{ uri: photo }}
                        style={{
                          height: 240,
                          borderRadius: 8,
                          // width: 343,

                          // borderColor: "#E8E8E8",
                          // borderWidth: 1,
                        }}
                      />
                    </View>
                    <Text style={[{ ...styles.text, ...styles.namePost }]}>
                      {namePost}
                    </Text>
                    <View style={styles.infoThumb}>
                      <TouchableOpacity
                        style={styles.info}
                        onPress={() =>
                          navigation.navigate("CommentsScreen", {
                            postId: id,
                            photo,
                          })
                        }
                      >
                        <Feather
                          name="message-circle"
                          size={24}
                          color="#BDBDBD"
                          style={[
                            { transform: [{ rotate: "-90deg" }] },
                            commentsCount
                              ? { color: "#FF6C00" }
                              : { color: "#BDBDBD" },
                          ]}
                        />
                        <Text
                          style={[
                            styles.textComment,
                            commentsCount
                              ? { color: "#212121" }
                              : { color: "#BDBDBD" },
                          ]}
                        >
                          {commentsCount}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.info}
                        onPress={() => {
                          navigation.navigate("MapScreen", {
                            photo,
                            namePost,
                            location,
                          });
                        }}
                      >
                        <Feather name="map-pin" size={24} color="#BDBDBD" />
                        <Text
                          style={[{ ...styles.text, ...styles.locationText }]}
                        >
                          {country}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  profileContainer: {
    height: "85%",
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  infoUserThumb: {
    flex: 1,
    width: "100%",
    marginHorizontal: "auto",
  },
  infoUserName: {
    position: "absolute",
    width: "100%",
    marginTop: 92,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.3,
    textAlign: "center",
    color: "#212121",
  },
  listPost: {
    marginTop: 160,
  },
  text: {
    fontSize: 16,
    color: "#212121",
  },
  namePost: {
    marginVertical: 8,
    fontFamily: "Roboto-Medium",
  },
  infoThumb: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 32,
  },
  textComment: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
});
