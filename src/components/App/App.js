import "./App.scss";
import "../BrickGame/Screen/Block/Block";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import { useMediaQuery } from "react-responsive";
import {
  createPlayArea,
  createStatArea,
  handlePieces,
  displayNextPiece,
  updatePlayArea as updatePlayArea2,
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
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { batch } from "react-redux";
import { gameControlSelectors } from "../../services/selectors";
import { mainSelectors } from "../../services/selectors";
import {
  start,
  togglePause,
  setKeyDown,
  clearKeyDown,
} from "../../services/slices/gameControlSlice";
import { setPieces, movePiece } from "../../services/slices/mainSlice";
import {
  checkMovePermit,
  getCells,
  setPositionOnTurn,
  setPositionOnDrop,
} from "../../utils/utils";

function App() {
  const dispatch = useDispatch();
  const isPause = useSelector(gameControlSelectors.isPause);
  const isGameOn = useSelector(gameControlSelectors.isGameOn);
  const pressedKey = useSelector(gameControlSelectors.pressedKey);
  const playArea = useSelector(mainSelectors.playArea);
  const position = useSelector(mainSelectors.position);
  const currentPiece = useSelector(mainSelectors.current);

  console.log(777);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyup);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  });

  const handleDrop = () => {
    dispatch(setKeyDown("drop"));
    const newPos = setPositionOnDrop(playArea, currentPiece, position);
    const { prevCells, nextCells } = getCells(currentPiece, position, newPos);
    dispatch(movePiece({ prevCells, nextCells, newPos }));
    // setIsBlocked(true);
  };

  const handleTurnPiece = () => {
    dispatch(setKeyDown("turn"));
    const newPos = setPositionOnTurn(position);
    if (checkMovePermit(playArea, currentPiece, newPos, "turn")) {
      const { prevCells, nextCells } = getCells(currentPiece, position, newPos);
      dispatch(movePiece({ prevCells, nextCells, newPos }));
    }
    // setIsBlocked(true);
  };

  const handleMoveLeft = () => {
    dispatch(setKeyDown("left"));
    if (checkMovePermit(playArea, currentPiece, position, "checkLeft")) {
      const newPos = { ...position, x: position.x - 1 };
      const { prevCells, nextCells } = getCells(currentPiece, position, newPos);
      dispatch(movePiece({ prevCells, nextCells, newPos }));
    }
    // setIsBlocked(true);
  };

  const handleMoveRight = () => {
    dispatch(setKeyDown("right"));
    if (checkMovePermit(playArea, currentPiece, position, "checkRight")) {
      const newPos = { ...position, x: position.x + 1 };
      const { prevCells, nextCells } = getCells(currentPiece, position, newPos);
      dispatch(movePiece({ prevCells, nextCells, newPos }));
    }
    // setIsBlocked(true);
  };

  const handleMoveDown = () => {
    dispatch(setKeyDown("down"));
    if (checkMovePermit(playArea, currentPiece, position, "checkBottom")) {
      const newPos = { ...position, y: position.y + 10 };
      const { prevCells, nextCells } = getCells(currentPiece, position, newPos);
      dispatch(movePiece({ prevCells, nextCells, newPos }));
    }
    // setIsRoundFinished(true);
    // setIsBlocked(true);
  };

  const startGame = () => {
    batch(() => {
      dispatch(start());
      dispatch(setPieces());
    });
  };

  const handlePause = () => {
    dispatch(setKeyDown("pause"));
    // if (isGameOver) return restartGame();
    isGameOn ? dispatch(togglePause()) : startGame();
  };

  //  Обработчики нажатий клавиш клавиатуры
  const handleKeydown = (e) => {
    if (!isPause) e.preventDefault();
    // if (isBlocked) return;
    if (pressedKey) return;

    if (e.key === "p" || e.key === "P") {
      return handlePause();
    }

    // if ((e.key === "r" || e.key === "R") && !pressedKey) {
    //   setPressedKey("restart");
    //   restartGame();
    //   return;
    // }

    // if (isGameOver || isPause || CONTROL_KEYS[pressedKey]?.includes(e.key))
    //   return;

    if (e.key === "ArrowUp" || e.key === "w") {
      return handleTurnPiece();
    }

    if (e.key === "ArrowLeft" || e.key === "a") {
      return handleMoveLeft();
    }

    if (e.key === "ArrowRight" || e.key === "d") {
      return handleMoveRight();
    }

    if (e.key === "ArrowDown" || e.key === "s") {
      return handleMoveDown();
    }

    if (e.key === "Control" || e.key === "x") {
      return handleDrop();
    }
  };

  const handleKeyup = (e) => {
    dispatch(clearKeyDown());
  };

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // const [playArea, setPlayArea2] = useState({});
  // const [playAreaNoPiece, setPlayAreaNoPiece] = useState({});
  // const [statArea, setStatArea2] = useState({});
  // const [statAreaNoPiece, setStatAreaNoPiece] = useState({});
  // const [pieces, setPieces2] = useState({ all: [], current: "", next: "" });
  // const [piecePosition, setPiecePosition] = useState({
  //   position: "base",
  //   x: 0,
  //   y: 0,
  // });
  // const [isBlocked, setIsBlocked] = useState(false);
  // const [isRoundFinished, setIsRoundFinished] = useState(false);
  // const [isTimeEnded, setIsTimeEnded] = useState(false);
  // const [isTimerRunning, setIsTimerRunning] = useState(false);
  // const [pressedKey, setPressedKey] = useState("");
  // const [isEffectBlocked, setIsEffectBlocked] = useState(false);
  // const [еffectСount, setEffectCount] = useState(0);
  // const [score, setScore] = useState(0);
  // const [recordScore, setRecordScore] = useState(0);
  // const [lines, setLines] = useState(0);
  // const [level, setLevel] = useState(LEVEL_CONFIG["1"]);
  // const [wasUserMoveDown, setWasUserMoveDown] = useState(false);
  // const [isGameOver, setIsGameOver] = useState(false);
  // const [count, setCount] = useState(0);
  // const [gameOverTimer, setGameOverTimer] = useState(false);
  // const [isRestart, setIsResrart] = useState(false);

  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // // Сохранить объект в LocalStorage
  // const saveData = useCallback(() => {
  //   save({
  //     playArea,
  //     playAreaNoPiece,
  //     statArea,
  //     statAreaNoPiece,
  //     pieces,
  //     piecePosition,
  //     score,
  //     recordScore,
  //     lines,
  //     level,
  //   });
  // }, [
  //   playArea,
  //   playAreaNoPiece,
  //   statArea,
  //   statAreaNoPiece,
  //   pieces,
  //   piecePosition,
  //   score,
  //   recordScore,
  //   lines,
  //   level,
  // ]);
  // // ---------------------------------------------------------------

  // // Создание стартового объекта состояния игровой области
  // useLayoutEffect(() => {
  //   // if (localStorage.getItem("saved-game")) {
  //   //   const savedGame = JSON.parse(localStorage.getItem("saved-game"));
  //   //   setPlayArea(savedGame.playArea);
  //   //   setPlayAreaNoPiece(savedGame.playAreaNoPiece);
  //   //   setStatArea(savedGame.statArea);
  //   //   setStatAreaNoPiece(savedGame.statAreaNoPiece);
  //   //   setPieces(savedGame.pieces);
  //   //   setPiecePosition(savedGame.piecePosition);
  //   //   setScore(savedGame.score);
  //   //   setRecordScore(savedGame.recordScore);
  //   //   setLines(savedGame.lines);
  //   //   setLevel(savedGame.level);
  //   //   return;
  //   // }

  //   const initialPlayArea = createPlayArea();
  //   const initialStatArea = createStatArea();
  //   setPlayArea2(initialPlayArea);
  //   setPlayAreaNoPiece(initialPlayArea);
  //   setStatArea2(initialStatArea);
  //   setStatAreaNoPiece(initialStatArea);
  // }, []);
  // // -------------------------------------------------------------------

  // //  Установка слушателей событий
  // // useEffect(() => {
  // //   document.addEventListener("keyup", handleKeyup);
  // //   document.addEventListener("keydown", handleKeydown);
  // //   return () => {
  // //     document.removeEventListener("keydown", handleKeydown);
  // //     document.removeEventListener("keyup", handleKeyup);
  // //   };
  // // });
  // // ----------------------------------------------------------------------

  // // Обновление игрового поля
  // useEffect(() => {
  //   if (!pieces.current || isRestart) return;
  //   setPlayArea2(
  //     updatePlayArea2(playAreaNoPiece, pieces.current, piecePosition)
  //   );
  // }, [playAreaNoPiece, pieces, piecePosition, isRestart]);
  // // ------------------------------------------------------------------------

  // // Обработка результата раунда
  // const handleRoundEnd = useCallback(
  //   (playArea, pieces) => {
  //     setPressedKey("");
  //     setPlayAreaNoPiece(playArea);
  //     setPiecePosition({
  //       position: "base",
  //       x: 0,
  //       y: 0,
  //     });
  //     const newPieces = handlePieces(pieces);
  //     setStatArea2(displayNextPiece(newPieces.next, statAreaNoPiece));
  //     setPieces2(newPieces);
  //     setIsBlocked(false);
  //     saveData();
  //   },
  //   [statAreaNoPiece, saveData]
  // );

  // useEffect(() => {
  //   if (!isRoundFinished) return;
  //   if (piecePosition.y === 0) {
  //     setIsGameOver(true);
  //     return;
  //   }
  //   const currentPlayArea = playArea;
  //   const matches = searchMatch(currentPlayArea);
  //   const matchedLines = Object.keys(matches).length;
  //   if (matchedLines) {
  //     setPlayArea2(displayMatches(currentPlayArea, matches));
  //     const newPlayAria = deleteMatches(currentPlayArea, matches);
  //     const sumLines = lines + matchedLines;
  //     setTimeout(() => {
  //       setPlayArea2(newPlayAria);
  //       setScore(getScore(score, matchedLines, level.lev));
  //       setLines(sumLines);
  //       if (String(sumLines).startsWith(String(level.lev)) && sumLines !== 1) {
  //         setLevel(LEVEL_CONFIG[level.lev + 1]);
  //       }
  //       handleRoundEnd(newPlayAria, pieces);
  //     }, 600);

  //     setIsRoundFinished(false);
  //     return;
  //   }

  //   handleRoundEnd(currentPlayArea, pieces);
  //   setIsRoundFinished(false);
  // }, [
  //   isRoundFinished,
  //   playArea,
  //   pieces,
  //   handleRoundEnd,
  //   level,
  //   score,
  //   lines,
  //   piecePosition,
  // ]);
  // // --------------------------------------------------------------------

  // //  Обработка GameOver
  // useEffect(() => {
  //   if (!isGameOver || gameOverTimer || isRestart) return;

  //   if (count >= 40) {
  //     setPieces2({ all: [], current: "", next: "" });
  //     setStatArea2(statAreaNoPiece);
  //     setIsBlocked(false);
  //     // setIsPause2(true);
  //     save({
  //       playArea,
  //       playAreaNoPiece: playArea,
  //       statArea: statAreaNoPiece,
  //       statAreaNoPiece,
  //       pieces: { all: [], current: "", next: "" },
  //       piecePosition: {
  //         position: "base",
  //         x: 0,
  //         y: 0,
  //       },
  //       score: 0,
  //       recordScore,
  //       lines: 0,
  //       level: LEVEL_CONFIG["1"],
  //     });
  //     if (score > recordScore) setRecordScore(score);
  //     return;
  //   }
  //   setGameOverTimer(true);
  //   const rowStartCell = count < 20 ? 200 - count * 10 : 10 + (count - 20) * 10;

  //   count < 20
  //     ? setPlayArea2(fillPlayAria(playArea, rowStartCell))
  //     : setPlayArea2(clearPlayAria(playArea, rowStartCell));

  //   setCount(count + 1);
  //   setTimeout(() => setGameOverTimer(false), 40);
  // }, [
  //   isGameOver,
  //   count,
  //   gameOverTimer,
  //   playArea,
  //   statAreaNoPiece,
  //   isRestart,
  //   recordScore,
  //   score,
  // ]);
  // // --------------------------------------------------------------------

  // // Функции обработчики
  // const turnPiece = useCallback(() => {
  //   if (isPause || isBlocked || isGameOver) return;
  //   const newPos = getTurnPosition(piecePosition);
  //   if (checkRotation(playAreaNoPiece, pieces.current, newPos)) {
  //     setPiecePosition(newPos);
  //   }
  // }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces, isGameOver]);

  // const moveLeft = useCallback(() => {
  //   if (isPause || isBlocked || isGameOver) return;
  //   if (
  //     checkMovement(playAreaNoPiece, pieces.current, piecePosition, "checkLeft")
  //   ) {
  //     setPiecePosition({ ...piecePosition, x: piecePosition.x - 1 });
  //   }
  // }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces, isGameOver]);

  // const moveRight = useCallback(() => {
  //   if (isPause || isBlocked || isGameOver) return;
  //   if (
  //     checkMovement(
  //       playAreaNoPiece,
  //       pieces.current,
  //       piecePosition,
  //       "checkRight"
  //     )
  //   ) {
  //     setPiecePosition({ ...piecePosition, x: piecePosition.x + 1 });
  //   }
  // }, [isPause, isBlocked, piecePosition, playAreaNoPiece, pieces, isGameOver]);

  // const moveDown = useCallback(
  //   (key) => {
  //     if (isPause || isBlocked || isGameOver || isRoundFinished) return;
  //     if (key === "down") {
  //       setWasUserMoveDown(true);
  //     }
  //     if (
  //       checkMovement(
  //         playAreaNoPiece,
  //         pieces.current,
  //         piecePosition,
  //         "checkBottom"
  //       )
  //     ) {
  //       setPiecePosition({ ...piecePosition, y: piecePosition.y + 10 });
  //       return;
  //     }
  //     setIsRoundFinished(true);
  //     setIsBlocked(true);
  //   },
  //   [
  //     isPause,
  //     isBlocked,
  //     piecePosition,
  //     playAreaNoPiece,
  //     pieces,
  //     isGameOver,
  //     isRoundFinished,
  //   ]
  // );

  // const dropDown = () => {
  //   if (isPause || isBlocked || isGameOver || isRoundFinished) return;
  //   const drop = handleDrop(playAreaNoPiece, pieces.current, piecePosition);
  //   setPiecePosition(drop);
  //   setTimeout(() => {
  //     setIsRoundFinished(true);
  //     setIsBlocked(true);
  //   }, 0);
  // };

  // // const startGame = () => {
  // //   const newPieces = handlePieces(pieces);
  // //   setStatArea2(displayNextPiece(newPieces.next, statAreaNoPiece));
  // //   setPieces2(newPieces);
  // //   setIsPause(false);
  // //   setIsResrart(false);
  // // };

  // // const handlePause = () => {
  // //   if (isGameOver) return restartGame();

  // //   pieces.current ? setIsPause(!isPause) : startGame();
  // //   setPressedKey("pause");
  // // };
  // // ------------------------------------------------------------------------

  // // Устранение стандартной задержки автоповтора keydown
  // useEffect(() => {
  //   if (!Object.keys(CONTROL_KEYS).includes(pressedKey) || isEffectBlocked)
  //     return;
  //   setIsEffectBlocked(true);

  //   if (еffectСount >= 1) {
  //     pressedKey === "left"
  //       ? moveLeft()
  //       : pressedKey === "right"
  //       ? moveRight()
  //       : pressedKey === "down"
  //       ? moveDown()
  //       : turnPiece();
  //   }

  //   const time = еffectСount < 1 ? 170 : pressedKey === "turn" ? 170 : 50;
  //   setTimeout(() => setIsEffectBlocked(false), time);

  //   if (еffectСount < 1) setEffectCount(еffectСount + 1);
  // }, [
  //   pressedKey,
  //   moveLeft,
  //   moveRight,
  //   moveDown,
  //   isEffectBlocked,
  //   еffectСount,
  //   turnPiece,
  // ]);
  // // -------------------------------------------------------------------------

  // // Установка таймера на движение фигур вниз, и её перемещение вниз
  // useEffect(() => {
  //   if (isTimerRunning || isPause || isBlocked || isGameOver) return;
  //   setIsTimerRunning(true);
  //   setWasUserMoveDown(false);
  //   setTimeout(() => setIsTimeEnded(true), level.speed);
  // }, [isTimerRunning, isPause, level, isBlocked, isGameOver]);

  // useEffect(() => {
  //   if (!isTimeEnded || pressedKey === "down") return;
  //   if (wasUserMoveDown || isRoundFinished) {
  //     setIsTimeEnded(false);
  //     setIsTimerRunning(false);
  //     return;
  //   }
  //   moveDown();
  //   setIsTimeEnded(false);
  //   setIsTimerRunning(false);
  // }, [isTimeEnded, moveDown, pressedKey, wasUserMoveDown, isRoundFinished]);
  // // -------------------------------------------------------------------------

  // // Сброс игры
  // const restartGame = () => {
  //   const initialPlayArea = createPlayArea();
  //   setIsResrart(true);
  //   setIsRoundFinished(false);
  //   setPlayArea2(initialPlayArea);
  //   setPlayAreaNoPiece(initialPlayArea);
  //   setStatArea2(statAreaNoPiece);
  //   setPieces2({ all: [], current: "", next: "" });
  //   setPiecePosition({
  //     position: "base",
  //     x: 0,
  //     y: 0,
  //   });
  //   setScore(0);
  //   setLines(0);
  //   setLevel(LEVEL_CONFIG["1"]);
  //   setCount(0);
  //   setIsGameOver(false);
  //   startGame();
  // };

  // // ---------------------------------------------------------------------------

  // // //  Обработчики нажатий клавиш клавиатуры
  // // const handleKeydown = (e) => {
  // //   if (!isPause) e.preventDefault();
  // //   if (isBlocked) return;

  // //   if ((e.key === "p" || e.key === "P") && !pressedKey) {
  // //     handlePause();
  // //     return;
  // //   }

  // //   if ((e.key === "r" || e.key === "R") && !pressedKey) {
  // //     setPressedKey("restart");
  // //     restartGame();
  // //     return;
  // //   }

  // //   if (isGameOver || isPause || CONTROL_KEYS[pressedKey]?.includes(e.key))
  // //     return;

  // //   if (e.key === "ArrowUp" || e.key === "w") {
  // //     turnPiece();
  // //     setPressedKey("turn");
  // //     return;
  // //   }
  // //   if (e.key === "ArrowLeft" || e.key === "a") {
  // //     moveLeft();
  // //     setPressedKey("left");
  // //     return;
  // //   }

  // //   if (e.key === "ArrowRight" || e.key === "d") {
  // //     moveRight();
  // //     setPressedKey("right");
  // //     return;
  // //   }

  // //   if (e.key === "ArrowDown" || e.key === "s") {
  // //     moveDown("down");
  // //     setPressedKey("down");
  // //     return;
  // //   }

  // //   if (e.key === "Control" || e.key === "x") {
  // //     dropDown();
  // //     setPressedKey("drop");
  // //     return;
  // //   }
  // // };

  // // const handleKeyup = (e) => {
  // //   setPressedKey("");
  // //   setEffectCount(0);
  // // };
  // // // ------------------------------------------------------------------

  // // Обработчики touch и mouse событий
  // const handlePressDown = (key) => {
  //   if (pressedKey === key) return;
  //   key === "turn"
  //     ? turnPiece()
  //     : key === "left"
  //     ? moveLeft()
  //     : key === "right"
  //     ? moveRight()
  //     : key === "down"
  //     ? moveDown("down")
  //     : key === "drop"
  //     ? dropDown()
  //     : key === "restart"
  //     ? restartGame()
  //     : handlePause();

  //   setPressedKey(key);
  // };

  // const handlePressUp = () => {
  //   setPressedKey("");
  //   if (setEffectCount !== 0) setEffectCount(0);
  // };
  // // ------------------------------------------------------------------

  return (
    <div className="app">
      <Main>
        <BrickGame
          // onDown={handlePressDown}
          // onUp={handlePressUp}
          // pressedKey={pressedKey}
          isTablet={isTablet}
        />
      </Main>
      {!isTablet && <Footer />}
    </div>
  );
}

export default App;
