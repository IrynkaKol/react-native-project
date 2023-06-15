import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from 'expo-location';

export const CreatePostsScreen = ({navigation}) => {
  const cameraIcon = require("../../assets/icons/camera.png");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync()
    console.log('latitude', location.coords.latitude)
    console.log('longitude', location.coords.longitude)
    // console.log("camera", photo.uri);
    setPhoto(photo.uri); // зберігаємо посилання на нашу фото
    console.log("photo", photo);
    
  };
  const sendPhoto = () => {
    navigation.navigate('Posts', {photo})
    // console.log("navigation", navigation);
  };
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('status', status)
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{
                  height: 200,
                  width: 200,
                  borderColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto}>
            <Image source={cameraIcon} style={{ width: 60, height: 60 }} />
          </TouchableOpacity>
        </Camera>

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
      </View>
      <View style={{ gap: 16 }}>
        <TextInput style={styles.input} placeholder="Назва..." />
        <TextInput style={styles.input} placeholder="Місцевість..." />
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
