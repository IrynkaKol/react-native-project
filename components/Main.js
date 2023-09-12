import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "../router";
import { auth } from "../firebase/config";
import {authStateChangedUser} from "../redux/auth/authOperations"

export const Main = () => {
    // const [user, setUser] = useState(null)
    
    const {stateChange} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    // console.log(state)
    useEffect(() => {
        dispatch(authStateChangedUser())

    }, [])
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => setUser(user))
    const routing = useRoute(stateChange); // true false null
   

    return <NavigationContainer>{routing}</NavigationContainer>
}

console. disableYellowBox = true;