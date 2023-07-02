import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import backgroundImage from "../../assets/images/background.png";
import * as ImagePicker from "expo-image-picker";
import {ImageViewer} from "../../components/ImageViewer"

import { registerDB } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({}) => {
  
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [state, setState] = useState(initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch()

  const navigation = useNavigation();

  const handleSubmit = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
    console.log(state);
    dispatch(registerDB(state))
    setState(initialState);
     // navigation.navigate("Home")
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -165 : -145}
        >
          <View style={styles.container}>
            <ImageViewer
              selectedImage={selectedImage}
              onPress={pickImageAsync}
              onDelete={handleDeleteImage}
            />

            <Text style={styles.headerTitle}>Реєстрація</Text>

            <View
              style={{
                ...styles.formContainer,
                marginBottom: isShowKeybord ? 43 : 32,
              }}
            >
              <TextInput
                style={styles.inputForm}
                placeholder="Логін"
                value={state.login}
                onFocus={() => setIsShowKeybord(true)}
                onChangeText={(value) =>
                  setState((prev) => ({ ...prev, login: value }))
                }
              />
              <TextInput
                style={styles.inputForm}
                placeholder="Адреса електронної пошти"
                value={state.email}
                onFocus={() => setIsShowKeybord(true)}
                onChangeText={(value) =>
                  setState((prev) => ({ ...prev, email: value }))
                }
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputForm}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  value={state.password}
                  onFocus={() => setIsShowKeybord(true)}
                  onChangeText={(value) =>
                    setState((prev) => ({ ...prev, password: value }))
                  }
                />
                <TouchableOpacity style={styles.passswordButton}>
                  <Text style={styles.passswordButtonText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonTitle} >Зареєструватися</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.textLogin}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
    position: "relative",
  },
 

  headerTitle: {
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
  },
  formContainer: {
    gap: 16,
    // marginBottom: 43,
  },

  inputForm: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },
  buttonTitle: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    textAlign: "center",
  },
  passwordContainer: {
    position: "relative",
  },
  passswordButton: {
    position: "absolute",
    top: 16,
    right: 15,
  },
  passswordButtonText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
  },
  textLogin: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
