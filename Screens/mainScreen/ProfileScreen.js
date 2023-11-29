import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { authSignOutUser } from "../../redux/auth/authOperations";
// import { auth } from "../../firebase/config";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from '../../hooks/useAuth';

export const ProfileScreen = ({}) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  const { authState } = useAuth();

  useEffect(() => {
    getUsersPosts();
  }, []);

  // useEffect(() => {
  //   console.log(userPosts); // Перевірка вмісту стану у консоль
  // }, [userPosts]);

  const getUsersPosts = async () => {
    const postsRef = collection(db, "posts");
    const queryRef = query(postsRef, where("userId", "==", userId));
    onSnapshot(queryRef, (querySnapshot) => {
      const postUser = querySnapshot.docs.map((doc) => doc.data());
      setUserPosts(postUser); 
      console.log(postUser);// Вивід даних в консоль
    });
  };

  const handleSignOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View>
      <View>
      <FlatList
        data={userPosts}
        keyExtractor={(item, indx) =>  indx.toString()}
        renderItem={({ item: id,
          photo,
          namePost,
          location,
          convertedCoordinate: { country, region },
          commentsCount, }) => (
          <View
            style={{
              marginBottom: 10,
              marginTop: 15,
              justifyContent: "center",
              marginHorizontal: 16,
              // alignItems: "center",
            }}
          >
            <Image
              source={{ uri: photo }}
              style={{
                width: 343,
                height: 240,
                borderColor: "#E8E8E8",
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
          </View>
        )}
      />
      </View>

      <TouchableOpacity
        style={{ position: "absolute", right: 0, marginTop: 22 }}
        onPress={handleSignOut}
      >
        <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
        {/* <Ionicons name="exit-outline" size={24} color="#BDBDBD" /> */}
      </TouchableOpacity>
    </View>
  );
};
