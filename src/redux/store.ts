import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { questionsRequest } from "./questionsSlice/reducer";
import categoriesRequest from "./categoriesSlice/redux";

export const store = configureStore({
  reducer: {
    questions: questionsRequest.reducer,
    categories: categoriesRequest.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
