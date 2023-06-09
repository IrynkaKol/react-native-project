import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import backgroundImage from "../../assets/images/background.png";

export const RegistrationScreen = ({}) => {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Реєстрація</Text>
        </View>
        <View style={styles.formContiner}>
          <TextInput style={styles.inputForm} placeholder="Логін" />
          <TextInput
            style={styles.inputForm}
            placeholder="Адреса електронної пошти"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputForm}
              placeholder="Пароль"
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.passswordButton}>
              <Text>Показати</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTitle}>Зареєструватися</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.textLogin}>Вже є акаунт? Увійти</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    backgroundColor: "#fff",
    // justifyContent: 'center',
    // alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 263,
    minHeight: 549,
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 33,
    fontSize: 30,
  },
  formContiner: {
    gap: 16,
    marginBottom: 32,
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
    color: '#1B4371',
    fontSize: 16,
    textAlign:'center'
  }
});
