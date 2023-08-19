import { Message_Type } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Message_Type[] = [];

const messagesByCurrentUseSlice = createSlice({
  name: "messagesCurrentUser",
  initialState,
  reducers: {
    setMessages: (_, action: { payload: Message_Type[] }) => {
      return action.payload;
    },

    resetMessages: (__, _) => {
      return [];
    },

    addMessage: (state, action: { payload: Message_Type }) => {
      return [...state, action.payload];
    },

    deleteMessage: (state, action: { payload: string }) => {
      return state.filter((message) => message.id === action.payload);
    },
  },
});

export const messagesByUserActions = messagesByCurrentUseSlice.actions;

export default messagesByCurrentUseSlice.reducer;
