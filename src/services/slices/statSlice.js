import { createSlice } from "@reduxjs/toolkit";
import LEVEL_CONFIG from "../../utils/levelsConfig";

const initialState = {
  score: 0,
  record: 0,
  lines: 0,
  level: LEVEL_CONFIG[1],
};

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {
    set: (state, action) => {
      state = { ...state };
    },
  },
});

export const { set } = statSlice.actions;
export default statSlice.reducer;
