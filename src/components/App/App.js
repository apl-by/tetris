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
  const [isTimeEnded, setIsTimeEnded] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPause, setIsPause] = useState(true);
  const [pressedKey, setPressedKey] = useState("");
  const [isEffectBlocked, setIsEffectBlocked] = useState(false);
  const [еffectСount, setEffectCount] = useState(0);
  console.log(pressedKey);

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

  //  Установка слушателей событий
  useEffect(() => {
    if (isBlocked) return;
    document.addEventListener("keyup", handleKeyup);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  });
  // ----------------------------------------------------------------------

  // Обновление игрового поля
  useEffect(() => {
    if (!pieces.current) return;
    setPlayArea(updatePlayArea(playAreaNoPiece, pieces.current, piecePosition));
  }, [playAreaNoPiece, pieces, piecePosition]);
  // ------------------------------------------------------------------------

  // Обработка результата раунда
  const handleRoundEnd = (playArea, pieces) => {
    setPressedKey("");
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
  // --------------------------------------------------------------------

  // Функции обработчики
  const turnPiece = useCallback(() => {
    if (isPause || isBlocked) return;
    const newPos = getTurnPosition(piecePosition);
    if (checkRotation(playAreaNoPiece, pieces.current, newPos)) {
      setPiecePosition(newPos);
    }
  }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces]);

  const moveLeft = useCallback(() => {
    if (isPause || isBlocked) return;
    if (
      checkMovement(playAreaNoPiece, pieces.current, piecePosition, "checkLeft")
    ) {
      setPiecePosition({ ...piecePosition, x: piecePosition.x - 1 });
    }
  }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces]);

  const moveRight = useCallback(() => {
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
  }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces]);

  const moveDown = useCallback(() => {
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
      return;
    }
    setIsRoundFinished(true);
    setIsBlocked(true);
  }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces]);

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
  // ------------------------------------------------------------------------

  // Устранение стандартной задержки автоповтора keydown
  useEffect(() => {
    if (!pressedKey || isEffectBlocked) return;
    setIsEffectBlocked(true);
    pressedKey === "left"
      ? moveLeft()
      : pressedKey === "right"
      ? moveRight()
      : pressedKey === "down"
      ? moveDown()
      : turnPiece();

    const time =
      еffectСount < 1 && pressedKey !== "turn"
        ? 140
        : pressedKey === "turn"
        ? 250
        : 60;
    setTimeout(() => setIsEffectBlocked(false), time);

    if (еffectСount < 1) setEffectCount(еffectСount + 1);
  }, [
    pressedKey,
    moveLeft,
    moveRight,
    moveDown,
    isEffectBlocked,
    еffectСount,
    turnPiece,
  ]);
  // -------------------------------------------------------------------------

  // Установка таймера на движение фигур вниз, и её перемещение вниз
  useEffect(() => {
    if (isTimerRunning || isPause) return;
    setIsTimerRunning(true);
    setTimeout(() => setIsTimeEnded(true), 800);
  }, [isTimerRunning, isPause]);

  useEffect(() => {
    if (!isTimeEnded || pressedKey.includes("down")) return;
    moveDown();
    setIsTimeEnded(false);
    setIsTimerRunning(false);
  }, [isTimeEnded, moveDown, pressedKey]);
  // -------------------------------------------------------------------------

  //  Обработчики нажатий клавиш клавиатуры
  const handleKeydown = (e) => {
    if (e.key === "Shift") {
      setIsPause(!isPause);
      return;
    }

    if (e.key === "Enter") {
      startGame();
      return;
    }

    if (isPause || pressedKey) return;

    if (e.key === "ArrowUp" || e.key === "w") {
      setPressedKey("turn");
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      setPressedKey("left");
      return;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
      setPressedKey("right");
      return;
    }

    if (e.key === "ArrowDown" || e.key === "s") {
      setPressedKey("down");
      return;
    }

    if (e.key === "Control" || e.key === "x") {
      dropDown();
      return;
    }
  };

  const handleKeyup = (e) => {
    setPressedKey("");
    setEffectCount(0);
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
