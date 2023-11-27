import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDispatch } from 'react-redux';
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from '../hooks/useAuth';
import { removeUserAvatar } from '../redux/auth/authOperations';

export const ImageViewer = ({ state, onPress, onDelete }) => {
  const dispatch = useDispatch();

    const defaultImage = require('../assets/images/rectangle.png');

    const {
      authState: { photoURL },
    } = useAuth();

    
  const imageSource = state.photoURL !== null ? { uri: state.photoURL } : defaultImage;

  const handleDelete = () => {
    onDelete();
  };
  const handleRemoveAvatar = () => {
    dispatch(removeUserAvatar(null));
  };

  return (
    <View style={styles.imageContainer}>
      {imageSource && <Image style={styles.imageStyle} source={imageSource} />}

      {state.photoURL !== null ? (
  <TouchableOpacity style={styles.loadPhoto} onPress={photoURL
    ? handleRemoveAvatar
    : handleDelete}>
    <AntDesign name="closecircleo" size={25} color="black" />
  </TouchableOpacity>
) : (
  <TouchableOpacity style={styles.loadPhoto} onPress={onPress}>
    <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
  </TouchableOpacity>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    
    left: 128,
    top: -60,
  },
  imageStyle: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  loadPhoto: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },
});
