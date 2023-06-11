import { configureStore } from "@reduxjs/toolkit";
// Reducers
import counterReducer from "./counter/counterSlice";
import registerModalReducer from "./modal/registerModalSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    registerModal: registerModalReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
