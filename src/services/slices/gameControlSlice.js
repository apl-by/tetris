import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPause: true,
  isGameOn: false,
  isGameOver: false,
  isRoundEnd: false,
  pressedKey: "",
};

const gameControlSlice = createSlice({
  name: "gameControl",
  initialState,
  reducers: {
    togglePause: (state, action) => {
      state.isPause = !state.isPause;
    },
    start: (state, action) => {
      state.isGameOn = true;
      state.isGameOver = false;
      state.isPause = false;
    },
    setKeyDown: (state, action) => {
      state.pressedKey = action.payload;
    },
    clearKeyDown: (state, action) => {
      state.pressedKey = action.payload;
    },
  },
});

export const {
  togglePause,
  start,
  setKeyDown,
  clearKeyDown,
} = gameControlSlice.actions;

export default gameControlSlice.reducer;
