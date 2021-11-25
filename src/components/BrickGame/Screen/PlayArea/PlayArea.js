import "./PlayArea.scss";
import Block from "../Block/Block";
import Title from "../../../generic/Title/Title";
import {
  gameControlSelectors,
  mainSelectors,
} from "../../../../services/selectors";
import { useSelector } from "react-redux";

function PlayArea() {
  const playArea = useSelector(mainSelectors.playArea);
  const isPause = useSelector(gameControlSelectors.isPause);
  const isGameOn = useSelector(gameControlSelectors.isGameOn);
  const isGameOver = useSelector(gameControlSelectors.isGameOver);

  return (
    <div className="play-area">
      <ul className="play-area__list">
        {Object.entries(playArea).map(([k, v]) => (
          <Block key={v.id} state={v.isActive} match={v.match} />
        ))}
      </ul>
      {isPause && (
        <div className="play-area__cover">
          {isGameOn && <Title text="Пауза" mix="play-area__pause" />}
          {!isGameOn && !isGameOver && (
            <Title text={`Жми\nстарт`} mix="play-area__start" />
          )}
          {isGameOver && <Title text={`Конец\nигры`} mix="play-area__end" />}
        </div>
      )}
    </div>
  );
}

export default PlayArea;
