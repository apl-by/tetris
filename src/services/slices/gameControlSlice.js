import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPause: true,
  isGameOn: false,
  isGameOver: false,
  pressedBtn: "",
};

const gameControlSlice = createSlice({
  name: "gameControl",
  initialState,
  reducers: {
    togglePause: (state, action) => {
      state.isPause = !state.isPause;
    },
    setPause: (state, action) => {
      state.isPause = true;
    },
    start: (state, action) => {
      state.isGameOn = true;
      state.isGameOver = false;
      state.isPause = false;
    },
    setBtn: (state, action) => {
      state.pressedBtn = action.payload;
    },
    clearBtn: (state, action) => {
      state.pressedBtn = action.payload;
    },
    setGameOver: (state, action) => {
      state.isGameOver = true;
      state.isGameOn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("reset", (state, action) => ({
      ...initialState,
      pressedBtn: state.pressedBtn,
    }));
  },
});

export const {
  togglePause,
  setPause,
  start,
  setBtn,
  clearBtn,
  setGameOver,
} = gameControlSlice.actions;

export default gameControlSlice.reducer;
