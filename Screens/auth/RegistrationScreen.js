import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import backgroundImage from '../../assets/images/background.png'

export const RegistrationScreen = ({}) => {
  return (
    <ImageBackground source={backgroundImage}
    resizeMode="cover"
    style={{flex: 1,
        justifyContent: 'center',}}
    >
      <View>
        <Text>Реєстрація</Text>
      </View>
      <View>
        <TextInput placeholder="Логін" />
        <TextInput placeholder="Адреса електронної пошти" />
        <TextInput placeholder="Пароль" />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>Зареєструватися</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    
       
  },
  button: {},
  buttonTitle: {
    fontSize: 16,
  },
});
