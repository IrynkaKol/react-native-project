import { View, Text } from "react-native";
import { NavigationRouteContext, useNavigation } from "@react-navigation/native";
 import { PostsScreen } from "../../Screens/mainScreen/PostsScreen";
import { useEffect } from "react";

export const Home = ({}) => {

     const navigation = useNavigation();
     useEffect(() => {
        navigation.navigate("Posts")
     }, [])

    return (
        <View>
           <PostsScreen/>
        </View>
    )
}