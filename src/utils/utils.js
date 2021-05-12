import PIECES_CONFIG from "./piecesConfig";
import LINES_CONFIG from "./levelsConfig";
import { PIECES_TYPES, BASE_NUM } from "./config";
import _cloneDeep from "lodash/cloneDeep";

export const createPlayArea = () => {
  const initialState = {};
  for (let i = 10; i < 210; i++) {
    initialState[`${i}`] = { isActive: false, match: false, id: i };
  }
  return initialState;
};

export const createStatArea = () => {
  const statAria = {};
  const arrNum = BASE_NUM;
  for (let i = 0; i < 8; i++) {
    const num = arrNum.splice(0, 1);
    statAria[`${num}`] = { isActive: false, id: num };
  }
  return statAria;
};

const mixArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const handlePieces = (piecesObj) => {
  if (piecesObj.all.length < 2) {
    const array = new Array(2).fill(PIECES_TYPES).flat();
    const newPieces = [...piecesObj.all, ...mixArray(array)];
    return {
      all: newPieces.slice(1),
      current: newPieces[0],
      next: newPieces[1],
    };
  }
  return {
    all: piecesObj.all.slice(1),
    current: piecesObj.all[0],
    next: piecesObj.all[1],
  };
};

export const displayNextPiece = (next, statArea) => {
  const newStatArea = _cloneDeep(statArea);
  const pieceCells = PIECES_CONFIG[`${next}`].base.cells;
  pieceCells.forEach((i) => {
    newStatArea[`${i}`].isActive = true;
  });
  return newStatArea;
};

export const updatePlayArea = (playArea, piece, piecePos) => {
  const newPlayArea = _cloneDeep(playArea);
  const { position, x, y } = piecePos;
  const sum = x + y;
  const pieceCells = PIECES_CONFIG[`${piece}`][`${position}`].cells;
  const newPos = pieceCells.map((i) => i + sum);

  newPos.forEach((i) => {
    if (i < 10) return;
    newPlayArea[`${i}`].isActive = true;
  });
  return newPlayArea;
};

export const checkMovement = (playArea, piece, piecePos, direction) => {
  const { position, x, y } = piecePos;
  const sum = x + y;
  const cells = PIECES_CONFIG[`${piece}`][`${position}`][`${direction}`];
  const cellsToCheck = cells.map((i) => i + sum);

  if (cellsToCheck.some((i) => i > 209)) return false;

  if (
    direction === "checkLeft" &&
    cellsToCheck.some((i) =>
      i < 0 ? String(i).match(/-\d?1$/) : String(i).match(/9$/)
    )
  )
    return false;

  if (
    direction === "checkRight" &&
    cellsToCheck.some((i) =>
      i < 0 ? String(i).match(/-\d?0$/) : String(i).match(/0$/)
    )
  )
    return false;

  return !cellsToCheck.some((i) =>
    i < 10 ? false : playArea[`${i}`].isActive === true
  );
};

export const getTurnPosition = (piecePosition) => {
  const clone = { ...piecePosition };
  clone.position =
    clone.position === "base"
      ? "left"
      : clone.position === "left"
      ? "reverse"
      : clone.position === "reverse"
      ? "right"
      : "base";

  return clone;
};

export const checkRotation = (playArea, piece, piecePos) => {
  const { position, x, y } = piecePos;
  const sum = x + y;
  const cells = PIECES_CONFIG[`${piece}`][`${position}`].cells;
  const cellsToCheck = cells.map((i) => i + sum);

  if (cellsToCheck.some((i) => i > 209)) return false;

  if (
    cellsToCheck.some((i) =>
      i < 0 ? String(i).match(/-\d?1$/) : String(i).match(/9$/)
    ) &&
    cellsToCheck.some((i) =>
      i < 0 ? String(i).match(/-\d?0$/) : String(i).match(/0$/)
    )
  )
    return false;

  return !cellsToCheck.some((i) =>
    i < 10 ? false : playArea[`${i}`].isActive === true
  );
};

export const handleDrop = (playArea, piece, piecePos) => {
  const { position, x, y } = piecePos;
  const sum = x + y;
  const cells = PIECES_CONFIG[`${piece}`][`${position}`].checkBottom;
  const cellsToCheck = cells.map((i) => i + sum);

  let count = y;
  while (count < 190) {
    if (cellsToCheck.some((i) => i > 209 || playArea[`${i}`].isActive === true))
      break;

    count += 10;
    cellsToCheck.forEach((i, ind, arr) => (arr[ind] = i + 10));
  }
  return { ...piecePos, y: count };
};

export const searchMatch = (playArea) => {
  const clone = _cloneDeep(playArea);
  const matches = {};
  let match = 0;

  for (let i = 200; i >= 10 && match < 4; i -= 10) {
    let activeCells = 0;
    let nonActiveCells = 0;

    for (let j = 0; j < 10 && !(activeCells && nonActiveCells); j++) {
      clone[`${i + j}`].isActive ? activeCells++ : nonActiveCells++;
    }

    if (activeCells === 10) {
      match++;
      matches[`match${match}`] = {
        rowStartCell: i,
        cells: Array.from({ length: 10 }, (el, ind) => i + ind),
      };
    }
    if (!activeCells) break;
  }
  return matches;
};

export const displayMatches = (playArea, matches) => {
  const clone = _cloneDeep(playArea);
  const matchedCells = Object.values(matches)
    .map((i) => i.cells)
    .flat();
  matchedCells.forEach((i) => (clone[`${i}`].match = true));
  return clone;
};

export const deleteMatches = (playArea, matches) => {
  const clone = _cloneDeep(playArea);
  const matchedRows = Object.values(matches).map((i) => i.rowStartCell);
  const rowsBefore = [];
  for (let i = matchedRows[0]; i > 10; i -= 10) {
    rowsBefore.push(i);
  }
  const rowsWithoutMatches = rowsBefore.filter((i) => !matchedRows.includes(i));

  let stop = false;
  rowsBefore.forEach((i) => {
    if (stop) return;

    const rowForReplace = rowsWithoutMatches.splice(0, 1);
    let activeCells = 0;
    for (let j = 0; j < 10; j++) {
      if (clone[`${i + j}`].isActive) activeCells++;
      clone[`${i + j}`].isActive = clone[`${+rowForReplace + j}`].isActive;
      clone[`${i + j}`].match = clone[`${+rowForReplace + j}`].match;
    }

    if (!activeCells) stop = true;
  });

  return clone;
};

export const getScore = (prev, lines, level) => {
  const point = LINES_CONFIG[level].point[lines];
  return prev + point;
};

export const fillPlayAria = (playArea, startCell) => {
  const clone = _cloneDeep(playArea);
  for (let i = 0; i < 10; i++) {
    clone[`${startCell + i}`].isActive = true;
  }
  return clone;
};

export const clearPlayAria = (playArea, startCell) => {
  const clone = _cloneDeep(playArea);
  for (let i = 0; i < 10; i++) {
    clone[`${startCell + i}`].isActive = false;
  }
  return clone;
};

export const save = ({
  playArea,
  playAreaNoPiece,
  statArea,
  statAreaNoPiece,
  pieces,
  piecePosition,
  score,
  recordScore,
  lines,
  level,
}) => {
  const savedGame = {
    playArea: playArea,
    playAreaNoPiece: playAreaNoPiece,
    statArea: statArea,
    statAreaNoPiece: statAreaNoPiece,
    pieces: pieces,
    piecePosition: piecePosition,
    score: score,
    recordScore: recordScore,
    lines: lines,
    level: level,
  };
  localStorage.setItem("saved-game", JSON.stringify(savedGame));
};