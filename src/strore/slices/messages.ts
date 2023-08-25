import { Message_Type } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Message_Type[] = [];

const messagesSlices = createSlice({
  name: "messages",
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
      return state.filter((message) => message.id !== action.payload);
    },

    updateMessage: (state, action: { payload: Message_Type }) => {
      const filter = state.filter(
        (message) => message.id !== action.payload.id
      );

      return [...filter, action.payload];
    },
  },
});

export const messagesActions = messagesSlices.actions;

export default messagesSlices.reducer;
