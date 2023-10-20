import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { EvilIcons, MaterialIcons } from "@expo/vector-icons";

import { db, storage } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";

export const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [namePost, setNamePost] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      await MediaLibrary.requestPermissionsAsync();
      const locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    console.log("namePost", namePost);
    console.log("location", location);

    const { uri } = await camera.takePictureAsync();

    setPhoto(uri); // зберігаємо посилання на нашу фото

    console.log("photo uri", uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Home", { photo });
    // console.log("navigation", navigation);
  };

  const uploadPostToServer = async () => {
    const processedPhoto = await uploadPhotoToServer();
    // const processedPhoto = await uploadPhotoToServer();
    // const creatPost = await db.firestore().collection("posts").add({
    //   photo: processedPhoto,
    //   namePost,
    //   location: location.coords,
    //   userId,
    //   login,
    // });
    const createPost = await addDoc(collection(db, "posts"), {
      photo: processedPhoto,
      namePost,
      location: location.coords,
      userId,
      login,
    });
    console.log("Document written with ID: ", createPost .id);

  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob(); // https://firebase.google.com/docs/storage/web/download-files
    const uniquePostId = Date.now().toString();

    const dataRef = await ref(storage, `postImage/${uniquePostId}`);

    console.log("dataRef", dataRef);

    await uploadBytesResumable(dataRef, file);
    // const processedPhoto = ref(storge, "postImage")
    //   .child(uniquePostId)
    //   .getDownloadURL();
    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );
    return processedPhoto;
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{
                  borderColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto}>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ffffff",
                borderRadius: 50,
                backgroundColor: "#fff",
                height: 60,
                width: 60,
                position: "relative",
              }}
            >
              <View style={{ position: "absolute", top: 18, right: 18 }}>
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </View>
            </View>
          </TouchableOpacity>
        </Camera>
        <TouchableOpacity>
          <Text
            style={{
              color: "#BDBDBD",
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              lineHeight: 19,
            }}
          >
            Завантажте фото
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ gap: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          onChangeText={setNamePost}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <EvilIcons name="location" size={24} color="black" />
          <TextInput style={styles.input} placeholder="Місцевість..." />
        </View>
      </View>
      <TouchableOpacity onPress={sendPhoto} style={styles.publishedButton}>
        <Text style={styles.publishedTitleButton}>Опубліковати</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#ffffff",
    gap: 32,
  },
  camera: {
    height: 240,
    marginTop: 50,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  input: {
    height: 50,
    paddingTop: 16,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    color: "#212121",
    borderColor: "#E8E8E8",
  },
  publishedButton: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },

  publishedTitleButton: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    textAlign: "center",
  },
});
