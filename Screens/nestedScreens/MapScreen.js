import MapView, {Marker} from "react-native-maps";

import { View, Text, StyleSheet } from "react-native";

export const MapScreen = ({}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
            latitude:  49.219359,
          longitude:  16.595175,
          
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{latitude: 49.219359,
          longitude: 16.595175}} title="travel photo"/>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
