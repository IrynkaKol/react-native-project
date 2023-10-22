import { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

export const CommentsScreen = ({ route }) => {
  // із route дістаємо із HOME  id item
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    const postRef = doc(db, "posts", postId);
    const commentsCollectionRef = collection(postRef, "comments");

    const commentRef = await addDoc(commentsCollectionRef, {
      comment,
      login,
    });
    // console.log('commentRef', commentRef)
  };

  const getAllPosts = async () => {
    const postRef = doc(db, "posts", postId);

    onSnapshot(
      query(collection(postRef, "comments"), orderBy("login")),
      (snapshot) =>
        setAllComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.infoUserCommentThumb}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={[styles.infoComment]}>
              <Text>{item.login}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
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
    justifyContent: "flex-end",
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  infoUserCommentThumb: {
    flexDirection: "row-reverse",
    gap: 16,
    marginBottom: 24,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  inputWrapper: {
    position: "relative",
  },
  infoComment: {
    width: "85%",
    height: "auto",
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#20b2AA",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
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
