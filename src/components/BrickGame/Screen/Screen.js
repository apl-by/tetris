import "./Screen.scss";
import PlayArea from "./PlayArea/PlayArea";
import GameStat from "./GameStat/GameStat";

function Screen({
  field,
  statFild,
  score,
  lines,
  level,
  isPause,
  isStarted,
  isEnd,
  record,
}) {
  return (
    <div className="container">
      <h1 className="container__title">Тетрис</h1>
      <div className="screen">
        <PlayArea
          field={field}
          isPause={isPause}
          isStarted={isStarted}
          isEnd={isEnd}
        />
        <GameStat
          statFild={statFild}
          score={score}
          lines={lines}
          level={level}
          record={record}
        />
      </div>
    </div>
  );
}

export default Screen;
