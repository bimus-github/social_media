import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { User_Type } from "@/types";

// Define the initial state using that type
const initialState: User_Type = {
  id: "",
  about: "",
  firstname: "",
  lastname: "",
  location: "",
  username: "",
  imageUrl: "",
  job: "",
};

export const currentUserSlices = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User_Type>) => {
      return action.payload;
    },

    resetUser: (state, _) => initialState,
  },
});

export const currentUserActions = currentUserSlices.actions;

export default currentUserSlices.reducer;
