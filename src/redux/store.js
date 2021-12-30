import { createStore, combineReducers } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userInfoReducer from "./reducers/UserInfoReducer"

const persistConfig = {
    key: "persist-key",
    storage
}

const rootReducer = combineReducers({
    userReducer: userInfoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const persistor = persistStore(store)

export default store
export { persistor }