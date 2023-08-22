import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session' // use sessionStorage
import authReducer from './reducers/authSlice'

// Configure Redux Persist
const authPersistConfig = {
    key: 'auth',
    storage: storageSession // use sessionStorage instead of localStorage
    // blackList: [] // For states that you don't want to save to storage, you can define in blackList
    // whiteList: [] // For states that you only want to save to storage, you can define in whiteList
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)

// Create store
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

// Create persistor (to use with PersistGate then)
const persistor = persistStore(store)

export { store, persistor }
