import "./GameStat.scss";
import Block from "../Block/Block";
import { statSelectors, mainSelectors } from "../../../../services/selectors";
import { useSelector } from "react-redux";

function GameStat() {
  const score = useSelector(statSelectors.score);
  const record = useSelector(statSelectors.record);
  const lines = useSelector(statSelectors.lines);
  const level = useSelector(statSelectors.level);
  const statArea = useSelector(mainSelectors.statArea);

  return (
    <div className="game-stat">
      <h2 className="game-stat__title">Очки:</h2>
      <p className="game-stat__value">{score}</p>
      <h2 className="game-stat__title">Линии:</h2>
      <p className="game-stat__value">{lines}</p>
      <h2 className="game-stat__title">Уровень:</h2>
      <p className="game-stat__value">{level}</p>
      <h2 className="game-stat__title">Следующая:</h2>
      <ul className="game-stat__list">
        {Object.entries(statArea).map(([k, v]) => (
          <Block key={v.id} state={v.isActive} match={v.match} />
        ))}
      </ul>
      <h2 className="game-stat__title">Рекорд:</h2>
      <p className="game-stat__value">{record}</p>
    </div>
  );
}

export default GameStat;
