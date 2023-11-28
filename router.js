import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Home } from "./Screens/Home/Home";

const MainStack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// import { PostsScreen } from "./Screens/mainScreen/PostsScreen";
// import { CreatePostsScreen } from "./Screens/mainScreen/CreatePostsScreen";
// import { ProfileScreen } from "./Screens/mainScreen/ProfileScreen";
// import { Ionicons , AntDesign, Feather } from "@expo/vector-icons";

export const router = (isAuth) => {
  if (!isAuth) {
    return (
      <>
        <MainStack.Screen
          name="RegistrationScreen"
          options={{ headerShown: false }}
        >
          {({ navigation }) => <RegistrationScreen navigation={navigation} />}
        </MainStack.Screen>
        <MainStack.Screen name="LoginScreen" options={{ headerShown: false }}>
          {({ navigation }) => <LoginScreen navigation={navigation} />}
        </MainStack.Screen>
      </>
    );
  }
  return (
    <MainStack.Screen name="HomeScreen" options={{ headerShown: false }}>
      {({ navigation }) => <Home navigation={navigation} />}
    </MainStack.Screen>
    // <Tab.Navigator
    //   screenOptions={{
    //     headerTitleAlign: "center",
    //     headerStyle: {
    //       borderBottomWidth: 1,
    //       borderColor: "#E5E5E5",
    //     },
    //   }}
    // >
    //   <Tab.Screen
    //     name="Posts"
    //     component={PostsScreen}
    //     options={{
    //       tabBarLabel: "",

    //       headerStyle: {
    //         backgroundColor: "#FFFFFF",
    //       },
    //       headerTitle: "Публікації",
    //       headerTitleAlign: "center",

    //       headerTitleStyle: {
    //         fontFamily: "Roboto-Regular",
    //         fontSize: 17,
    //         lineHeight: 22,
    //       },

    //       headerRight: () => (
    //         <TouchableOpacity style={{ marginRight: 10, marginBottom: 10 }}>
    //           <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
    //         </TouchableOpacity>
    //       ),
    //       tabBarIcon: ({ focused, size, color }) => {
    //         return (
    //           <View style={{ width: 24, height: 24 }}>
    //             <Ionicons name="ios-grid-outline" size={size} color={color} />
    //           </View>
    //         );
    //       },
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Create"
    //     component={CreatePostsScreen}
    //     options={{
    //       tabBarLabel: "",
    //       tabBarIcon: ({ focused, size, color }) => {
    //         return (
    //           <View
    //             style={{
    //               borderRadius: 50,
    //               backgroundColor: "#FF6C00",
    //               width: 70,
    //               height: 40,
    //               position: "relative",
    //               marginTop: 9,
    //             }}
    //           >
    //             <View style={{ position: "absolute", top: 14, right: 29 }}>
    //               <AntDesign name="plus" size={13} color={color} />
    //             </View>
    //           </View>
    //         );
    //       },
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={ProfileScreen}
    //     options={{
    //       tabBarLabel: "",
    //       tabBarIcon: ({ focused, size, color }) => {
    //         return (
    //           <View style={{ width: 24, height: 24 }}>
    //             <Feather name="user" size={size} color={color} />
    //           </View>
    //         );
    //       },
    //     }}
    //   />
    // </Tab.Navigator>
  );
};


