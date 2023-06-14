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
import backgroundImage from "../../assets/images/background.png";

const initialState = {
  email: "",
  password: "",
};
export const LoginScreen = ({}) => {
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [state, setState] = useState(initialState);

  const navigation = useNavigation();

  const keyboardHide = () => {
    setIsShowKeybord(false);
    navigation.navigate("Home")
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -200 : -200}
        >
          <View style={styles.container}>
            <Text style={styles.headerTitle}>Увійти</Text>
            <View
              style={{
                ...styles.formContainer,
                marginBottom: isShowKeybord ? 43 : 32,
              }}
            >
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
              activeOpacity="0.5"
              onPress={keyboardHide}
            >
              <Text style={styles.buttonTitle}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={styles.textRegistration}>
                Немає акаунту? {' '}
                <Text style={{textDecorationLine: 'underline'}}>
                Зареєструватися</Text>
              </Text>
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
    paddingTop: 32,
    paddingBottom: 144,
    paddingHorizontal: 16,
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
  textRegistration: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
