import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

export const CreatePostsScreen = ({}) => {
  const cameraIcon = require("../../assets/icons/camera.png");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    // console.log("camera", photo.uri);
    setPhoto(photo.uri); // зберігаємо посилання на нашу фото
    console.log("photo", photo);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto}>
          <Image source={cameraIcon} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
  },
  camera: {
    height: 240,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,

    borderRadius: 8,
  },
});
