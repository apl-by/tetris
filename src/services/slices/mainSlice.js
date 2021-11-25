import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PIECES_CONFIG from "../../utils/piecesConfig";
import {
  createPlayArea,
  createStatArea,
  producePieces,
  checkMovePermit,
  getCells,
  setPositionOnDrop,
  setPositionOnTurn,
  checkRotation,
} from "../../utils/utils";

const initialPlayArea = createPlayArea();
const initialStatArea = createStatArea();

export const handleMatchesAsync = createAsyncThunk("main/matches", async () => {
  return await new Promise((resolve) => setTimeout(resolve, 500));
});

export const gameOverAsync = createAsyncThunk(
  "main/gameOver",
  async (payload, { dispatch }) => {
    let count = 20;

    await new Promise((resolve) => {
      setTimeout(function run() {
        if (count <= 0) {
          count = 1;
          return resolve();
        }
        dispatch(fillCells(count * 10));
        count--;
        setTimeout(run, 40);
      }, 40);
    });
    await new Promise((resolve) => {
      setTimeout(function run() {
        if (count > 20) {
          return resolve();
        }
        dispatch(emptyCells(count * 10));
        count++;
        setTimeout(run, 40);
      }, 40);
    });
    return;
  }
);

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
  isRoundEnd: false,
  needSave: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setPieces: (state, action) => {
      // обновляем свойство state.pieces
      if (state.pieces.all.length < 2) {
        const newPieces = producePieces();
        state.pieces.all = [...state.pieces.all, ...newPieces];
      }
      state.pieces.current = state.pieces.all.splice(0, 1)[0];
      state.pieces.next = state.pieces.all[0];
      // обновляем свойствa state.playArea && state.statArea
      const currentCells = PIECES_CONFIG[state.pieces.current].base.cells;
      const nextCells = PIECES_CONFIG[state.pieces.next].base.cells;
      const filteredCells = currentCells.filter((i) => i >= 10 && i < 210);
      Object.keys(state.statArea).forEach(
        (i) => (state.statArea[i].isActive = false)
      );
      nextCells.forEach((i) => (state.statArea[i].isActive = true));
      filteredCells.forEach((i) => (state.playArea[i].isActive = true));
      // обновляем свойство state.position
      state.position = initialState.position;
      state.isRoundEnd = false;
      state.needSave = true;
    },
    drop: (state, action) => {
      const playArea = state.playArea;
      const piece = state.pieces.current;
      const pos = state.position;
      const newPos = setPositionOnDrop(playArea, piece, pos);
      const { prevCells, nextCells } = getCells(piece, pos, newPos);
      prevCells.forEach((i) => (state.playArea[i].isActive = false));
      nextCells.forEach((i) => (state.playArea[i].isActive = true));
      state.position = newPos;
      state.isRoundEnd = true;
    },
    moveDown: (state, action) => {
      const playArea = state.playArea;
      const piece = state.pieces.current;
      const pos = state.position;
      if (checkMovePermit(playArea, piece, pos, "checkBottom")) {
        const newPos = { ...pos, y: pos.y + 10 };
        const { prevCells, nextCells } = getCells(piece, pos, newPos);
        prevCells.forEach((i) => (state.playArea[i].isActive = false));
        nextCells.forEach((i) => (state.playArea[i].isActive = true));
        state.position = newPos;
        return;
      }
      state.isRoundEnd = true;
    },
    moveLeft: (state, action) => {
      const playArea = state.playArea;
      const piece = state.pieces.current;
      const pos = state.position;
      if (checkMovePermit(playArea, piece, pos, "checkLeft")) {
        const newPos = { ...pos, x: pos.x - 1 };
        const { prevCells, nextCells } = getCells(piece, pos, newPos);
        prevCells.forEach((i) => (state.playArea[i].isActive = false));
        nextCells.forEach((i) => (state.playArea[i].isActive = true));
        state.position = newPos;
      }
    },
    moveRight: (state, action) => {
      const playArea = state.playArea;
      const piece = state.pieces.current;
      const pos = state.position;
      if (checkMovePermit(playArea, piece, pos, "checkRight")) {
        const newPos = { ...pos, x: pos.x + 1 };
        const { prevCells, nextCells } = getCells(piece, pos, newPos);
        prevCells.forEach((i) => (state.playArea[i].isActive = false));
        nextCells.forEach((i) => (state.playArea[i].isActive = true));
        state.position = newPos;
      }
    },
    turn: (state, action) => {
      const playArea = state.playArea;
      const piece = state.pieces.current;
      const pos = state.position;
      const newPos = setPositionOnTurn(pos);
      if (checkRotation(playArea, piece, newPos, pos)) {
        const { prevCells, nextCells } = getCells(piece, pos, newPos);
        prevCells.forEach((i) => (state.playArea[i].isActive = false));
        nextCells.forEach((i) => (state.playArea[i].isActive = true));
        state.position = newPos;
      }
    },
    fillCells: (state, action) => {
      const num = action.payload;
      const cells = Array.from({ length: 10 }, (el, ind) => num + ind);
      cells.forEach((i) => (state.playArea[i].isActive = true));
    },
    emptyCells: (state, action) => {
      const num = action.payload;
      const cells = Array.from({ length: 10 }, (el, ind) => num + ind);
      cells.forEach((i) => (state.playArea[i].isActive = false));
    },
    setSaved: (state, action) => {
      state.needSave = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleMatchesAsync.pending, (state, action) => {
        action.meta.arg.cells.forEach((i) => (state.playArea[i].match = true));
      })
      .addCase(handleMatchesAsync.fulfilled, (state, action) => {
        const { cells, newPlayArea } = action.meta.arg;
        Object.entries(newPlayArea).forEach(
          (i) => (state.playArea[i[0]].isActive = i[1].isActive)
        );
        cells.forEach((i) => (state.playArea[i].match = false));
      })
      .addCase(gameOverAsync.pending, (state, action) => {
        state.isRoundEnd = true;
      })
      .addCase(gameOverAsync.fulfilled, (state, action) => initialState)
      .addCase("restart", (state, action) => initialState);
  },
});

export const {
  setPieces,
  drop,
  moveDown,
  moveLeft,
  moveRight,
  turn,
  fillCells,
  emptyCells,
  setSaved,
} = mainSlice.actions;
export default mainSlice.reducer;
