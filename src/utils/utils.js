import PIECES_CONFIG from "./piecesConfig";
import { PIECES_TYPES } from "./config";
import cloneDeep from "lodash/cloneDeep";

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
    const array = new Array(3).fill(PIECES_TYPES).flat();
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

export const updatePlayArea = (playAriaNoPiece, piece, piecePos) => {
  const newPlayAria = cloneDeep(playAriaNoPiece);
  const { position, x, y } = piecePos;
  const sum = x + y;
  const pieceCells = PIECES_CONFIG[`${piece}`][`${position}`].cells;
  const newPos = pieceCells.map((i) => i + sum);

  newPos.forEach((i) => {
    if (i < 10) return;
    newPlayAria[`${i}`].isActive = true;
  });
  return newPlayAria;
};
