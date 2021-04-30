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
  handleDrop,
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
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [pause, setPause] = useState(false);

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

  // ------------Функции обработчики ---------------------------------

  const turnPiece = () => {
    const newPos = getTurnPosition(piecePosition);
    if (checkRotation(playAreaNoPiece, pieces.current, newPos)) {
      setPiecePosition(newPos);
    }
  };

  const moveLeft = () => {
    if (
      checkMovement(playAreaNoPiece, pieces.current, piecePosition, "checkLeft")
    ) {
      setPiecePosition({ ...piecePosition, x: piecePosition.x - 1 });
    }
  };

  const moveRight = () => {
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
  };

  const moveDown = () => {
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
  };

  const dropDown = () => {
    setPiecePosition(
      handleDrop(playAreaNoPiece, pieces.current, piecePosition)
    );
  };

  //  Обработчик нажатий клавиш
  const handleKeydown = (e) => {
    if (e.key === "ArrowUp" || e.key === "w") {
      // console.log(1);
      turnPiece();
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      // console.log(2);
      moveLeft();
      return;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
      // console.log(3);
      moveRight();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "s") {
      // console.log(4);
      moveDown();
      return;
    }

    if (e.key === "Control") {
      // console.log(5);
      dropDown();
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
