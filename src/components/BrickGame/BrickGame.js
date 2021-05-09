import "./BrickGame.scss";
import Screen from "./Screen/Screen";
import ControlPanel from "./ControlPanel/ControlPanel";

function BrickGame({
  field,
  statFild,
  score,
  lines,
  level,
  isPause,
  isStarted,
  isEnd,
  record,
  onDown,
  onUp,
}) {
  return (
    <section className="brick-game">
      <Screen
        field={field}
        statFild={statFild}
        score={score}
        lines={lines}
        level={level}
        isPause={isPause}
        isStarted={isStarted}
        isEnd={isEnd}
        record={record}
      />
      <ControlPanel onDown={onDown} onUp={onUp} />
    </section>
  );
}

export default BrickGame;
