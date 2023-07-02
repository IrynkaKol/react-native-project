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
import { authSlice } from './auth/authReducer'

const rootReducer = combineReducers({
[authSlice.name]: authSlice.reducer, // name 'auth' із authSlice
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// так як в нас буде 2 стани, нам буде потрібен combineReducers, який збере будь-яку кылькысть станыв в один об'єкт