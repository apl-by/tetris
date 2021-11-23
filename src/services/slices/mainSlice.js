import { createSlice } from "@reduxjs/toolkit";
import { createPlayArea, createStatArea } from "../../utils/utils";
import { producePieces } from "../../utils/utils";
import PIECES_CONFIG from "../../utils/piecesConfig";

const initialPlayArea = createPlayArea();
const initialStatArea = createStatArea();

const initialState = {
  playArea: initialPlayArea,
  statArea: initialStatArea,
  pieces: {
    all: [],
    current: "",
    next: "",
  },
  position: {
    posType: "base",
    x: 0,
    y: 0,
  },
};

const mainSlice = createSlice({
  name: "Main",
  initialState,
  reducers: {
    // updatePlayArea: (state, action) => (state.playArea = action.payload),
    setPieces: (state, action) => {
      // обновляем свойство state.pieces
      if (state.pieces.all.length < 2) {
        const newPieces = producePieces();
        state.pieces.all = [...state.pieces.all, ...newPieces];
      }
      state.pieces.current = state.pieces.all.splice(0, 1)[0];
      state.pieces.next = state.pieces.all[0];
      // обновляем свойствa state.playArea && state.statArea
      const cells = PIECES_CONFIG[state.pieces.current].base.cells;
      const filteredCells = cells.filter((i) => i >= 10 && i < 210);
      cells.forEach((i) => (state.statArea[i].isActive = true));
      filteredCells.forEach((i) => (state.playArea[i].isActive = true));
      // обновляем свойство state.position
      state.position = initialState.position;
    },
    movePiece: (state, action) => {
      const { prevCells, nextCells, newPos } = action.payload;
      // обновляем свойство state.playArea
      prevCells.forEach((i) => (state.playArea[i].isActive = false));
      nextCells.forEach((i) => (state.playArea[i].isActive = true));
      // обновляем свойство state.position
      state.position = newPos;
    },
  },
});

export const { setPieces, movePiece } = mainSlice.actions;
export default mainSlice.reducer;
