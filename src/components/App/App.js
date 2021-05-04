import "./App.scss";
import "../generic/Block/Block";
import PlayArea from "../PlayArea/PlayArea";
import { useState, useEffect, useCallback } from "react";
import {
  handlePieces,
  updatePlayArea,
  checkMovement,
  getTurnPosition,
  checkRotation,
  handleDrop,
  searchMatch,
  displayMatches,
  deleteMatches,
} from "../../utils/utils";

function App() {
  const [playArea, setPlayArea] = useState({});
  const [playAreaNoPiece, setPlayAreaNoPiece] = useState({});
  const [pieces, setPieces] = useState({ all: [], current: "", next: "" });
  // console.log(playArea);
  const [piecePosition, setPiecePosition] = useState({
    position: "base",
    x: 0,
    y: 0,
  });
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const [pressedKey, setPressedKey] = useState("");

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
      initialState[`${i}`] = { isActive: false, match: false, id: i };
    }
    setPlayArea(initialState);
    setPlayAreaNoPiece(initialState);
  }, []);
  // -------------------------------------------------------------------
  useEffect(() => {
    if (isBlocked) return;
    document.addEventListener("keyup", handleKeyup);
    if (pressedKey) return;
    document.addEventListener("keydown", handleKeydown);
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

  // -------------Обработка результата раунда--------------------

  const handleRoundEnd = (playArea, pieces) => {
    setPlayAreaNoPiece(playArea);
    setPiecePosition({
      position: "base",
      x: 0,
      y: 0,
    });
    setPieces(handlePieces(pieces));
    setIsBlocked(false);
  };

  useEffect(() => {
    if (!isRoundFinished) return;
    const currentPlayArea = playArea;
    const matches = searchMatch(currentPlayArea);

    if (matches.match1) {
      setPlayArea(displayMatches(currentPlayArea, matches));
      const newPlayAria = deleteMatches(currentPlayArea, matches);
      setTimeout(() => {
        setPlayArea(newPlayAria);
        handleRoundEnd(newPlayAria, pieces);
      }, 600);
      setIsRoundFinished(false);
      return;
    }

    handleRoundEnd(currentPlayArea, pieces);
    setIsRoundFinished(false);
  }, [isRoundFinished, playArea, pieces]);

  // ------------Функции обработчики ---------------------------------

  const turnPiece = () => {
    if (isPause || isBlocked) return;
    const newPos = getTurnPosition(piecePosition);
    if (checkRotation(playAreaNoPiece, pieces.current, newPos)) {
      setPiecePosition(newPos);
    }
  };

  const moveLeft = useCallback(
    (key) => {
      if (isPause || isBlocked) return;
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
      setPressedKey(key);
    },
    [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces]
  );

  const moveRight = useCallback(
    (key) => {
      if (isPause || isBlocked) return;
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
      setPressedKey(key);
    },
    [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces]
  );

  const moveDown = useCallback(
    (key) => {
      if (isPause || isBlocked) return;
      if (
        checkMovement(
          playAreaNoPiece,
          pieces.current,
          piecePosition,
          "checkBottom"
        )
      ) {
        setPiecePosition({ ...piecePosition, y: piecePosition.y + 10 });
        setPressedKey(key);
        return;
      }
      setIsRoundFinished(true);
      setIsBlocked(true);
    },
    [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces]
  );

  const dropDown = () => {
    if (isPause || isBlocked) return;
    setPiecePosition(
      handleDrop(playAreaNoPiece, pieces.current, piecePosition)
    );
    setIsRoundFinished(true);
    setIsBlocked(true);
  };

  const startGame = () => {
    setPieces(handlePieces(pieces));
    setIsPause(false);
  };

  // Устранение стандартной задержки keydown

  useEffect(() => {
    if (!pressedKey) return;
    // По добавленному "+" определяется, что вызов обработчика не первый
    // (для первого вызова применяется больший интервал времени)
    const key = pressedKey.match(/\+$/) ? pressedKey : pressedKey + "+";
    const time = pressedKey.includes("+") ? 70 : 170;
    const func = pressedKey.includes("left")
      ? moveLeft
      : pressedKey.includes("right")
      ? moveRight
      : moveDown;
    const timeout = setTimeout(func, time, key);

    return () => clearTimeout(timeout);
  }, [pressedKey, moveLeft, moveRight, moveDown]);

  //  Обработчик нажатий клавиш
  const handleKeydown = (e) => {
    if (e.key === "p") {
      // console.log(6);
      setIsPause(!isPause);
      return;
    }

    if (e.key === "Enter") {
      // console.log(7);
      startGame();
      return;
    }

    if (isPause) return;

    if (e.key === "ArrowUp" || e.key === "w") {
      // console.log(1);
      turnPiece();
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      // console.log(2);
      moveLeft("left");
      return;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
      // console.log(3);
      moveRight("right");
      return;
    }

    if (e.key === "ArrowDown" || e.key === "s") {
      // console.log(4);
      moveDown("down");
      return;
    }

    if (e.key === "Control" || e.key === "x") {
      // console.log(5);
      dropDown();
      return;
    }
  };

  const handleKeyup = (e) => {
    setPressedKey("");
  };
  // ------------------------------------------------------------------

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
