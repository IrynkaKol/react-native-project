import { useState } from "react";
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

export const RegistrationScreen = ({}) => {
  const [isShowKeybord, setIsShowKeybord] = useState(false);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
           keyboardVerticalOffset={Platform.OS === "ios" ? -145 : -145}
        >
          <View style={{...styles.container, paddingBottom: isShowKeybord ? 32 : 78}}>
            <View
              style={{
                width: 120,
                height: 120,
                backgroundColor: "#F6F6F6",
                borderRadius: 16,
                position: "absolute",
                left: 128,
                top: -60,
              }}
            ></View>
            <Text style={styles.headerTitle}>Реєстрація</Text>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.inputForm}
                placeholder="Логін"
                onFocus={() => setIsShowKeybord(true)}
              />
              <TextInput
                style={styles.inputForm}
                placeholder="Адреса електронної пошти"
                onFocus={() => setIsShowKeybord(true)}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputForm}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeybord(true)}
                />
                <TouchableOpacity style={styles.passswordButton}>
                  <Text>Показати</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity="0.5">
              <Text style={styles.buttonTitle}>Зареєструватися</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.textLogin}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
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
    // paddingBottom: 78,
    paddingHorizontal: 16,
    position: "relative",
  },
  headerTitle: {
    textAlign: "center",
    marginBottom: 33,
    fontSize: 30,
  },
  formContainer: {
    gap: 16,
    marginBottom: 43,
  },

  inputForm: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    marginBottom: 16,
  },
  buttonTitle: {
    fontSize: 16,
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
  textLogin: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});
