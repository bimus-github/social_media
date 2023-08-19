import { configureStore } from "@reduxjs/toolkit";
import currentUser from "@/strore/slices/currentUser";
import messageByUser from "@/strore/slices/messagesByUser";
import messages from "@/strore/slices/messages";
import users from "@/strore/slices/users";

const store = configureStore({
  reducer: {
    currentUser: currentUser,
    messageByUser: messageByUser,
    messages: messages,
    users: users,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
