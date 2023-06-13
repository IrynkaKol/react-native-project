import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { PostsScreen } from "../PostsScreen/PostsScreen";

export const Home = ({}) => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>
           Home
           </Text>
        </View>
    )
}