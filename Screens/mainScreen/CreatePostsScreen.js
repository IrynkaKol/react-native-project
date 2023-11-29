import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { MaterialIcons, Feather } from "@expo/vector-icons";

import { db, storage } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import {uploadPhotoToServer} from "../../redux/post/postOperations"
import { useAuth } from "../../hooks/useAuth";

export const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [convertedCoordinate, setConvertedCoordinate] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [namePost, setNamePost] = useState("");
  const [isDisabledPublishBtn, setIsDisabledPublishBtn] = useState(false);

  // const { userId, login } = useSelector((state) => state.auth);
  const {
    authState: { userId },
  } = useAuth();

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
  useEffect(() => {
    const disabled =
      photo !== null &&
      namePost !== "" &&
      convertedCoordinate !== null &&
      location !== null
        ? false
        : true;

    setIsDisabledPublishBtn(disabled);
  }, [photo, namePost, location]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets.length > 0) {
      await MediaLibrary.createAssetAsync(result.assets[0].uri);
      setPhoto(result.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const addressResponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
    );
    try {
      const addressResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
      );

      if (!addressResponse.ok) {
        throw new Error(`HTTP error! Status: ${addressResponse.status}`);
      }

      const addressData = await addressResponse.json();
      const { principalSubdivision, countryName } = addressData;

      setConvertedCoordinate({ region: principalSubdivision, country: countryName });
    } catch (error) {
      console.error('Помилка при отриманні даних від API:', error.message);
    }
      // const address = await Location.reverseGeocodeAsync({
      //   latitude: coords.latitude,
      //   longitude: coords.longitude,
      // });

      // const { region, country } = address[0];

      // setConvertedCoordinate({ region, country });
    }
  };

  const openGallery = async () => {
    const galleryResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!galleryResult.canceled && galleryResult.assets.length > 0) {
      setPhoto(galleryResult.assets[0].uri);
      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);
      try {
        const addressResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
        );
  
        if (!addressResponse.ok) {
          throw new Error(`HTTP error! Status: ${addressResponse.status}`);
        }
  
        const addressData = await addressResponse.json();
        const { principalSubdivision, countryName } = addressData;
  
        setConvertedCoordinate({ region: principalSubdivision, country: countryName });
      } catch (error) {
        console.error('Помилка при отриманні даних від API:', error.message);
      }

      // const addressResponse = await fetch(
      //   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
      // );
      // const addressData = await addressResponse.json();
      // const { principalSubdivision, countryName } = addressData;
  
      // setConvertedCoordinate({ region: principalSubdivision, country: countryName });

      // const address = await Location.reverseGeocodeAsync({
      //   latitude: coords.latitude,
      //   longitude: coords.longitude,
      // });

      // const { region, country } = address[0];

      // setConvertedCoordinate({ region, country });
    }
  };

  // const takePhoto = async () => {
  //   console.log("namePost", namePost);
  //   console.log("location", location);

  //   const { uri } = await camera.takePictureAsync();

  //   setPhoto(uri); // зберігаємо посилання на нашу фото

  //   console.log("photo uri", uri);
  // };

  const sendPhoto = () => {
    if (location) {
      uploadPostToServer(photo);
      navigation.navigate("DefaultPostsScreen", { photo });
      // console.log("navigation", navigation);
      setPhoto(null);
      setNamePost("");
      setLocation(null);
      setConvertedCoordinate(null);
    }
  };

  const uploadPostToServer = async () => {
    const processedPhoto = await uploadPhotoToServer();

    const createPost = await addDoc(collection(db, "posts"), {
      photo: processedPhoto,
      namePost,
      location,
      // location: location.coords,
      convertedCoordinate,
      userId,
      // login,
    });
    navigation.navigate("DefaultPostsScreen");
    console.log("Document written with ID: ", createPost.id);
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
    const file = await response.blob(); // https://firebase.google.com/docs/storage/web/download-files
    const uniquePostId = Date.now().toString();

    const dataRef = await ref(storage, `postImage/${uniquePostId}`);

    console.log("dataRef", dataRef);

    await uploadBytesResumable(dataRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );
    return processedPhoto;
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 32 }}>
        <View
          style={[
            styles.cameraIconContainer,
            { backgroundColor: photo ? "rgba(255, 255, 255, 0.30)" : "#fff" },
            { borderColor: photo ? "rgba(255, 255, 255, 0.30)" : "#fff" },
          ]}
        >
          <View style={{ position: "absolute", top: 18, right: 18 }}>
            <TouchableOpacity onPress={openCamera}>
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={photo ? "#fff" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{
                  borderColor: "#fff",
                  borderWidth: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
            </View>
          )}

          {photo && (
            <Image
              source={{ uri: photo }}
              style={{
                // flex: 1,
                width: "100%",
                height: "100%",
                borderRadius: 8,
                top: 0,
                left: 0,
              }}
            />
          )}
        </Camera>
        <TouchableOpacity onPress={openGallery}>
          <Text
            style={{
              color: "#BDBDBD",
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              lineHeight: 19,
            }}
          >
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ gap: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Назва..."
          value={namePost.trimStart()}
          onChangeText={setNamePost}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#E8E8E8",
          }}
        >
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 4 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Місцевість..."
            value={
              convertedCoordinate
                ? `${convertedCoordinate.region}, ${convertedCoordinate.country}`
                : null
            }
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={sendPhoto}
        style={
          isDisabledPublishBtn
            ? { ...styles.publishedButton, backgroundColor: "#F6F6F6" }
            : { ...styles.publishedButton, backgroundColor: "#FF6C00" }
        }
        disabled={isDisabledPublishBtn}
      >
        <Text
          style={
            isDisabledPublishBtn
              ? { ...styles.publishedTitleButton, color: "#BDBDBD" }
              : { ...styles.publishedTitleButton, color: "#FFFFFF" }
          }
        >
          {location || !photo ? "Опубліковати" : "Завантаження..."}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          marginBottom: 34,
        }}
      >
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => {
            setPhoto(null);
            setNamePost("");
            setConvertedCoordinate(null);
            console.log("Delete");
          }}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
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
    position: "relative",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  cameraIconContainer: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 50,
    backgroundColor: "#fff",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 135,
    left: 142,
    // transform: [{ translateX: 142 }, { translateY: 125 }],
    zIndex: 1,
    height: 60,
    width: 60,
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
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },

  publishedTitleButton: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",

    textAlign: "center",
  },
  buttonDelete: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
