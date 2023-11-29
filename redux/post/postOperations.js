import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    onSnapshot,
    doc,
    query,
    where,
    collectionGroup,
    getDoc,
  } from 'firebase/firestore';
  import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  import { db, storage } from '../../firebase/config';

export const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
    const file = await response.blob(); // https://firebase.google.com/docs/storage/web/download-files
    const uniquePostId = Date.now().toString();

    const dataRef = await ref(storage, `postImage/${uniquePostId}`);

    console.log("dataRef", dataRef);

    await uploadBytesResumable(dataRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );
    return processedPhoto;
    } catch (error) {
      console.log(error);
    }
    
  };
