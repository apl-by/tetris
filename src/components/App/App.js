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
  getScore,
  fillPlayAria,
  clearPlayAria,
  save,
} from "../../utils/utils";
import { CONTROL_KEYS } from "../../utils/config";
import LEVEL_CONFIG from "../../utils/levelsConfig";
import Main from "../Main/Main";
import BrickGame from "../BrickGame/BrickGame";
import Footer from "../Footer/Footer";

function App() {
  const [playArea, setPlayArea] = useState({});
  const [playAreaNoPiece, setPlayAreaNoPiece] = useState({});
  const [statArea, setStatArea] = useState({});
  const [statAreaNoPiece, setStatAreaNoPiece] = useState({});
  const [pieces, setPieces] = useState({ all: [], current: "", next: "" });
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
  const [score, setScore] = useState(0);
  const [recordScore, setRecordScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(LEVEL_CONFIG["1"]);
  const [wasUserMoveDown, setWasUserMoveDown] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [count, setCount] = useState(0);
  const [gameOverTimer, setGameOverTimer] = useState(false);
  const [isRestart, setIsResrart] = useState(false);
  console.log(111);

  // Объект для сохранения в LocalStorage
  const saveData = useCallback(() => {
    save({
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
    });
  }, [
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
  ]);
  // ---------------------------------------------------------------

  // Создание стартового объекта состояния игровой области
  useEffect(() => {
    if (localStorage.getItem("saved-game")) {
      const savedGame = JSON.parse(localStorage.getItem("saved-game"));
      console.log(savedGame);
      setPlayArea(savedGame.playArea);
      setPlayAreaNoPiece(savedGame.playAreaNoPiece);
      setStatArea(savedGame.statArea);
      setStatAreaNoPiece(savedGame.statAreaNoPiece);
      setPieces(savedGame.pieces);
      setPiecePosition(savedGame.piecePosition);
      setScore(savedGame.score);
      setRecordScore(savedGame.recordScore);
      setLines(savedGame.lines);
      setLevel(savedGame.level);
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
    if (!pieces.current || isRestart) return;
    setPlayArea(updatePlayArea(playAreaNoPiece, pieces.current, piecePosition));
  }, [playAreaNoPiece, pieces, piecePosition, isRestart]);
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
      saveData();
    },
    [statAreaNoPiece, saveData]
  );

  useEffect(() => {
    if (!isRoundFinished) return;
    if (piecePosition.y === 0) {
      setIsGameOver(true);
      return;
    }
    const currentPlayArea = playArea;
    const matches = searchMatch(currentPlayArea);
    const matchedLines = Object.keys(matches).length;
    if (matchedLines) {
      setPlayArea(displayMatches(currentPlayArea, matches));
      const newPlayAria = deleteMatches(currentPlayArea, matches);
      const sumLines = lines + matchedLines;
      setTimeout(() => {
        setPlayArea(newPlayAria);
        setScore(getScore(score, matchedLines, level.lev));
        setLines(sumLines);
        if (String(sumLines).startsWith(String(level.lev)) && sumLines !== 1) {
          setLevel(LEVEL_CONFIG[level.lev + 1]);
        }
        handleRoundEnd(newPlayAria, pieces);
      }, 600);

      setIsRoundFinished(false);
      return;
    }

    handleRoundEnd(currentPlayArea, pieces);
    setIsRoundFinished(false);
  }, [
    isRoundFinished,
    playArea,
    pieces,
    handleRoundEnd,
    level,
    score,
    lines,
    piecePosition,
  ]);
  // --------------------------------------------------------------------

  //  Обработка GameOver
  useEffect(() => {
    if (!isGameOver || gameOverTimer || isRestart) return;

    if (count >= 40) {
      setPieces({ all: [], current: "", next: "" });
      setStatArea(statAreaNoPiece);
      setIsBlocked(false);
      setIsPause(true);
      if (score > recordScore) setRecordScore(score);
      return;
    }
    setGameOverTimer(true);
    const rowStartCell = count < 20 ? 200 - count * 10 : 10 + (count - 20) * 10;

    count < 20
      ? setPlayArea(fillPlayAria(playArea, rowStartCell))
      : setPlayArea(clearPlayAria(playArea, rowStartCell));

    setCount(count + 1);
    setTimeout(() => setGameOverTimer(false), 40);
  }, [
    isGameOver,
    count,
    gameOverTimer,
    playArea,
    statAreaNoPiece,
    isRestart,
    recordScore,
    score,
  ]);
  // --------------------------------------------------------------------

  // Функции обработчики
  const turnPiece = useCallback(() => {
    if (isPause || isBlocked || isGameOver) return;
    const newPos = getTurnPosition(piecePosition);
    if (checkRotation(playAreaNoPiece, pieces.current, newPos)) {
      setPiecePosition(newPos);
    }
  }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces, isGameOver]);

  const moveLeft = useCallback(() => {
    if (isPause || isBlocked || isGameOver) return;
    if (
      checkMovement(playAreaNoPiece, pieces.current, piecePosition, "checkLeft")
    ) {
      setPiecePosition({ ...piecePosition, x: piecePosition.x - 1 });
    }
  }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces, isGameOver]);

  const moveRight = useCallback(() => {
    if (isPause || isBlocked || isGameOver) return;
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
  }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces, isGameOver]);

  const moveDown = useCallback(
    (key) => {
      if (isPause || isBlocked || isGameOver) return;
      if (key === "down") {
        setWasUserMoveDown(true);
      }
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
    },
    [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces, isGameOver]
  );

  const dropDown = () => {
    if (isPause || isBlocked || isGameOver) return;
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
    setIsResrart(false);
  };
  // ------------------------------------------------------------------------

  // Устранение стандартной задержки автоповтора keydown
  useEffect(() => {
    if (!Object.keys(CONTROL_KEYS).includes(pressedKey) || isEffectBlocked)
      return;
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
    if (isTimerRunning || isPause || isBlocked || isGameOver) return;
    setIsTimerRunning(true);
    setWasUserMoveDown(false);
    setTimeout(() => setIsTimeEnded(true), level.speed);
  }, [isTimerRunning, isPause, level, isBlocked, isGameOver]);

  useEffect(() => {
    if (!isTimeEnded || pressedKey === "down") return;
    if (wasUserMoveDown) {
      setIsTimeEnded(false);
      setIsTimerRunning(false);
      return;
    }
    moveDown();
    setIsTimeEnded(false);
    setIsTimerRunning(false);
  }, [isTimeEnded, moveDown, pressedKey, wasUserMoveDown]);
  // -------------------------------------------------------------------------

  // Сброс игры
  const restartGame = () => {
    const initialPlayArea = createPlayArea();
    setIsResrart(true);
    setIsRoundFinished(false);
    setPlayArea(initialPlayArea);
    setPlayAreaNoPiece(initialPlayArea);
    setStatArea(statAreaNoPiece);
    setPieces({ all: [], current: "", next: "" });
    setPiecePosition({
      position: "base",
      x: 0,
      y: 0,
    });
    setScore(0);
    setLines(0);
    setLevel(LEVEL_CONFIG["1"]);
    setCount(0);
    setIsGameOver(false);
    save({
      playArea: initialPlayArea,
      playAreaNoPiece: initialPlayArea,
      statArea: statAreaNoPiece,
      statAreaNoPiece,
      pieces: { all: [], current: "", next: "" },
      piecePosition: {
        position: "base",
        x: 0,
        y: 0,
      },
      score: 0,
      recordScore,
      lines: 0,
      level: LEVEL_CONFIG["1"],
    });
    startGame();
  };

  // ---------------------------------------------------------------------------

  //  Обработчики нажатий клавиш клавиатуры
  const handleKeydown = (e) => {
    if (!isPause) e.preventDefault();
    if (isBlocked) return;

    if ((e.key === "p" || e.key === "P") && !pressedKey) {
      if (isGameOver) return restartGame();
      pieces.current ? setIsPause(!isPause) : startGame();
      setPressedKey("pause");
      return;
    }

    if ((e.key === "r" || e.key === "R") && !pressedKey) {
      setPressedKey("restart");
      restartGame();
      return;
    }

    if (isGameOver || isPause || CONTROL_KEYS[pressedKey]?.includes(e.key))
      return;

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
      moveDown("down");
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
        <BrickGame
          field={playArea || {}}
          statFild={statArea || {}}
          score={score}
          lines={lines}
          level={level.lev}
          isPause={isPause}
          isStarted={pieces.current}
          isEnd={isGameOver}
          record={recordScore}
        />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
