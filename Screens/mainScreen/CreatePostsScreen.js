import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
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

import {db, storage} from "../../firebase/config";



export const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

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
  try {
    const {uri} = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();

    setPhoto(uri); // зберігаємо посилання на нашу фото
    console.log("photo uri", uri);
  } catch (error) {
    console.log("Помилка при фотографувані", error)
  }
    
  };
  const sendPhoto = () => {
    uploadPhotoToServer();
    navigation.navigate("Home", { photo });
    // console.log("navigation", navigation);
  };

      
    const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob(); // https://firebase.google.com/docs/storage/web/download-files
    const uniquePostId = Date.now().toString();

    const data = await ref(storage, `postImage/${uniquePostId}`).put(file)
   
    console.log("data", data);

     await uploadBytesResumable(data, file);
  };
  // useEffect(() => {
  //   (async () => {

  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     console.log('status', status)
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //   })();
  // }, []);

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
        <TextInput style={styles.input} placeholder="Назва..." />
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
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
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
