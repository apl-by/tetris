import PIECES_CONFIG from "./piecesConfig";
import LINES_CONFIG from "./levelsConfig";
import { PIECES_TYPES, BASE_NUM } from "./config";
import _cloneDeep from "lodash/cloneDeep";

export const createPlayArea = () => {
  const initialState = {};
  for (let i = 10; i < 210; i++) {
    initialState[i] = { isActive: false, match: false, id: i };
  }
  return initialState;
};

export const createStatArea = () => {
  const statAria = {};
  const arrNum = [...BASE_NUM];
  for (let i = 0; i < 8; i++) {
    const num = arrNum.splice(0, 1);
    statAria[num] = { isActive: false, id: i };
  }
  return statAria;
};

const _mixArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const producePieces = () => {
  const array = new Array(2).fill(PIECES_TYPES).flat();
  return _mixArray(array);
};

export const checkMovePermit = (playArea, piece, position, direction) => {
  const { posType, x, y } = position;
  const sum = x + y;
  const cells = PIECES_CONFIG[piece][posType][direction];
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
    i < 10 ? false : playArea[i].isActive === true
  );
};

export const checkRotation = (playArea, piece, piecePos, prevPos) => {
  const { posType, x, y } = piecePos;
  const sum = x + y;
  const currCells = PIECES_CONFIG[piece][posType].cells;
  const currCellsToCheck = currCells.map((i) => i + sum);
  const prevCells = PIECES_CONFIG[piece][prevPos.posType].cells;
  const prevCellsUnless = prevCells.map((i) => i + sum);
  const cellsToCheck = currCellsToCheck.filter(
    (i) => !prevCellsUnless.includes(i)
  );

  if (currCellsToCheck.some((i) => i > 209)) return false;

  if (
    currCellsToCheck.some((i) =>
      i < 0 ? String(i).match(/-\d?1$/) : String(i).match(/9$/)
    ) &&
    currCellsToCheck.some((i) =>
      i < 0 ? String(i).match(/-\d?0$/) : String(i).match(/0$/)
    )
  )
    return false;

  return !cellsToCheck.some((i) =>
    i < 10 ? false : playArea[i].isActive === true
  );
};

export const getCells = (currentPiece, prevPos, nextPos) => {
  const prevBaseCells = PIECES_CONFIG[currentPiece][prevPos.posType].cells;
  const nextBaseCells = PIECES_CONFIG[currentPiece][nextPos.posType].cells;
  const prevCells = prevBaseCells
    .map((i) => i + prevPos.x + prevPos.y)
    .filter((i) => i >= 10 && i < 210);
  const nextCells = nextBaseCells
    .map((i) => i + nextPos.x + nextPos.y)
    .filter((i) => i >= 10 && i < 210);
  return { prevCells, nextCells };
};

export const setPositionOnTurn = (position) => {
  const newPos = { ...position };
  newPos.posType =
    position.posType === "base"
      ? "left"
      : position.posType === "left"
      ? "reverse"
      : position.posType === "reverse"
      ? "right"
      : "base";

  return newPos;
};

export const setPositionOnDrop = (playArea, currentPiece, position) => {
  const { posType, x, y } = position;
  const sum = x + y;
  const cells = PIECES_CONFIG[currentPiece][posType].checkBottom;
  let cellsToCheck = cells.map((i) => i + sum);

  let count = y;
  while (count < 190) {
    if (cellsToCheck.some((i) => i > 209 || playArea[i].isActive === true))
      break;

    count += 10;
    cellsToCheck = cellsToCheck.map((i) => i + 10);
  }
  return { ...position, y: count };
};

export const searchMatch = (playArea) => {
  const res = { cells: [], rows: {} };
  let matchCount = 0;

  for (let i = 200; i >= 10 && matchCount < 4; i -= 10) {
    let activeCells = 0;
    let nonActiveCells = 0;

    for (let j = 0; j < 10 && !(activeCells && nonActiveCells); j++) {
      playArea[`${i + j}`].isActive ? activeCells++ : nonActiveCells++;
    }

    if (activeCells === 10) {
      matchCount++;
      res.rows[`${matchCount}`] = {
        rowStartCell: i,
      };
      res.cells = [
        ...res.cells,
        ...Array.from({ length: 10 }, (el, ind) => i + ind),
      ];
    }
    if (!activeCells) break;
  }
  return { ...res, newLines: matchCount };
};

export const updPlayAreaWithMatches = (playArea, matches) => {
  const clone = _cloneDeep(playArea);
  const matchedRows = Object.values(matches).map((i) => i.rowStartCell);
  const rowsBefore = [];
  for (let i = matchedRows[0]; i >= 10; i -= 10) {
    rowsBefore.push(i);
  }
  const rowsWithoutMatches = rowsBefore.filter((i) => !matchedRows.includes(i));
  rowsBefore.forEach((i) => {
    const rowForReplace = rowsWithoutMatches.splice(0, 1);
    for (let j = 0; j < 10; j++) {
      if (rowForReplace.length === 0) {
        clone[`${i + j}`].isActive = false;
      } else {
        clone[`${i + j}`].isActive = clone[`${+rowForReplace + j}`].isActive;
      }
    }
  });

  return clone;
};

export const checkGameOver = (playArea) => {
  const cellsToCheck = [13, 14, 15, 16];
  return cellsToCheck.some((i) => playArea[i].isActive);
};

export const getScore = (prev, lines, level) => {
  const point = LINES_CONFIG[level].point[lines];
  return prev + point;
};
