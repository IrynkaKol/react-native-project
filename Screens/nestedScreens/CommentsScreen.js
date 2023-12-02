import { useState, useEffect, useLayoutEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

import {
  View,
  Image,
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
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { db} from "../../firebase/config";
import { useSelector } from "react-redux";
import { commentDate } from "../../utils/commentDate";

export const CommentsScreen = ({ route, navigation, setTabBarStyle }) => {
  // із route дістаємо із HOME  id item
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const {
    authState: { login, photoURL, userId },
  } = useAuth();

  useEffect(() => {
    getAllPosts();
  }, []);

  useLayoutEffect(() => {
    setTabBarStyle("none");

    return () => {
      setTabBarStyle("flex");
    };
  }, []);

  const createPost = async (postId, commentData) => {
    try {
      const postRef = doc(db, "posts", postId);
      const commentsCollectionRef = collection(postRef, "comments");

      await addDoc(commentsCollectionRef, {
        ...commentData,
      });
      const postDoc = await getDoc(postRef);
    const postComments = postDoc.data().comments || [];
    await updateDoc(postRef, {
      comments: arrayUnion(commentData), 
      commentsCount: postComments.length + 1,
    });

    
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
    return false;
    }
  };

  const getAllPosts = async () => {
    const postRef = doc(db, "posts", postId);

    onSnapshot(
      query(collection(postRef, "comments"), orderBy("commentDate")),
      (snapshot) =>
        setAllComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      {/* <SafeAreaView style={styles.infoUserCommentThumb}> */}
      <FlatList
        data={allComments}
        renderItem={({ item }) => (
          <View
            style={
              userId === item.userId
                ? styles.infoUserCommentThumb
                : styles.infoCommentThumb
            }
            // style={[styles.infoComment]}
          >
            <Image
              source={{ uri: item.photoURL }}
              style={{ width: 28, height: 28, borderRadius: 28 }}
            />
            <View
              style={[
                styles.infoComment,
                userId === item.userId
                  ? { borderTopRightRadius: 0 }
                  : { borderTopLeftRadius: 0 },
              ]}
            >
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text
                style={[
                  styles.commentDate,
                  userId === item.userId
                    ? { textAlign: "left" }
                    : { textAlign: "right" },
                ]}
              >
                {item.commentDate}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* </SafeAreaView> */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputComment}
          placeholder="Коментувати..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.sendComment} onPress={() => {
          if(comment !== "") {
            createPost(postId, {
              userId, login,
              photoURL,
              comment,
              commentDate: commentDate(Date.now()),
            });
            setComment("")
          }
        }}>
          
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
  image: {
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
  },
  infoUserCommentThumb: {
    flexDirection: "row-reverse",
    gap: 16,
    marginBottom: 24,
  },
  infoCommentThumb: {
    flexDirection: "row",
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
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
  },
  inputWrapper: {
    position: "relative",
  },
  infoComment: {
    width: "85%",
    height: "auto",
    padding: 16,
    borderRadius: 6,
    // borderWidth: 1,
    // borderColor: "#20b2AA",
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
