import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";


import { useRoute } from "../router";

export const Main = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth();
    const state = useSelector((state) => state)
    console.log(state)
    onAuthStateChanged(auth, (user) => setUser(user))
    const routing = useRoute(user); // true false null
    useEffect(() => {

    }, [])

    return <NavigationContainer>{routing}</NavigationContainer>
}