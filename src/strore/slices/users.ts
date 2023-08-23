import { User_Type } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User_Type[] = [];

const usersSlices = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (_, action: { payload: User_Type[] }) => {
      return action.payload;
    },
  },
});

export const usersActions = usersSlices.actions;
export default usersSlices.reducer;
