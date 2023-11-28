import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
   import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSlice } from './auth/authReducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
[authSlice.name]: authSlice.reducer, // name 'auth' із authSlice


})

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
   
})

const persistor = persistStore(store);

export { store, persistor };
// так як в нас буде 2 стани, нам буде потрібен combineReducers, який збере будь-яку кіькість станів в один об'єкт