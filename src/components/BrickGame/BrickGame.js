import "./BrickGame.scss";
import Screen from "./Screen/Screen";
import ControlPanel from "./ControlPanel/ControlPanel";

function BrickGame({ field, statFild }) {
  return (
    <section className="brick-game">
      <Screen field={field} statFild={statFild} />
      <ControlPanel />
    </section>
  );
}

export default BrickGame;
