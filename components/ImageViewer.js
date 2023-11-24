import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const ImageViewer = ({ selectedImage, onPress, onDelete }) => {
    const defaultImage = require('../assets/images/rectangle.png');
    console.log("selectedImage", selectedImage)
  const imageSource = selectedImage !== null ? { uri: selectedImage } : defaultImage;
  const handleDelete = () => {
    onDelete();
  };

  return (
    <View style={styles.imageContainer}>
      {imageSource && <Image style={styles.imageStyle} source={imageSource} />}

      {selectedImage !== null ? (
  <TouchableOpacity style={styles.loadPhoto} onPress={handleDelete}>
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
