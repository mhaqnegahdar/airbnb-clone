import { configureStore } from "@reduxjs/toolkit";
// Reducers
import counterReducer from "./counter/counterSlice";
import registerModalReducer from "./modal/registerModalSlice";
import loginModalReducer from "./modal/loginModalSlice";
import rentModalReducer from "./modal/rentModalSlice";
import searchModalReducer from "./modal/searchModalSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    registerModal: registerModalReducer,
    loginModal: loginModalReducer,
    rentModal: rentModalReducer,
    searchModal: searchModalReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
