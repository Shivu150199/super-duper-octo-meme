import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

import jobReducer from './redux/jobSlice'
const rootReducer=combineReducers({
    userState:userReducer,
    jobState:jobReducer
})

const persistConfig={
    key:'root',//name of key in root 
    version:1,
    storage,

}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false})//check som eerror and reduce teh error
    
   
})

export const persistor=persistStore(store)

