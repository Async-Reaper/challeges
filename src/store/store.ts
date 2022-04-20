import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postApi } from '../services/PostService'
import loginSlice from "./reducers/loginSlice";
import settingsSlice from "./reducers/settingsSlice";
import signupSlice from "./reducers/signupSlice";

const rootReducer = combineReducers({
    login: loginSlice,
    signup: signupSlice,
    settings: settingsSlice,
    [postApi.reducerPath]: postApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']