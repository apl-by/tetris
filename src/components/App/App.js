import "./App.scss";
import { useEffect, useMemo, useState } from "react";
import Main from "../Main/Main";
import BrickGame from "../BrickGame/BrickGame";
import Footer from "../Footer/Footer";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { batch } from "react-redux";
import { gameControlSelectors } from "../../services/selectors";
import { mainSelectors } from "../../services/selectors";
import { statSelectors } from "../../services/selectors";
import {
  start,
  togglePause,
  setPause,
  setBtn,
  clearBtn,
  setGameOver,
} from "../../services/slices/gameControlSlice";
import {
  setPieces,
  drop,
  moveDown,
  moveLeft,
  moveRight,
  turn,
  handleMatchesAsync,
  gameOverAsync,
} from "../../services/slices/mainSlice";
import { updateStat, upLevel } from "../../services/slices/statSlice";
import useInterval from "../../hooks/useInterval";
import { MOVE_BUTTONS, CONTROL_KEYS } from "../../utils/config";
import {
  searchMatch,
  updPlayAreaWithMatches,
  getScore,
  checkGameOver,
} from "../../utils/utils";
import { restart } from "../../services/actionCreators";

function App() {
  const [key, setKey] = useState("");
  const [wasFirstInvoke, setWasFirstInvoke] = useState(false);
  const dispatch = useDispatch();
  const controlHandlers = useInterval;
  const setMoveInterval = useInterval;
  const isPause = useSelector(gameControlSelectors.isPause);
  const isGameOn = useSelector(gameControlSelectors.isGameOn);
  const isGameOver = useSelector(gameControlSelectors.isGameOver);
  const pressedBtn = useSelector(gameControlSelectors.pressedBtn);
  const speed = useSelector(statSelectors.speed);
  const isRoundEnd = useSelector(mainSelectors.isRoundEnd);
  const playArea = useSelector(mainSelectors.playArea);
  const score = useSelector(statSelectors.score);
  const level = useSelector(statSelectors.level);
  const lines = useSelector(statSelectors.lines);

  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    document.addEventListener("keyup", handleKeyup);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  });

  // Обработка результата раунда
  useEffect(() => {
    if (!isRoundEnd) return;
    if (checkGameOver(playArea)) {
      dispatch(setGameOver());
      dispatch(gameOverAsync()).then(() => dispatch(setPause()));
      return;
    }
    const { cells, rows, newLines } = searchMatch(playArea);

    if (newLines > 0) {
      const newPlayArea = updPlayAreaWithMatches(playArea, rows);
      const newScore = getScore(score, newLines, level);
      const sumLines = lines + newLines;
      dispatch(handleMatchesAsync({ cells, newPlayArea })).then(() => {
        batch(() => {
          dispatch(updateStat({ newScore, newLines }));
          dispatch(setPieces());
          if (String(sumLines).startsWith(String(level)) && sumLines !== 1) {
            dispatch(upLevel(level + 1));
          }
        });
      });
      return;
    }

    dispatch(setPieces());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRoundEnd]);

  //  Обработчики нажатий клавиш клавиатуры

  const handleDrop = () => {
    batch(() => {
      dispatch(setBtn("drop"));
      dispatch(drop());
    });
  };

  const handleTurnPiece = () => {
    batch(() => {
      dispatch(setBtn("turn"));
      dispatch(turn());
    });
  };

  const handleMoveLeft = () => {
    batch(() => {
      dispatch(setBtn("left"));
      dispatch(moveLeft());
    });
  };

  const handleMoveRight = () => {
    batch(() => {
      dispatch(setBtn("right"));
      dispatch(moveRight());
    });
  };

  const handleMoveDown = (isTimer) => {
    if (isTimer) {
      return dispatch(moveDown());
    }
    batch(() => {
      dispatch(setBtn("down"));
      dispatch(moveDown());
    });
  };

  const startGame = (restartKey) => {
    batch(() => {
      if (restartKey) dispatch(setBtn("restart"));
      if (isGameOver || restartKey) {
        dispatch(restart());
      }
      dispatch(start());
      dispatch(setPieces());
    });
  };

  const handlePause = () => {
    dispatch(setBtn("pause"));
    isGameOn ? dispatch(togglePause()) : startGame();
  };

  const handleKeydown = (e) => {
    if (!isPause) e.preventDefault();
    if (isRoundEnd || key === e.key || key === e.keyCode) return;

    if (CONTROL_KEYS.pause.includes(e.key)) {
      setKey(e.key);
      return handlePause();
    }

    if (CONTROL_KEYS.restart.includes(e.key)) {
      setKey(e.key);
      startGame("restart");
      return;
    }

    if (isGameOver || isPause) return;

    if (CONTROL_KEYS.turn.includes(e.key)) {
      setKey(e.key);
      return handleTurnPiece();
    }

    if (CONTROL_KEYS.left.includes(e.key)) {
      setKey(e.key);
      return handleMoveLeft();
    }

    if (CONTROL_KEYS.right.includes(e.key)) {
      setKey(e.key);
      return handleMoveRight();
    }

    if (CONTROL_KEYS.down.includes(e.key)) {
      setKey(e.key);
      return handleMoveDown();
    }

    if (CONTROL_KEYS.drop.includes(e.keyCode)) {
      setKey(e.keyCode);
      return handleDrop();
    }
  };

  const handleKeyup = (e) => {
    setKey("");
    setWasFirstInvoke(false);
    dispatch(clearBtn());
  };

  // Обработчики touch и mouse событий
  const handlePressDown = (key) => {
    if (pressedBtn === key || isRoundEnd) return;
    key === "restart"
      ? startGame("restart")
      : key === "pause"
      ? handlePause()
      : void 0;
    if (isGameOver || isPause) return;
    key === "turn"
      ? handleTurnPiece()
      : key === "left"
      ? handleMoveLeft()
      : key === "right"
      ? handleMoveRight()
      : key === "down"
      ? handleMoveDown()
      : key === "drop"
      ? handleDrop()
      : void 0;
  };

  const handlePressUp = () => {
    setWasFirstInvoke(false);
    dispatch(clearBtn());
  };

  // Устранение страндартной задержки keydown

  const controlHandlersDelay = useMemo(() => {
    if (MOVE_BUTTONS.includes(pressedBtn)) {
      if (pressedBtn === "drop") return 250;
      if (pressedBtn === "turn") return 170;
      if (wasFirstInvoke) return 50;
      return 120;
    } else {
      return null;
    }
  }, [pressedBtn, wasFirstInvoke]);

  controlHandlers(() => {
    wasFirstInvoke ? void 0 : setWasFirstInvoke(true);

    return pressedBtn === "drop"
      ? handleDrop()
      : pressedBtn === "turn"
      ? handleTurnPiece()
      : pressedBtn === "left"
      ? handleMoveLeft()
      : pressedBtn === "right"
      ? handleMoveRight()
      : pressedBtn === "down"
      ? handleMoveDown()
      : () => void 0;
  }, controlHandlersDelay);

  // Установка таймера на движение фигур вниз, и её перемещение вниз

  const moveDownDelay = useMemo(() => {
    if (pressedBtn === "down") {
      return null;
    } else {
      return isPause || isGameOver || isRoundEnd ? null : speed;
    }
  }, [pressedBtn, speed, isPause, isGameOver, isRoundEnd]);

  setMoveInterval(() => handleMoveDown("timer"), moveDownDelay);

  return (
    <div className="app">
      <Main>
        <BrickGame
          onDown={handlePressDown}
          onUp={handlePressUp}
          isTablet={isTablet}
        />
      </Main>
      {!isTablet && <Footer />}
    </div>
  );
}

export default App;
