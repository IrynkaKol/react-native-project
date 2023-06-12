import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const ImageViewer = ({ selectedImage, onPress, onDelete }) => {
  const imageSource = selectedImage !== null ? { uri: selectedImage } : null;
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.imageStyle} source={imageSource} />

      {!imageSource ? (
        <TouchableOpacity style={styles.loadPhoto} onPress={onPress}>
          <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.loadPhoto}
          onPress={() => onDelete(null)}
        >
          <AntDesign name="closecircleo" size={25} color="black" />
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
