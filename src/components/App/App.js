import "./App.scss";
import "../generic/Block/Block";
import PlayArea from "../PlayArea/PlayArea";
import { useState, useEffect } from "react";
import {
  handlePieces,
  updatePlayArea,
  checkMovement,
  getTurnPosition,
  checkRotation,
} from "../../utils/utils";

function App() {
  const [playArea, setPlayArea] = useState({});
  const [playAreaNoPiece, setPlayAreaNoPiece] = useState({});
  const [pieces, setPieces] = useState({ all: [], current: "", next: "" });
  console.log(pieces);
  // const [isFigureInPlay, setIsFigureInPlay] = useState(false);
  const [piecePosition, setPiecePosition] = useState({
    position: "base",
    x: 0,
    y: 0,
  });

  // Создание стартового объекта состояния игровой области
  useEffect(() => {
    if (localStorage.getItem("saved-game")) {
      // не проверено - доработать
      const savedGame = JSON.parse(localStorage.getItem("saved-game"));
      setPlayArea(savedGame.playArea);
      setPlayAreaNoPiece(savedGame.playAreaNoPiece);
      return;
    }

    const initialState = {};
    for (let i = 10; i < 210; i++) {
      initialState[`${i}`] = { isActive: false, id: i };
    }
    setPlayArea(initialState);
    setPlayAreaNoPiece(initialState);
  }, []);
  // -------------------------------------------------------------------
  useEffect(() => {
    if (!pieces.current) return;
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  });

  // ------------------Обновление игрового поля-----------------------
  useEffect(() => {
    if (!pieces.current) return;

    setPlayArea(updatePlayArea(playAreaNoPiece, pieces.current, piecePosition));
  }, [playAreaNoPiece, pieces, piecePosition]);

  //  Обработчики нажатий клавиш
  const handleKeydown = (e) => {
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
      console.log(1);
      const newPos = getTurnPosition(piecePosition);
      if (checkRotation(playAreaNoPiece, pieces.current, newPos)) {
        setPiecePosition(newPos);
      }
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      console.log(2);
      if (
        checkMovement(
          playAreaNoPiece,
          pieces.current,
          piecePosition,
          "checkLeft"
        )
      ) {
        setPiecePosition({ ...piecePosition, x: piecePosition.x - 1 });
      }
      return;
    }

    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      console.log(3);
      if (
        checkMovement(
          playAreaNoPiece,
          pieces.current,
          piecePosition,
          "checkRight"
        )
      ) {
        setPiecePosition({ ...piecePosition, x: piecePosition.x + 1 });
      }
      return;
    }

    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
      console.log(4);
      if (
        checkMovement(
          playAreaNoPiece,
          pieces.current,
          piecePosition,
          "checkBottom"
        )
      ) {
        setPiecePosition({ ...piecePosition, y: piecePosition.y + 10 });
      }
      return;
    }
  };

  const handleKeyup = (e) => {};
  // ------------------------------------------------------------------

  const startGame = () => {
    setPieces(handlePieces(pieces));
  };

  return (
    <div className="app">
      <button style={{ marginRight: 30 }} onClick={startGame}>
        Start
      </button>
      <PlayArea field={playArea || {}}></PlayArea>
    </div>
  );
}

export default App;
