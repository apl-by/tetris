import { createSlice } from "@reduxjs/toolkit";
import LEVEL_CONFIG from "../../utils/levelsConfig";

const initialState = {
  score: 0,
  record: 0,
  lines: 0,
  level: 1,
  levelConfig: LEVEL_CONFIG[1],
};

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {
    updateStat: (state, action) => {
      const { newScore, newLines } = action.payload;
      state.score = newScore;
      if (state.record < state.score) {
        state.record = state.score;
      }
      state.lines += newLines;
    },
    upLevel: (state, action) => {
      state.level = action.payload;
      state.levelConfig = LEVEL_CONFIG[state.level];
    },
  },
  extraReducers: (builder) => {
    builder.addCase("reset", (state, action) => ({
      ...initialState,
      record: state.record,
    }));
  },
});

export const { updateStat, upLevel } = statSlice.actions;
export default statSlice.reducer;
