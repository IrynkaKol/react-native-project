import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    query,
    orderBy,
  } from 'firebase/firestore';
import { AntDesign } from "@expo/vector-icons";
import {db} from "../../firebase/config";
import { useSelector } from "react-redux";

export const CommentsScreen = ({route}) => { // із route дістаємо із HOME  id item
    const {postId} = route.params;
  const [comment, setComment] = useState("");
  const {login} = useSelector(state => state.auth)

  const createPost = async () => {
    const postRef = doc(db, 'posts', postId);
    const commentsCollectionRef = collection(postRef, 'comments');

      const commentRef = await addDoc(commentsCollectionRef, {
        comment,
        login,
      });
      // console.log('commentRef', commentRef)
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputComment}
          placeholder="Коментувати..."
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.sendComment} onPress={createPost}>
          <AntDesign
            name="arrowup"
            size={26}
            color="#FFFFFF"
            backgroundColor="#FF6C00"
            style={{ padding: 4 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    position: "relative",
  },
  inputComment: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingLeft: 16,
    paddingRight: 50,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  sendComment: {
    position: "absolute",
    top: 8,
    right: 8,

    borderRadius: 50,
    overflow: "hidden",
  },
});
