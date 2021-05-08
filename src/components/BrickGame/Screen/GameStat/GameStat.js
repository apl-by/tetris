import "./GameStat.scss";
import volume from "../../../../images/volume-icon.svg";
import Block from "../Block/Block";

function GameStat({ statFild }) {
  return (
    <div className="game-stat">
      <h2 className="game-stat__title">Очки:</h2>
      <p className="game-stat__value">1234567</p>
      <h2 className="game-stat__title">Линии:</h2>
      <p className="game-stat__value">123456</p>
      <h2 className="game-stat__title">Уровень:</h2>
      <p className="game-stat__value">333</p>
      <h2 className="game-stat__title">Следующая:</h2>
      <ul className="game-stat__list">
        {Object.entries(statFild).map(([k, v]) => (
          <Block key={v.id} state={v.isActive} match={v.match} />
        ))}
      </ul>
      <div className="game-stat__volume">
        <h2 className="game-stat__title">Звук:</h2>
        <img
          src={volume}
          alt="иконка звука"
          className="game-stat__icon game-stat__icon_muted"
        />
      </div>
    </div>
  );
}

export default GameStat;
