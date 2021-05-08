import "./App.scss";
import "../BrickGame/Screen/Block/Block";
import { useState, useEffect, useCallback } from "react";
import {
  createPlayArea,
  createStatArea,
  handlePieces,
  displayNextPiece,
  updatePlayArea,
  checkMovement,
  getTurnPosition,
  checkRotation,
  handleDrop,
  searchMatch,
  displayMatches,
  deleteMatches,
} from "../../utils/utils";
import { CONTROL_KEYS } from "../../utils/config";
import Main from "../Main/Main";
import BrickGame from "../BrickGame/BrickGame";
import Footer from "../Footer/Footer";

function App() {
  const [playArea, setPlayArea] = useState({});
  const [playAreaNoPiece, setPlayAreaNoPiece] = useState({});
  const [statArea, setStatArea] = useState({});
  const [statAreaNoPiece, setStatAreaNoPiece] = useState({});
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

    const initialPlayArea = createPlayArea();
    const initialStatArea = createStatArea();

    setPlayArea(initialPlayArea);
    setPlayAreaNoPiece(initialPlayArea);
    setStatArea(initialStatArea);
    setStatAreaNoPiece(initialStatArea);
  }, []);
  // -------------------------------------------------------------------

  //  Установка слушателей событий
  useEffect(() => {
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
  const handleRoundEnd = useCallback(
    (playArea, pieces) => {
      setPressedKey("");
      setPlayAreaNoPiece(playArea);
      setPiecePosition({
        position: "base",
        x: 0,
        y: 0,
      });
      const newPieces = handlePieces(pieces);
      setStatArea(displayNextPiece(newPieces.next, statAreaNoPiece));
      setPieces(newPieces);
      setIsBlocked(false);
    },
    [statAreaNoPiece]
  );

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
  }, [isRoundFinished, playArea, pieces, handleRoundEnd]);
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
    const newPieces = handlePieces(pieces);
    setStatArea(displayNextPiece(newPieces.next, statAreaNoPiece));
    setPieces(newPieces);
    setIsPause(false);
  };
  // ------------------------------------------------------------------------

  // Устранение стандартной задержки автоповтора keydown
  useEffect(() => {
    if (!CONTROL_KEYS.includes(pressedKey) || isEffectBlocked) return;
    setIsEffectBlocked(true);

    if (еffectСount >= 1) {
      pressedKey === "left"
        ? moveLeft()
        : pressedKey === "right"
        ? moveRight()
        : pressedKey === "down"
        ? moveDown()
        : turnPiece();
    }

    const time =
      еffectСount < 1 && pressedKey !== "turn"
        ? 140
        : pressedKey === "turn"
        ? 180
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
    if (isTimeEnded || isPause) return;
    setTimeout(() => setIsTimeEnded(true), 800);
  }, [isTimeEnded, isPause]);

  useEffect(() => {
    if (!isTimeEnded || pressedKey === "down") return;
    moveDown();
    setIsTimeEnded(false);
  }, [isTimeEnded, moveDown, pressedKey]);
  // -------------------------------------------------------------------------

  //  Обработчики нажатий клавиш клавиатуры
  const handleKeydown = (e) => {
    if (!isPause) e.preventDefault();
    if (isBlocked) return;

    if (e.key === "p" && !pressedKey) {
      pieces.current ? setIsPause(!isPause) : startGame();
      setPressedKey("pause");
      return;
    }

    if (isPause || pressedKey) return;

    if (e.key === "ArrowUp" || e.key === "w") {
      turnPiece();
      setPressedKey("turn");
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      moveLeft();
      setPressedKey("left");
      return;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
      moveRight();
      setPressedKey("right");
      return;
    }

    if (e.key === "ArrowDown" || e.key === "s") {
      moveDown();
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
      <Main>
        <BrickGame field={playArea || {}} statFild={statArea || {}} />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
