import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { router } from '../router';
import { useAuth } from '../hooks/useAuth';
import { authStateChangedUser } from '../redux/auth/authOperations';


const MainStack = createStackNavigator();

export const Main = () => {
    const {
        authState: { stateChange },
      } = useAuth();
      const dispatch = useDispatch();
    
      const routing = router(stateChange); // true false null
    
      useEffect(() => {
        dispatch(authStateChangedUser());
      }, []);
    
   

      return (
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="LoginScreen">
            {routing}
          </MainStack.Navigator>
        </NavigationContainer>
      );
}

// console. disableYellowBox = true;